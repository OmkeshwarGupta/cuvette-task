const express = require('express');
const mongoose = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use(cookieParser());


app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.get('/', (req, res) => res.send('Welcome to the Job Board API'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
