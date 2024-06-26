"use client"

import React, { useState, useEffect } from "react"
import Task from "./task"
import { useTaskStore } from "./taskStore"
import axios from "axios"

interface TaskListProps {
  userId: string
}

const TaskList: React.FC<TaskListProps> = ({ userId }) => {
  const [newTask, setNewTask] = useState<string>("")
  const [filterStatus, setFilterStatus] = useState<string>("") // Novo estado para o filtro
  const tasks = useTaskStore((state) => state.tasks)
  const setTasks = useTaskStore((state) => state.setTasks)
  const addTask = useTaskStore((state) => state.addTask)
  const deleteTask = useTaskStore((state) => state.deleteTask)
  const toggleTask = useTaskStore((state) => state.toggleTask)
  const markAllCompleted = useTaskStore((state) => state.markAllCompleted)
  const deleteAllTasks = useTaskStore((state) => state.deleteAllTasks)

  // Função para carregar as tarefas do usuário ao fazer login
  const fetchTasks = async (status?: string) => {
    try {
      if (userId) {
        let url = `http://localhost:4000/api/tasks/${userId}`
        if (status) {
          url += `/status/${status}`
        }
        const response = await axios.get(url)
        if (response.status === 200) {
          const userTasks = response.data.tasks // Supondo que o backend retorna um objeto com uma propriedade tasks
          if (Array.isArray(userTasks)) {
            setTasks(
              userTasks.map((task) => ({
                title: task.title,
                completed: task.completed,
                _id: task._id,
              }))
            ) // Ajuste para mapear apenas os títulos das tarefas
          } else {
            setTasks([])
          }
        }
      }
    } catch (error) {
      console.error("Failed to fetch user tasks:", error)
    }
  }

  useEffect(() => {
    if (userId) {
      fetchTasks() // Carrega as tarefas do usuário ao montar o componente
    }
  }, [userId]) // Dispara o efeito sempre que o userId mudar

  useEffect(() => {
    if (filterStatus) {
      fetchTasks(filterStatus) // Recarrega as tarefas com base no filtro
    } else {
      fetchTasks()
    }
  }, [filterStatus]) // Dispara o efeito sempre que o filtro mudar

  const handleAddTask = async () => {
    try {
      if (newTask.trim()) {
        // Faz a requisição POST para criar uma nova tarefa associada ao usuário
        const response = await axios.post(
          `http://localhost:4000/api/tasks/create`,
          {
            userId,
            title: newTask,
          }
        )

        if (response.status === 201) {
          // Atualiza o estado local com a nova tarefa adicionada
          addTask(newTask)
          setNewTask("") // Limpa o campo de nova tarefa após criar
        }
      }
    } catch (error) {
      console.error("Failed to create task:", error)
    }
  }

  const handleDeleteUserTasks = async () => {
    try {
      if (userId) {
        const response = await axios.delete(
          `http://localhost:4000/api/tasks/delete/${userId}`
        )
        if (response.status === 200) {
          deleteAllTasks() // Limpa todas as tarefas localmente após exclusão bem-sucedida
        }
      }
    } catch (error) {
      console.error("Failed to delete user tasks:", error)
    }
  }

  const handleLogout = () => {
    window.location.href = "/" // Redireciona para a página inicial ao fazer logout
  }

  return (
    <div className="fixed top-0 left-0 right-0 max-w-md mx-auto mt-8">
      <div className="flex justify-between mb-4">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleLogout}
        >
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
      <div className="flex justify-center mb-4">
        <select
          className="border border-gray-400 p-2 rounded"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="concluidas">Concluídas</option>
          <option value="em_andamento">Em Andamento</option>
        </select>
      </div>
      <div>
        {tasks.map((task, index) => (
          <Task
            key={index}
            task={task}
            index={index}
            onDelete={() => deleteTask(index)}
            onToggle={() => toggleTask(index)}
            userId={userId}
          />
        ))}
        <div className="flex justify-between mb-4">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={markAllCompleted}
          >
            Marcar Todas como Concluídas
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleDeleteUserTasks}
          >
            Excluir Todas
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskList
