const db = require('../config/db');

exports.getTasksByProject = async (req, res) => {
    const { projectId } = req.params;
    try {
        const [tasks] = await db.query(
            `SELECT t.*, u.name as assigned_user_name 
             FROM tasks t 
             LEFT JOIN users u ON t.assigned_to = u.id 
             WHERE t.project_id = ? 
             ORDER BY t.created_at DESC`,
            [projectId]
        );
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createTask = async (req, res) => {
    const { project_id, assigned_to, title, description, due_date } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO tasks (project_id, assigned_to, title, description, status, due_date) VALUES (?, ?, ?, ?, ?, ?)',
            [project_id, assigned_to, title, description, 'pending', due_date]
        );
        res.status(201).json({
            id: result.insertId,
            project_id,
            assigned_to,
            title,
            description,
            status: 'pending',
            due_date
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, assigned_to, status, due_date } = req.body;
    try {
        await db.query(
            'UPDATE tasks SET title = ?, description = ?, assigned_to = ?, status = ?, due_date = ? WHERE id = ?',
            [title, description, assigned_to, status, due_date, id]
        );
        res.json({ message: 'Task updated successfully', task: { id, title, description, assigned_to, status, due_date } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateTaskStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        await db.query('UPDATE tasks SET status = ? WHERE id = ?', [status, id]);
        res.json({ message: 'Task status updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM tasks WHERE id = ?', [id]);
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
