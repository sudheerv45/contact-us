const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const needHelpRoutes = require('./routes/needHelpRoutes');
const commentRoutes = require('./routes/commentRoutes');
const cors = require('cors');

const app = express();




// Enable All CORS Requests
app.use(cors());

app.use(cors({
    origin: '*' // Allow only requests from this origin
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Connect Database
connectDB();

// Init Middleware
app.use(bodyParser.json());

// Define Routes
app.use('/api', needHelpRoutes);
app.use('/api', commentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
