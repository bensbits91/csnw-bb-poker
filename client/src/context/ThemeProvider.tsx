import { useState, useEffect, useMemo, useCallback } from 'react';
import type { ReactNode } from 'react';
import ThemeContext from './ThemeContext';

/**
 * ThemeProvider component.
 * Provides the theme context to its children, allowing them to access and toggle the application's theme.
 *
 * @param {Object} props - The props for the ThemeProvider component.
 * @param {ReactNode} props.children - The child components that will have access to the theme context.
 * @returns {JSX.Element} The rendered ThemeProvider component.
 */
const ThemeProvider = ({ children }: { children: ReactNode }) => {
   /**
    * State for the current theme.
    * Retrieves the theme from local storage or defaults to 'dark'.
    */
   const [theme, setTheme] = useState<string>(() => {
      return localStorage.getItem('theme') || 'dark';
   });

   /**
    * Toggles the theme between 'light' and 'dark'.
    */
   const toggleTheme = useCallback(() => {
      setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
   }, []);

   /**
    * Saves the current theme to local storage whenever it changes.
    */
   useEffect(() => {
      localStorage.setItem('theme', theme);
   }, [theme]);

   /**
    * Memoized value for the theme context.
    * Includes the current theme and the toggleTheme function.
    */
   const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

   return <ThemeContext value={value}>{children}</ThemeContext>;
};

export default ThemeProvider;
