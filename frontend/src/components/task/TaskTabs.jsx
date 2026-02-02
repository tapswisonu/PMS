import React from 'react';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

const tabs = [
    'Comments', 'Subtasks', 'Log Hours', 'Documents',
    'Dependency', 'Status Timeline', 'Issues', 'Activity Stream'
];

const TaskTabs = ({ activeTab, onTabChange }) => {
    return (
        <div className="flex items-center space-x-6 border-b border-gray-700/50 mb-6">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => onTabChange(tab)}
                    className={`pb-3 text-sm font-medium transition-colors relative ${activeTab === tab
                            ? 'text-white'
                            : 'text-gray-400 hover:text-gray-200'
                        }`}
                >
                    {tab}
                    {activeTab === tab && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-blue shadow-[0_0_8px_rgba(37,99,235,0.6)] rounded-t-sm"></span>
                    )}
                </button>
            ))}
            <button className="text-gray-400 hover:text-white pb-3">
                <EllipsisHorizontalIcon className="h-6 w-6" />
            </button>
        </div>
    );
};

export default TaskTabs;
