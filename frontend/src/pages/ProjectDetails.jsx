import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import Modal from '../components/Modal';
import TaskCard from '../components/TaskCard';

const ProjectDetails = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        assigned_to: '',
        due_date: ''
    });

    useEffect(() => {
        fetchProjectDetails();
        fetchTasks();
        fetchUsers();
    }, [id]);

    const fetchProjectDetails = async () => {
        // Since we don't have getProjectById, we can filter from all projects or add an endpoint. 
        // For now, let's fetch all and find (inefficient for large apps, okay for local).
        // Or wait, we only have getProjects. 
        // I should have implemented getProjectById.
        // Let's mock it by fetching all.
        try {
            const res = await api.get('/projects');
            const found = res.data.find(p => p.id === parseInt(id));
            if (found) setProject(found);
        } catch (err) {
            console.error("Error fetching project:", err);
        }
    };

    const fetchTasks = async () => {
        try {
            const res = await api.get(`/tasks/project/${id}`);
            setTasks(res.data);
        } catch (err) {
            console.error("Error fetching tasks:", err);
        }
    };

    const fetchUsers = async () => {
        try {
            const res = await api.get('/users');
            setUsers(res.data);
        } catch (err) {
            console.error("Error fetching users:", err);
        }
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            await api.post('/tasks', {
                ...newTask,
                project_id: id,
                assigned_to: newTask.assigned_to || null
            });
            setIsModalOpen(false);
            setNewTask({ title: '', description: '', assigned_to: '', due_date: '' });
            fetchTasks();
        } catch (err) {
            console.error("Error creating task:", err);
            alert("Error creating task");
        }
    };

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            await api.put(`/tasks/${taskId}/status`, { status: newStatus });
            fetchTasks();
        } catch (err) {
            console.error("Error updating status:", err);
        }
    };

    const handleDeleteTask = async (taskId) => {
        if (window.confirm("Delete this task?")) {
            try {
                await api.delete(`/tasks/${taskId}`);
                fetchTasks();
            } catch (err) {
                console.error("Error deleting task:", err);
            }
        }
    };

    if (!project) return <div className="p-4">Loading project...</div>;

    const tasksByStatus = {
        pending: tasks.filter(t => t.status === 'pending'),
        in_progress: tasks.filter(t => t.status === 'in_progress'),
        completed: tasks.filter(t => t.status === 'completed'),
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
                <p className="text-gray-500 mt-2">{project.description}</p>
                <div className="mt-4 flex space-x-4 text-sm text-gray-500">
                    <span>Start: {new Date(project.start_date).toLocaleDateString()}</span>
                    <span>End: {new Date(project.end_date).toLocaleDateString()}</span>
                </div>
            </div>

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Tasks</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                    Add Task
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Kanban-like columns */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-700 mb-4 uppercase text-xs tracking-wider">Pending ({tasksByStatus.pending.length})</h3>
                    {tasksByStatus.pending.map(task => (
                        <TaskCard key={task.id} task={task} onStatusChange={handleStatusChange} onDelete={handleDeleteTask} />
                    ))}
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-700 mb-4 uppercase text-xs tracking-wider">In Progress ({tasksByStatus.in_progress.length})</h3>
                    {tasksByStatus.in_progress.map(task => (
                        <TaskCard key={task.id} task={task} onStatusChange={handleStatusChange} onDelete={handleDeleteTask} />
                    ))}
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-700 mb-4 uppercase text-xs tracking-wider">Completed ({tasksByStatus.completed.length})</h3>
                    {tasksByStatus.completed.map(task => (
                        <TaskCard key={task.id} task={task} onStatusChange={handleStatusChange} onDelete={handleDeleteTask} />
                    ))}
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Task">
                <form onSubmit={handleCreateTask}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={newTask.title}
                                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                rows="3"
                                value={newTask.description}
                                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Assigned To</label>
                            <select
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={newTask.assigned_to}
                                onChange={(e) => setNewTask({ ...newTask, assigned_to: e.target.value })}
                            >
                                <option value="">Select Member</option>
                                {users.map(user => (
                                    <option key={user.id} value={user.id}>{user.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Due Date</label>
                            <input
                                type="date"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={newTask.due_date}
                                onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
                            />
                        </div>
                        <div className="flex justify-end pt-4">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="mr-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700"
                            >
                                Create Task
                            </button>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default ProjectDetails;
