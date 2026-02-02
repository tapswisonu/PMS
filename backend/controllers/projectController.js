const db = require('../config/db');

exports.getAllProjects = async (req, res) => {
    try {
        const [projects] = await db.query('SELECT * FROM projects ORDER BY created_at DESC');
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createProject = async (req, res) => {
    let { title, description, start_date, end_date } = req.body;

    // Handle empty date strings
    if (!start_date) start_date = null;
    if (!end_date) end_date = null;

    try {
        const [result] = await db.query(
            'INSERT INTO projects (title, description, start_date, end_date) VALUES (?, ?, ?, ?)',
            [title, description, start_date, end_date]
        );
        res.status(201).json({ id: result.insertId, title, description, start_date, end_date });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateProject = async (req, res) => {
    const { id } = req.params;
    const { title, description, start_date, end_date } = req.body;
    try {
        await db.query(
            'UPDATE projects SET title = ?, description = ?, start_date = ?, end_date = ? WHERE id = ?',
            [title, description, start_date, end_date, id]
        );
        res.json({ message: 'Project updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM projects WHERE id = ?', [id]);
        res.json({ message: 'Project deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
