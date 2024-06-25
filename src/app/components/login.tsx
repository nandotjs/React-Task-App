"use client";

import React, { useState } from 'react';
import axios from 'axios';
import RegisterCard from './register'; // Importe o componente RegisterCard
import { useRouter } from 'next/navigation';

interface LoginCardProps {
  onRegisterClick: () => void; // Declare a propriedade onRegisterClick
  onLogin: (userId: string) => void;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>; // Adicione setIsLoggedIn como uma propriedade
}

const LoginCard: React.FC<LoginCardProps> = ({ onRegisterClick, onLogin, setIsLoggedIn }) => {
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

  const handleLogin = async () => {
    // Verifica se os campos estão vazios
    if (!username.trim() || !password.trim()) {
      setUsernameError(!username.trim());
      setPasswordError(!password.trim());
      return;
    }

    try {
      // Faz a requisição GET para o backend para realizar o login
      const response = await axios.get(`http://localhost:4000/api/users/login`, {
        params: {
          username,
          password
        }
      });

      // Verifica a resposta do backend
      if (response.status === 200) {
        const userData = response.data.user;
        console.log('User data:', userData);
        onLogin(userData._id);
        setUsername('');
        setPassword('');
        // Chama a função onLogin para atualizar o estado de isLoggedIn no componente pai (Home)
        setIsLoggedIn(true)
      }
    } catch (error) {
      setUsernameError(true);
      setPasswordError(true);
      console.error('Login failed:', error);
    }
  };

  const handleRegisterClick = () => {
    setShowRegister(true); 
  };

  const handleBackClick = () => {
    setShowRegister(false); 
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {!showRegister ? (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8" style={{ borderColor: '#c1c1c1', borderWidth: '1px' }}>

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
        <RegisterCard onBackClick={handleBackClick} /> 
      )}
    </div>
  );
};

export default LoginCard;
