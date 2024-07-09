const NeedHelp = require('../models/needHelpModel');

const getNeedHelps = async (req, res) => {
    try {
        const needHelps = await NeedHelp.find();
        res.json(needHelps);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createNeedHelp = async (req, res) => {
    const needHelp = new NeedHelp({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        service: req.body.service,
        message: req.body.message,
    });

    try {
        const newNeedHelp = await needHelp.save();
        res.status(201).json(newNeedHelp);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
module.exports = {createNeedHelp, getNeedHelps}