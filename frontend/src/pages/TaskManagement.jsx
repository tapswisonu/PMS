import React, { useState } from 'react';
import TaskSidebar from '../components/task/TaskSidebar';
import TaskHeader from '../components/task/TaskHeader';
import TaskTabs from '../components/task/TaskTabs';
import TaskCommentSection from '../components/task/TaskCommentSection';

// Mock Data
const loadingTasks = [
    {
        id: 'KE1-T3',
        title: 'Typing Practice Modules Testing',
        status: 'On Hold',
        assignee: 'Unassigned',
        priority: 'Normal',
        creator: 'tapsydv',
        project: 'keyskill'
    },
    { id: 'KE1-T4', title: 'Typing Games Testing', status: 'On Hold', assignee: 'Unassigned', priority: 'High' },
    { id: 'KE1-T5', title: 'Typing Exam Testing', status: 'On Hold', assignee: 'Unassigned', priority: 'Normal' },
    { id: 'KE1-T6', title: 'Reports & Analytics Testing', status: 'On Hold', assignee: 'Unassigned', priority: 'Low' },
    { id: 'KE1-T7', title: 'UI & UX Testing', status: 'On Hold', assignee: 'Unassigned', priority: 'Normal' },
];

const TaskManagement = () => {
    const [activeTaskId, setActiveTaskId] = useState('KE1-T3');
    const [activeTab, setActiveTab] = useState('Comments');

    const activeTask = loadingTasks.find(t => t.id === activeTaskId);

    return (
        <div className="flex h-screen bg-dark-bg text-red-50 overflow-hidden font-sans">
            {/* Sidebar - Fixed Width */}
            <TaskSidebar
                tasks={loadingTasks}
                activeTaskId={activeTaskId}
                onTaskSelect={setActiveTaskId}
            />

            {/* Main Content - Flexible */}
            <div className="flex-1 flex flex-col min-w-0 bg-dark-bg">
                {activeTask ? (
                    <>
                        <div className="flex-none">
                            <TaskHeader task={activeTask} />
                        </div>

                        <div className="flex-1 overflow-y-auto px-6 py-4">

                            <TaskTabs activeTab={activeTab} onTabChange={setActiveTab} />

                            {activeTab === 'Comments' && (
                                <div className="max-w-4xl">
                                    <TaskCommentSection />
                                </div>
                            )}

                            {/* Placeholder for other tabs */}
                            {activeTab !== 'Comments' && (
                                <div className="flex items-center justify-center h-64 text-gray-500">
                                    {activeTab} content coming soon...
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        Select a task to view details
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskManagement;
