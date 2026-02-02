import React from 'react';
import {
    PaperClipIcon,
    ChatBubbleLeftIcon,
    InformationCircleIcon,
    EllipsisHorizontalIcon,
    XMarkIcon,
    ArrowsPointingOutIcon
} from '@heroicons/react/24/outline';

const TaskHeader = ({ task }) => {
    if (!task) return null;

    return (
        <div className="p-6 pb-2 border-b border-gray-700/50">
            {/* Top Controls */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                    <span className="bg-brand-blue/20 text-brand-blue px-2 py-1 rounded text-xs font-medium">Task</span>
                    <span className="text-gray-500 text-xs font-mono">{task.id}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                    <EllipsisHorizontalIcon className="h-5 w-5 hover:text-white cursor-pointer" />
                    <ArrowsPointingOutIcon className="h-5 w-5 hover:text-white cursor-pointer" />
                    <XMarkIcon className="h-5 w-5 hover:text-white cursor-pointer" />
                </div>
            </div>

            {/* Task Title */}
            <h1 className="text-2xl font-bold text-white mb-2">{task.title}</h1>

            {/* Metadata Row */}
            <div className="flex items-center space-x-4 text-sm text-gray-400 mb-6">
                <div className="flex items-center space-x-1">
                    <span className="text-xs">By</span>
                    <span className="text-white hover:underline cursor-pointer">{task.creator}</span>
                </div>

                <div className="flex items-center space-x-2">
                    <span className="opacity-50">|</span>
                    <span className="hover:text-white cursor-pointer flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        {task.project}
                    </span>
                </div>

                <div className="flex items-center space-x-3 pl-4">
                    <ChatBubbleLeftIcon className="h-4 w-4 hover:text-brand-blue cursor-pointer" />
                    <PaperClipIcon className="h-4 w-4 hover:text-brand-blue cursor-pointer" />
                    <InformationCircleIcon className="h-4 w-4 hover:text-brand-blue cursor-pointer" />
                </div>
            </div>

            {/* Status Section */}
            <div className="mb-4">
                <div className="inline-flex flex-col">
                    <div className="flex items-center space-x-2 text-status-yellow font-medium mb-1">
                        <span className="h-2.5 w-2.5 rounded-full bg-status-yellow"></span>
                        <span>{task.status}</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-gray-500 ml-5">Current Status</span>
                </div>
            </div>
        </div>
    );
};

export default TaskHeader;
