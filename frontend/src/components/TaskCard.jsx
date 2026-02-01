import React, { useState, useEffect } from 'react';
import api from '../api';
import { ChatBubbleLeftIcon, TrashIcon, PencilIcon, PhotoIcon } from '@heroicons/react/24/outline';

const TaskCard = ({ task, onStatusChange, onDelete, onUpdate }) => {
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [commentImage, setCommentImage] = useState(null);
    const [loadingComments, setLoadingComments] = useState(false);

    // Edit State
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        title: task.title,
        description: task.description,
        status: task.status,
        assigned_to: task.assigned_to || '',
        due_date: task.due_date ? task.due_date.split('T')[0] : ''
    });

    useEffect(() => {
        if (showComments && comments.length === 0) {
            fetchComments();
        }
    }, [showComments]);

    const fetchComments = async () => {
        setLoadingComments(true);
        try {
            const res = await api.get(`/comments/task/${task.id}`);
            setComments(res.data);
        } catch (err) {
            console.error("Error fetching comments:", err);
        } finally {
            setLoadingComments(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCommentImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim() && !commentImage) return;

        try {
            const res = await api.post('/comments', {
                task_id: task.id,
                user_id: 1, // Default user
                comment_text: newComment,
                image_url: commentImage
            });
            setComments([...comments, { ...res.data, user_name: 'You' }]);
            setNewComment('');
            setCommentImage(null);
        } catch (err) {
            console.error("Error adding comment:", err);
            alert("Failed to add comment.");
        }
    };

    const handleEditChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.put(`/tasks/${task.id}`, editForm);
            // Assuming onUpdate prop is passed to refresh the list or update local state
            if (onUpdate) onUpdate(res.data.task);
            setIsEditing(false);
        } catch (err) {
            console.error("Error updating task:", err);
            alert("Failed to update task.");
        }
    };

    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800',
        in_progress: 'bg-blue-100 text-blue-800',
        completed: 'bg-green-100 text-green-800'
    };

    // Edit Modal
    if (isEditing) {
        return (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                    <h3 className="text-lg font-bold mb-4">Edit Task</h3>
                    <form onSubmit={handleEditSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <input type="text" name="title" value={editForm.title} onChange={handleEditChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea name="description" value={editForm.description} onChange={handleEditChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" rows="3"></textarea>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                <select name="status" value={editForm.status} onChange={handleEditChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                            <div className="w-1/2">
                                <label className="block text-sm font-medium text-gray-700">Due Date</label>
                                <input type="date" name="due_date" value={editForm.due_date} onChange={handleEditChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                        </div>
                        <div className="flex justify-end space-x-2 mt-4">
                            <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                            <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 mb-6 border border-gray-100">
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
                            {task.status.replace('_', ' ').toUpperCase()}
                        </span>
                        <h3 className="mt-2 text-xl font-bold text-gray-900 leading-tight">{task.title}</h3>
                    </div>
                    <div className="flex space-x-2">
                        <button onClick={() => setIsEditing(true)} className="text-gray-400 hover:text-indigo-600 transition-colors p-1 rounded-md hover:bg-indigo-50">
                            <PencilIcon className="h-5 w-5" />
                        </button>
                        <button onClick={() => onDelete(task.id)} className="text-gray-400 hover:text-red-600 transition-colors p-1 rounded-md hover:bg-red-50">
                            <TrashIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                <p className="text-gray-600 text-sm mb-6 line-clamp-3">{task.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-4">
                    <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs mr-2">
                            {task.assigned_user_name ? task.assigned_user_name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <span>{task.assigned_user_name || 'Unassigned'}</span>
                    </div>
                    <div className="font-medium">
                        Due: {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No Date'}
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
                <button
                    onClick={() => setShowComments(!showComments)}
                    className="flex items-center text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors w-full"
                >
                    <ChatBubbleLeftIcon className="h-5 w-5 mr-2" />
                    {showComments ? 'Hide Discussion' : 'Show Discussion'}
                </button>

                {showComments && (
                    <div className="mt-6 space-y-6">
                        {loadingComments ? (
                            <div className="flex justify-center py-4"><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div></div>
                        ) : (
                            <div className="space-y-4">
                                {comments.length === 0 && <p className="text-sm text-gray-400 italic text-center py-2">No comments yet. Start the conversation!</p>}
                                {comments.map((comment) => (
                                    <div key={comment.id} className="flex space-x-3">
                                        <div className="flex-shrink-0">
                                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-xs">
                                                {comment.user_name ? comment.user_name.charAt(0).toUpperCase() : '?'}
                                            </div>
                                        </div>
                                        <div className="flex-1 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                                            <div className="flex justify-between items-baseline">
                                                <h4 className="text-sm font-bold text-gray-900">{comment.user_name}</h4>
                                                <span className="text-xs text-gray-400">{new Date(comment.created_at).toLocaleDateString()}</span>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-700 whitespace-pre-wrap">{comment.comment_text}</p>
                                            {comment.image_url && (
                                                <img src={comment.image_url} alt="Attachment" className="mt-2 max-h-48 rounded-md border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity" onClick={() => window.open(comment.image_url, '_blank')} />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <form onSubmit={handleCommentSubmit} className="mt-4">
                            <div className="relative rounded-md shadow-sm">
                                <textarea
                                    className="form-textarea block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
                                    rows="3"
                                    placeholder="Write a comment..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                />
                                {commentImage && (
                                    <div className="absolute top-2 right-2">
                                        <img src={commentImage} alt="Preview" className="h-12 w-12 object-cover rounded border border-gray-300" />
                                        <button type="button" onClick={() => setCommentImage(null)} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 h-4 w-4 flex items-center justify-center text-xs">×</button>
                                    </div>
                                )}
                            </div>
                            <div className="mt-2 flex justify-between items-center">
                                <label className="cursor-pointer inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                    <PhotoIcon className="h-5 w-5 mr-2 text-gray-400" />
                                    <span>Attach Image</span>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                </label>
                                <button
                                    type="submit"
                                    disabled={!newComment.trim() && !commentImage}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Comment
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskCard;
