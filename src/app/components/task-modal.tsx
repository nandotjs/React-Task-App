"use client";

import React, { useState } from 'react';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  // Função para adicionar uma nova tarefa
  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  // Função para excluir uma tarefa
  const handleDeleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // Função para marcar uma tarefa como feita ou não feita
  const handleToggleTask = (index: number) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? (task.includes('(Feito)') ? task.replace(' (Feito)', '') : task + ' (Feito)') : task
    );
    setTasks(updatedTasks);
  };

  // Função para fazer logout
  const handleLogout = () => {
    // Adicione a lógica de logout aqui, por exemplo, limpar o token de autenticação

    // Redirecionamento para a tela de login
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
        {tasks.map((task, index) => (
          <div key={index} className={`flex justify-between items-center bg-gray-100 p-4 mb-2 rounded border ${task.includes('(Feito)') ? 'border-green-500' : 'border-gray-600'}`}>
            <span className={`flex-grow ${task.includes('(Feito)') && 'line-through'}`}>{task}</span>
            <div className="flex">
              <button className="text-white bg-red-500 hover:bg-gray-800 hover:text-white font-medium py-1 px-2 rounded-md mr-2 transition duration-300 ease-in-out" onClick={() => handleDeleteTask(index)}>Excluir</button>
              <button className="text-white bg-green-500 hover:bg-gray-800 hover:text-white font-medium py-1 px-2 rounded-md transition duration-300 ease-in-out" onClick={() => handleToggleTask(index)}>Feito</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;

