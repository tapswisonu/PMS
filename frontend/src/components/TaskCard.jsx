import React, { useState, useEffect } from 'react';
import api from '../api';
import { ChatBubbleLeftIcon, TrashIcon } from '@heroicons/react/24/outline'; // Need to make sure heroicons is installed or use text

const TaskCard = ({ task, onStatusChange, onDelete }) => {
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loadingComments, setLoadingComments] = useState(false);

    // Fetch comments only when expanded
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

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        // We need a user_id. Since there's no auth, let's select a random user or hardcode needed.
        // Or adding a "Select User" dropdown for comment.
        // For simplicity, let's assume User 1 (Admin/First User) or just ask for a User ID in a real app without auth.
        // BUT, the requirement says "No login". So who is commenting?
        // "Add comments on tasks".
        // I'll add a simple user selector or just use a default ID if available, or fetch users and pick first.
        // Let's rely on a "Current User" context or just pick the first user from the DB?
        // Or just hardcode user_id=1 for now as it's a demo.
        // Better: Dropdown to select "Who are you?" in the comment section? Too complex.
        // I'll just use user_id: 1 (assuming at least one user exists) and handle error if not.

        // Actually, let's try to pass users prop to TaskCard is better, but fetching users inside card is okay too.
        // Let's hardcode 1 for now and note it.
        // Wait, I can pass a `users` list from parent Page to TaskCard to select from?
        // Let's just create a comment with user_id=1 (or assigned_to if exists? No).
        // I'll fetch users in parent and pass `currentUser` (maybe a mock select in navbar?).
        // Let's just default to 1.

        try {
            const res = await api.post('/comments', {
                task_id: task.id,
                user_id: 1, // Default user
                comment_text: newComment
            });
            setComments([...comments, { ...res.data, user_name: 'You' }]); // Optimistic update or refetch
            setNewComment('');
            fetchComments(); // Refresh to get real user name if possible
        } catch (err) {
            console.error("Error adding comment:", err);
            alert("Ensure at least one user exists (ID 1) to comment.");
        }
    };

    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800',
        in_progress: 'bg-blue-100 text-blue-800',
        completed: 'bg-green-100 text-green-800'
    };

    return (
        <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6 mb-4 border border-gray-200">
            <div className="flex justify-between items-start">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{task.title}</h3>
                <div className="flex space-x-2">
                    <select
                        value={task.status}
                        onChange={(e) => onStatusChange(task.id, e.target.value)}
                        className={`text-xs font-semibold rounded-full px-2 py-1 border-none focus:ring-0 cursor-pointer ${statusColors[task.status] || 'bg-gray-100'}`}
                    >
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                    <button onClick={() => onDelete(task.id)} className="text-red-400 hover:text-red-500">
                        <TrashIcon className="h-5 w-5" />
                    </button>
                </div>
            </div>
            <div className="mt-2 text-sm text-gray-500">
                <p>{task.description}</p>
            </div>
            <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
                <span>Assigned to: <span className="font-medium text-gray-900">{task.assigned_user_name || 'Unassigned'}</span></span>
                <span>Due: {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No Date'}</span>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
                <button
                    onClick={() => setShowComments(!showComments)}
                    className="flex items-center text-sm text-indigo-600 hover:text-indigo-900"
                >
                    <ChatBubbleLeftIcon className="h-4 w-4 mr-1" />
                    {showComments ? 'Hide Comments' : 'Show Comments'}
                </button>

                {showComments && (
                    <div className="mt-4 space-y-4">
                        {loadingComments ? (
                            <p className="text-xs text-gray-400">Loading comments...</p>
                        ) : (
                            <u className="space-y-2">
                                {comments.length === 0 && <p className="text-xs text-gray-400">No comments yet.</p>}
                                {comments.map((comment) => (
                                    <li key={comment.id} className="text-sm bg-gray-50 p-2 rounded">
                                        <div className="font-semibold text-xs text-gray-700">{comment.user_name}</div>
                                        <div className="text-gray-600">{comment.comment_text}</div>
                                    </li>
                                ))}
                            </u>
                        )}
                        <form onSubmit={handleCommentSubmit} className="flex gap-2">
                            <input
                                type="text"
                                className="flex-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                placeholder="Add a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                            >
                                Send
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskCard;
