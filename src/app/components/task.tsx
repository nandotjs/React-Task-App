"use client"

import React from "react"
import axios from "axios"

interface TaskProps {
  task: { _id: string; title: string; completed: boolean }
  userId: string
  index: number
  onDelete: (index: number) => void
  onToggle: (index: number) => void
}

const Task: React.FC<TaskProps> = ({
  task,
  userId,
  index,
  onDelete,
  onToggle,
}) => {
  // Delete Task
  const handleDeleteTask = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/tasks/delete/${userId}/${index}`
      )
      if (response.status === 200) {
        onDelete(index) 
      }
    } catch (error) {
      console.error("Failed to delete task:", error)
    }
  }

  // Mark task as completed or not
  const handleToggleTask = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:4000/api/tasks/updateStatus/${task._id}`,
        {
          completed: !task.completed,
        }
      )
      if (response.status === 200) {
        onToggle(index) 
      }
    } catch (error) {
      console.error("Failed to update task status:", error)
    }
  }

  return (
    <div
      className={`flex justify-between items-center bg-gray-100 p-4 mb-2 rounded border ${
        task.completed ? "border-green-500" : "border-gray-600"
      }`}
    >
      <span className={`flex-grow ${task.completed && "line-through"}`}>
        {task.title}
      </span>
      <div className="flex">
        <button
          className="text-white bg-red-500 hover:bg-red-700 hover:text-white font-medium py-1 px-2 rounded-md mr-2 transition duration-300 ease-in-out"
          onClick={handleDeleteTask}
        >
          Excluir
        </button>
        <button
          className={`text-white font-medium py-1 px-2 rounded-md transition duration-300 ease-in-out ${
            task.completed
              ? "bg-red-500 hover:bg-red-700"
              : "bg-green-500 hover:bg-green-800"
          }`}
          onClick={handleToggleTask}
        >
          {task.completed ? "Desfazer" : "Feito"}
        </button>
      </div>
    </div>
  )
}

export default Task
