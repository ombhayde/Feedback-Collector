'use client';
import { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import styles from './styles/ThemeToggle.module.css';

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <label className={styles.toggleContainer}>
      <input 
        type="checkbox" 
        checked={darkMode}
        onChange={() => setDarkMode(!darkMode)}
        className={styles.toggleInput}
      />
      <span className={styles.toggleSlider}></span>
      <div className={`${styles.toggleIcons} ${styles.sunIcon}`}>
        <SunIcon className="h-4 w-4" />
      </div>
      <div className={`${styles.toggleIcons} ${styles.moonIcon}`}>
        <MoonIcon className="h-4 w-4" />
      </div>
    </label>
  );
}