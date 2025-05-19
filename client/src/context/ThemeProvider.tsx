import { useState, useEffect, useMemo, useCallback } from 'react';
import type { ReactNode } from 'react';
import ThemeContext from './ThemeContext';

const ThemeProvider = ({ children }: { children: ReactNode }) => {
   // Retrieve the theme from local storage or default to 'light'
   const [theme, setTheme] = useState<string>(() => {
      return localStorage.getItem('theme') || 'dark';
   });

   const toggleTheme = useCallback(() => {
      setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
   }, []);

   // Save the theme to local storage whenever it changes
   useEffect(() => {
      localStorage.setItem('theme', theme);
   }, [theme]);

   const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

   return (
      <ThemeContext value={value}>
         {children}
      </ThemeContext>
   );
};

export default ThemeProvider;
