"use client"

import React, { useState } from 'react';
import RegisterCard from './register'; // Importe o componente RegisterCard
import { useRouter } from 'next/navigation';

interface LoginCardProps {
  onRegisterClick: () => void; // Declare a propriedade onRegisterClick
}

const LoginCard: React.FC<LoginCardProps> = ({ onRegisterClick }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false); // Adicione um estado para controlar a exibição do RegisterCard
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
 
  const router = useRouter();

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
    router.push('/dashboard');
  };

  const handleRegisterClick = () => {
    setShowRegister(true); // Quando o botão "Register" for clicado, exiba o RegisterCard
  };

  const handleBackClick = () => {
    setShowRegister(false); // Quando o botão "Voltar" for clicado, volte para o LoginCard
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {!showRegister ? (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 " style={{ borderColor: '#c1c1c1', borderWidth: '1px' }}>

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
                passwordError ? 'border-red-500' : ''
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
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
              onClick={handleRegisterClick}
            >
              Register
            </button>
          </div>
        </div>
      ) : (
        <RegisterCard onBackClick={handleBackClick} /> // Passa a função handleBackClick para o componente RegisterCard
      )}
    </div>
  );
};

export default LoginCard;
