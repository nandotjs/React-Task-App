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
    <div className="flex justify-between items-center bg-gray-100 p-4 mb-2 rounded">
      <span className={`flex-grow ${text.includes('(Feito)') && 'line-through'}`}>{text}</span>
      <div className="flex">
        <button className="text-red-500 mr-2" onClick={onDelete}>Excluir</button>
        <button className="text-green-500" onClick={onToggle}>Feito</button>
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
    <div>
      {/* Componente para adicionar nova tarefa */}
      <div className="mb-4">
        <input
          className="border border-gray-400 p-2 mr-2"
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