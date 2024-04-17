"use client"

import React, { useState } from 'react';
import LoginCard from './components/login';
import RegisterCard from './components/register';

export default function Home() {
  const [isLoginPage, setIsLoginPage] = useState(true);

  const handleTogglePage = () => {
    setIsLoginPage(!isLoginPage);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {isLoginPage ? (
        <LoginCard onRegisterClick={handleTogglePage} />
      ) : (
        <RegisterCard />
      )}
    </div>
  );
}

