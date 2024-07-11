const Admin = require('../models/AdminModel');
const logger = require('../middleware/logger')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

// Admin operations: create, update, delete
const createAdmin = async (req, res) => {
  try {
    const { name, email, password,phoneNumber  } = req.body;
    console.log(name, email, password, phoneNumber);
    //hashing password
    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(password, salt)


    const admin = new Admin({
      name,
      email,
      password:hashedpassword,
      phoneNumber
    });

    await admin.save();


    // Log admin creation
    logger.info('Admin created successfully', { adminId: admin._id });

    res.status(201).json({
        message: "admin created succesfully",
        admin : admin
    });
  } catch (err) {
    logger.error('Error creating admin:', { error: err.message });
    console.error('Error creating admin:', err);
    res.status(500).send('unable to add admin');
  }
};

const loginAdmin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Admin.findOne({ email });
  
      if (!user) {
        logger.warn('Invalid login attempt', { email: email });
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        logger.warn('Invalid login attempt', { email: email });
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // Generate JWT token
      const payload = {
        user: {
          id: user.id,
          email: user.email
          // Add any other fields you want to include in the token
        }
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' });
  
      logger.info('Admin logged in successfully', { adminId: user._id });
  
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        token: token
      });
    } catch (error) {
      logger.error('Error logging in admin:', { error: error.message });
      res.status(500).json({ error: 'Unable to login admin' });
    }
  };
module.exports = {
    loginAdmin,
    createAdmin
}