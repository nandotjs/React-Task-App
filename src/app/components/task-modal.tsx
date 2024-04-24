"use client";

import React, { useState } from 'react';

// Definição de tipo para o parâmetro text
interface TaskProps {
  text: string;
  onDelete: () => void;
  onToggle: () => void;
}


// Componente de tarefa individual
const Task: React.FC<TaskProps> = ({ text, onDelete, onToggle }) => {
  return (
    <div className="flex justify-between items-center bg-gray-100 p-4 mb-2 rounded border border-gray-600">
      <span className={`flex-grow ${text.includes('(Feito)') && 'line-through'}`}>{text}</span>
      <div className="flex">
        <button className="text-white bg-red-500 hover:bg-gray-800 hover:text-white font-medium py-1 px-2 rounded-md mr-2 transition duration-300 ease-in-out" onClick={onDelete}>Excluir</button>
        <button className="text-white bg-green-500 hover:bg-gray-800 hover:text-white font-medium py-1 px-2 rounded-md transition duration-300 ease-in-out" onClick={onToggle}>Feito</button>
      </div>
    </div>
  );
};



// Componente de lista de tarefas
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

  return (
    <div className="max-w-md mx-auto mt-8">
      {/* Componente para adicionar nova tarefa */}
      <div className="mb-4 flex justify-center">
        <input
          className="border border-gray-400 p-2 mr-2 w-64"
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
      {/* Lista de tarefas */}
      <div>
        {tasks.map((task, index) => (
          <Task
            key={index}
            text={task}
            onDelete={() => handleDeleteTask(index)}
            onToggle={() => handleToggleTask(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
