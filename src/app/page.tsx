"use client"

import React, { useState } from 'react';
import axios from 'axios';
import LoginCard from './components/login';
import RegisterCard from './components/register';
import TaskList from './components/task-list'; 

export default function Home() {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [userId, setUserId] = useState<string | null>(null);
  
  const handleTogglePage = () => {
    setIsLoginPage(!isLoginPage);
  };

  
  const handleLogin = (userId: string) => {
    setUserId(userId); // Armazena o ID do usuário no estado
    setIsLoggedIn(true); // Define o usuário como logado
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* Renderiza o TaskList se o usuário estiver logado */}
      {isLoggedIn ? (
        <TaskList userId={userId}/>
      ) : (
        // Renderiza o LoginCard ou o RegisterCard baseado no estado isLoginPage
        isLoginPage ? (
          <LoginCard onRegisterClick={handleTogglePage} onLogin={handleLogin} setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <RegisterCard onBackClick={handleTogglePage} />
        )
      )}
    </div>
  );
}
