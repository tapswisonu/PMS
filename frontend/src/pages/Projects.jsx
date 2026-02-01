import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import Modal from '../components/Modal';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newProject, setNewProject] = useState({ title: '', description: '', start_date: '', end_date: '' });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await api.get('/projects');
            setProjects(res.data);
        } catch (err) {
            console.error("Error fetching projects:", err);
        }
    };

    const handleDelete = async (id, e) => {
        e.preventDefault(); // Prevent navigation
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await api.delete(`/projects/${id}`);
                fetchProjects();
            } catch (err) {
                console.error("Error deleting project:", err);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/projects', newProject);
            setIsModalOpen(false);
            setNewProject({ title: '', description: '', start_date: '', end_date: '' });
            fetchProjects();
        } catch (err) {
            console.error("Error creating project:", err);
            alert('Error creating project');
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                    Create Project
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                    <Link key={project.id} to={`/projects/${project.id}`} className="block hover:no-underline">
                        <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 truncate">{project.title}</h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500 line-clamp-2">{project.description}</p>
                                <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
                                    <span>Start: {new Date(project.start_date).toLocaleDateString()}</span>
                                    <span>End: {new Date(project.end_date).toLocaleDateString()}</span>
                                </div>
                                <div className="mt-4 flex justify-end">
                                    <button
                                        onClick={(e) => handleDelete(project.id, e)}
                                        className="text-red-600 hover:text-red-900 text-sm font-medium"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Project">
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={newProject.title}
                                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                rows="3"
                                value={newProject.description}
                                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                                <input
                                    type="date"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={newProject.start_date}
                                    onChange={(e) => setNewProject({ ...newProject, start_date: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">End Date</label>
                                <input
                                    type="date"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={newProject.end_date}
                                    onChange={(e) => setNewProject({ ...newProject, end_date: e.target.value })}
                                />
                            </div>
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
                                Create
                            </button>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Projects;
