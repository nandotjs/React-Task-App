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
  const [filterStatus, setFilterStatus] = useState<string>("") 
  const tasks = useTaskStore((state) => state.tasks)
  const setTasks = useTaskStore((state) => state.setTasks)
  const addTask = useTaskStore((state) => state.addTask)
  const deleteTask = useTaskStore((state) => state.deleteTask)
  const toggleTask = useTaskStore((state) => state.toggleTask)
  const markAllCompleted = useTaskStore((state) => state.markAllCompleted)
  const deleteAllTasks = useTaskStore((state) => state.deleteAllTasks)
  
  useEffect(() => {
    if (userId) {
      fetchTasks() // Load tasks
    }
  }, [userId]) 
  
  useEffect(() => {
    if (filterStatus) {
      fetchTasks(filterStatus) // Load by filter
    } else {
      fetchTasks()
    }
  }, [filterStatus]) 
  
  // Load user tasks
  const fetchTasks = async (status?: string) => {
    try {
      if (userId) {
        let url = `http://localhost:4000/api/tasks/${userId}`
        if (status) {
          url += `/status/${status}`
        }
        const response = await axios.get(url)
        if (response.status === 200) {
          const userTasks = response.data.tasks 
          if (Array.isArray(userTasks)) {
            setTasks(
              userTasks.map((task) => ({
                title: task.title,
                completed: task.completed,
                _id: task._id,
              }))
            ) 
          } else {
            setTasks([])
          }
        }
      }
    } catch (error) {
      console.error("Failed to fetch user tasks:", error)
    }
  }

  // Add task
  const handleAddTask = async () => {
    try {
      if (newTask.trim()) {
        const response = await axios.post(
          `http://localhost:4000/api/tasks/create`,
          {
            userId,
            title: newTask,
          }
        )

        if (response.status === 201) {
          const createdTask = response.data; 
        addTask({
          title: newTask,
          completed: false,
          _id: createdTask._id, 
        });
          setNewTask("") 
        }
      }
    } catch (error) {
      console.error("Failed to create task:", error)
    }
  }

  // Delete all tasks
  const handleDeleteUserTasks = async () => {
    try {
      if (userId) {
        const response = await axios.delete(
          `http://localhost:4000/api/tasks/delete/${userId}`
        )
        if (response.status === 200) {
          deleteAllTasks() 
        }
      }
    } catch (error) {
      console.error("Failed to delete user tasks:", error)
    }
  }

  const handleMarkAllTasks = async () => {
    try {
      if (userId) {
        const response = await axios.patch(
          `http://localhost:4000/api/tasks/markAll/${userId}`
        )
        if (response.status === 200) {
          markAllCompleted() 
        }
      }
    } catch (error) {
      console.error("Failed to complet all tasks:", error)
    }
  }
  

  const handleLogout = () => {
    window.location.href = "/" 
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
            onClick={handleMarkAllTasks}
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
