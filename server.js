const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const needHelpRoutes = require('./routes/needHelpRoutes');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(bodyParser.json());

// Define Routes
app.use('/api', needHelpRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
