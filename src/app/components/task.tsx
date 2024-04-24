"use client";

import React from 'react';

interface TaskProps {
  task: string;
  index: number;
  onDelete: (index: number) => void;
  onToggle: (index: number) => void;
}

const Task: React.FC<TaskProps> = ({ task, index, onDelete, onToggle }) => {
  return (
    <div className={`flex justify-between items-center bg-gray-100 p-4 mb-2 rounded border ${task.includes('(Feito)') ? 'border-green-500' : 'border-gray-600'}`}>
      <span className={`flex-grow ${task.includes('(Feito)') && 'line-through'}`}>{task}</span>
      <div className="flex">
        <button className="text-white bg-red-500 hover:bg-red-700 hover:text-white font-medium py-1 px-2 rounded-md mr-2 transition duration-300 ease-in-out" onClick={() => onDelete(index)}>Excluir</button>
        <button className={`text-white font-medium py-1 px-2 rounded-md transition duration-300 ease-in-out ${task.includes('(Feito)') ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-800'}`} onClick={() => onToggle(index)}>
          {task.includes('(Feito)') ? 'Desfazer' : 'Feito'}
        </button>
      </div>
    </div>
  );
};

export default Task;
