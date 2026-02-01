const db = require('../config/db');

exports.getCommentsByTask = async (req, res) => {
    const { taskId } = req.params;
    try {
        const [comments] = await db.query(
            `SELECT c.*, u.name as user_name 
             FROM comments c 
             JOIN users u ON c.user_id = u.id 
             WHERE c.task_id = ? 
             ORDER BY c.created_at ASC`,
            [taskId]
        );
        res.json(comments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createComment = async (req, res) => {
    const { task_id, user_id, comment_text, image_url } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO comments (task_id, user_id, comment_text, image_url) VALUES (?, ?, ?, ?)',
            [task_id, user_id, comment_text, image_url]
        );
        res.status(201).json({ id: result.insertId, task_id, user_id, comment_text, image_url });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
