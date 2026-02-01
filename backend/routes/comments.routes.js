const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.get('/task/:taskId', commentController.getCommentsByTask);
router.post('/', commentController.createComment);

module.exports = router;
