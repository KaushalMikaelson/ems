require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const employeeRoutes = require('./routes/employees');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/employees', employeeRoutes);

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ems')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
