const db = require('../config/db');

exports.getAllUsers = async (req, res) => {
    try {
        const [users] = await db.query('SELECT * FROM users');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createUser = async (req, res) => {
    const { name, email, role } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO users (name, email, role) VALUES (?, ?, ?)',
            [name, email, role || 'member']
        );
        res.status(201).json({ id: result.insertId, name, email, role });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
