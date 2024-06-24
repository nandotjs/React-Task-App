"use client";

import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';

interface RegisterCardProps {
  onBackClick: () => void; // Adiciona a propriedade onBackClick para lidar com o clique no botão Voltar
}

const RegisterCard: React.FC<RegisterCardProps> = ({ onBackClick }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setUsernameError(false);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setPasswordError(false);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
    setConfirmPasswordError(false);
  };

  const handleRegister = async () => {
    // Verifica se os campos estão vazios
    if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
      // Define os estados de erro como verdadeiro
      setUsernameError(!username.trim());
      setPasswordError(!password.trim());
      setConfirmPasswordError(!confirmPassword.trim());
      return;
    }
  
    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
      setPasswordError(true);
      setConfirmPasswordError(true);
      return;
    }
  
    try {
      // Faz a requisição POST para o backend
      const response = await axios.post('http://localhost:4000/api/users/register', {
        name: username,
        password: password,
      });
  
      // Verifica a resposta do backend
      if (response.status === 201) {
        // Limpa os campos após o registro
        setUsername('');
        setPassword('');
        setConfirmPassword('');
  
        // Chama a função onBackClick para voltar para a tela anterior
        onBackClick();
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          console.error('Request Error:', axiosError.response.data);
        } else {
          console.error('Request Error:', axiosError.message);
        }
      } else {
        console.error('Unknown Error:', error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
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

        <div className="mb-4">
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

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              confirmPasswordError ? 'border-red-500' : ''
            }`}
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>

        <div className="flex justify-center mb-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="button"
            onClick={handleRegister}
          >
            Register
          </button>
        </div>

        {/* Adiciona o botão Voltar */}
        <div className="flex justify-center">
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={onBackClick} // Chama a função onBackClick quando o botão Voltar for clicado
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterCard;