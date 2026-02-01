import React, { useEffect, useState } from 'react';
import api from '../api';

const Dashboard = () => {
    const [stats, setStats] = useState({ projects: 0, tasks: 0, users: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [projectsRes, usersRes] = await Promise.all([
                    api.get('/projects'),
                    api.get('/users')
                ]);

                // For tasks, we might need a separate endpoint or count locally if we fetch all (inefficient)
                // For now, let's just show Projects and Users count as a simple dashboard
                // Or I can add a /stats endpoint in backend later.
                // Let's just show what we have.
                setStats({
                    projects: projectsRes.data.length,
                    users: usersRes.data.length,
                    tasks: 'N/A' // Placeholder until we have a way to count all tasks efficiently or fetch them
                });
            } catch (err) {
                console.error("Error fetching stats:", err);
            }
        };

        fetchStats();
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Projects</dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.projects}</dd>
                    </div>
                </div>
                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Team Members</dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.users}</dd>
                    </div>
                </div>
                {/* <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Tasks</dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.tasks}</dd>
                    </div>
                </div> */}
            </div>
            <div className="mt-8">
                <h2 className="text-lg font-medium text-gray-900">Welcome to Project Management System</h2>
                <p className="mt-2 text-gray-500">Select a project to view tasks or manage team members.</p>
            </div>
        </div>
    );
};

export default Dashboard;
