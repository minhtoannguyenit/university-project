'use client';

import { useState } from 'react';
import styles from './LoginForm.module.css';
import AuthService from '../services/AuthService';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isLoggedIn = await AuthService.login(email, password);
      console.log('isLoggedIn:', isLoggedIn);
      if (isLoggedIn) {
        await AuthService.me();
        // Redirect to dashboard upon successful login
        router.push('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error (e.g., show error message)
    }
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Login</h2>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.button}>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
