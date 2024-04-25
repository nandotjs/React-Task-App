"use client"

import React, { useState } from 'react';
import Task from './task';
import { useTaskStore } from './taskStore';

const TaskList: React.FC = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const toggleTask = useTaskStore((state) => state.toggleTask);
  const markAllCompleted = useTaskStore((state) => state.markAllCompleted);
  const deleteAllTasks = useTaskStore((state) => state.deleteAllTasks);

  const [newTask, setNewTask] = useState<string>('');

  const handleAddTask = () => {
    if (newTask.trim()) {
      addTask(newTask);
      setNewTask('');
    }
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
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddTask}>
            Adicionar
          </button>
        </div>
      </div>
      <div>
        {/* Mapeia cada tarefa para o componente Task */}
        {tasks.map((task, index) => (
          <Task key={index} task={task} index={index} onDelete={() => deleteTask(index)} onToggle={() => toggleTask(index)} />
        ))}
        <div className="flex justify-between mb-4">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={markAllCompleted}>
            Marcar Todas como Concluídas
          </button>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={deleteAllTasks}>
            Excluir Todas
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
