import React from 'react';
import { Bars3Icon, ExclamationCircleIcon, PlusIcon } from '@heroicons/react/24/outline'; // Using available icons

const TaskSidebar = ({ tasks, activeTaskId, onTaskSelect }) => {
    return (
        <div className="w-80 bg-dark-surface border-r border-gray-700 flex flex-col h-full text-text-primary">
            {/* Sidebar Header */}
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                <h2 className="font-semibold text-lg">General</h2>
                <Bars3Icon className="h-6 w-6 text-text-secondary cursor-pointer hover:text-white" />
            </div>

            {/* Task List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        onClick={() => onTaskSelect(task.id)}
                        className={`p-4 rounded-lg cursor-pointer transition-all duration-200 border ${activeTaskId === task.id
                                ? 'bg-dark-card border-brand-blue shadow-[0_0_10px_rgba(37,99,235,0.2)]'
                                : 'bg-dark-card border-transparent hover:border-gray-600 hover:shadow-md'
                            }`}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-mono text-text-secondary">{task.id}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${task.status === 'On Hold'
                                    ? 'bg-status-yellow/20 text-status-yellow'
                                    : 'bg-gray-700 text-gray-300'
                                }`}>
                                {task.status}
                            </span>
                        </div>

                        <h3 className="text-sm font-medium mb-2 line-clamp-2 leading-snug">
                            {task.title}
                        </h3>

                        <div className="flex justify-between items-center text-xs text-text-secondary">
                            <span>{task.assignee || 'Unassigned'}</span>
                            {task.priority === 'High' && (
                                <ExclamationCircleIcon className="h-4 w-4 text-red-500" />
                            )}
                        </div>
                        {activeTaskId === task.id && (
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-blue rounded-l-lg"></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskSidebar;
