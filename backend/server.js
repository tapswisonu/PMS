const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/users.routes'));
app.use('/api/projects', require('./routes/projects.routes'));
app.use('/api/tasks', require('./routes/tasks.routes'));
app.use('/api/comments', require('./routes/comments.routes'));

// Base route for testing
app.get('/', (req, res) => {
    res.send('PMS API is running...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Environment:', process.env.NODE_ENV);
});
