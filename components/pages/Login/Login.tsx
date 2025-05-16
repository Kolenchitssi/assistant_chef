'use client';

import { useState, FormEvent } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/utils/firebase'; // Импортируйте инициализацию Firebase

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Здесь можно перенаправить пользователя на главную страницу или в другой компонент
    } catch (err: unknown) {
      // Лучше использовать 'unknown' и сделать проверку
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ошибка входа'); // Обработать другие возможные ошибки
      }
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h1>Вход</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Войти</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default Login;
