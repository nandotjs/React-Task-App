"use client";

import React, { useState } from 'react';
import Task from './task';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const handleDeleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleToggleTask = (index: number) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? (task.includes('(Feito)') ? task.replace(' (Feito)', '') : task + ' (Feito)') : task
    );
    setTasks(updatedTasks);
  };

  const handleLogout = () => {
    window.location.href = '/';
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="flex justify-between mb-4">
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>
          Logout
        </button>
        <div className="flex justify-center items-center">
          <input
            className="border border-gray-400 p-2 mr-2 w-64 ml-2"
            type="text"
            placeholder="Adicionar nova tarefa"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleAddTask}
          >
            Adicionar
          </button>
        </div>
      </div>
      <div>
        {/* Mapeia cada tarefa para o componente Task */}
        {tasks.map((task, index) => (
          <Task key={index} task={task} index={index} onDelete={handleDeleteTask} onToggle={handleToggleTask} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
