import React from 'react';
import {
    BoldIcon,
    ItalicIcon,
    UnderlineIcon,
    Bars3BottomLeftIcon,
    ListBulletIcon,
    NumberedListIcon,
    LinkIcon,
    PhotoIcon,
    VariableIcon,
    ArrowsPointingOutIcon
} from '@heroicons/react/24/outline'; // Best approximation with available icons

const TaskCommentSection = () => {
    return (
        <div className="flex space-x-4">
            {/* Avatar */}
            <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-red-400 flex items-center justify-center text-white font-semibold text-sm">
                    TA
                </div>
            </div>

            {/* Editor Area */}
            <div className="flex-1">
                <div className="bg-dark-surface border border-gray-700 rounded-lg overflow-hidden focus-within:border-gray-500 transition-colors">
                    {/* Toolbar */}
                    <div className="bg-dark-card p-2 flex items-center justify-between border-b border-gray-700">
                        <div className="flex items-center space-x-1 text-gray-400">
                            {/* Text Formatting */}
                            <button className="p-1 hover:bg-gray-700 rounded"><BoldIcon className="h-4 w-4" /></button>
                            <button className="p-1 hover:bg-gray-700 rounded"><ItalicIcon className="h-4 w-4" /></button>
                            <button className="p-1 hover:bg-gray-700 rounded"><UnderlineIcon className="h-4 w-4" /></button>
                            <div className="w-px h-4 bg-gray-700 mx-2"></div>

                            {/* Font/Size Placeholders (Visual only) */}
                            <span className="text-xs px-2 cursor-pointer hover:bg-gray-700 rounded">Puvi</span>
                            <span className="text-xs px-2 cursor-pointer hover:bg-gray-700 rounded">13</span>

                            <div className="w-px h-4 bg-gray-700 mx-2"></div>

                            {/* Alignment & Lists */}
                            <button className="p-1 hover:bg-gray-700 rounded"><VariableIcon className="h-4 w-4" /></button>
                            <button className="p-1 hover:bg-gray-700 rounded"><Bars3BottomLeftIcon className="h-4 w-4" /></button>
                            <button className="p-1 hover:bg-gray-700 rounded"><ListBulletIcon className="h-4 w-4" /></button>
                            <button className="p-1 hover:bg-gray-700 rounded"><NumberedListIcon className="h-4 w-4" /></button>

                            <div className="w-px h-4 bg-gray-700 mx-2"></div>

                            <button className="p-1 hover:bg-gray-700 rounded"><LinkIcon className="h-4 w-4" /></button>
                            <button className="p-1 hover:bg-gray-700 rounded"><PhotoIcon className="h-4 w-4" /></button>
                        </div>

                        <div className="flex items-center space-x-2 text-gray-400">
                            <button className="p-1 bg-yellow-600/20 text-yellow-500 rounded text-xs font-bold px-2">AI</button>
                            <button className="p-1 hover:bg-gray-700 rounded"><ArrowsPointingOutIcon className="h-4 w-4" /></button>
                        </div>
                    </div>

                    {/* Input Area */}
                    <div className="p-4 min-h-[120px]">
                        <textarea
                            className="w-full bg-transparent border-none focus:ring-0 text-text-primary placeholder-gray-600 resize-none text-sm"
                            placeholder="Type @ to mention..."
                            rows="4"
                        ></textarea>
                    </div>
                </div>
                <div className="mt-2 text-xs">
                    <a href="#" className="text-brand-blue hover:underline flex items-center gap-1">
                        To add Task Comment via email
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16a5 5 0 01.954-2.51l4.242 4.242M12 3a9 9 0 110 18 9 9 0 010-18zm0 0c1.657 0 3 1.343 3 3v1m0-1v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default TaskCommentSection;
