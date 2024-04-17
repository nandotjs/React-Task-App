"use client";

import React, { useState } from 'react';
import RegisterCard from './register'; // Importe o componente RegisterCard

interface LoginCardProps {
    onRegisterClick: () => void; // Declare a propriedade onRegisterClick
}

const LoginCard: React.FC<LoginCardProps> = ({ onRegisterClick }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false); // Adicione um estado para controlar a exibição do RegisterCard
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setUsernameError(false);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setPasswordError(false);
  };

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
        setUsernameError(!username.trim());
        setPasswordError(!password.trim());
        return;
    }
    console.log('Login:', { username, password });
  };

  const handleRegisterClick = () => {
    setShowRegister(true); // Quando o botão "Register" for clicado, exiba o RegisterCard
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {!showRegister ? ( // Verifica se o RegisterCard deve ser exibido
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 ">

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                usernameError ? 'border-red-500' : ''
              }`}
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                usernameError ? 'border-red-500' : ''
              }`}
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleLogin}
            >
              Sign In
            </button>
            
            <div className="flex justify-center">
              <p className="text-gray-700 mx-2">or</p>
            </div>
            
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleRegisterClick} // Chame a função handleRegisterClick quando o botão "Register" for clicado
            >
              Register
            </button>
          </div>
        </div>
      ) : (
        <RegisterCard /> // Exibe o RegisterCard se showRegister for true
      )}
    </div>
  );
};

export default LoginCard;
