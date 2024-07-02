"use client"

import React, { useState } from "react"
import LoginCard from "./components/login"
import RegisterCard from "./components/register"
import TaskList from "./components/task-list"

export default function Home() {
  const [isLoginPage, setIsLoginPage] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState<string>('')

  const handleTogglePage = () => {
    setIsLoginPage(!isLoginPage)
  }

  const handleLogin = (userId: string) => {
    setUserId(userId) 
    setIsLoggedIn(true) 
  }

  return (
    <div className="flex justify-center items-center h-screen">
      {/* if is logged shows taskList */}
      {isLoggedIn ? (
        <TaskList userId={userId ?? ''} />
      ) : // switch btween login and register
      isLoginPage ? (
        <LoginCard
          onRegisterClick={handleTogglePage}
          onLogin={handleLogin}
          setIsLoggedIn={setIsLoggedIn}
        />
      ) : (
        <RegisterCard onBackClick={handleTogglePage} />
      )}
    </div>
  )
}
