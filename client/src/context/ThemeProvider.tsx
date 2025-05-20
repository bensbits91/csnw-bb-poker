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
export default function ThemeProvider({ children }: { children: ReactNode }) {
   /**
    * State for the current theme.
    * Retrieves the theme from local storage or defaults to 'dark'.
    */
   const [theme, setTheme] = useState<string>(() => {
      try {
         const storedTheme = localStorage.getItem('theme');
         if (storedTheme === 'light' || storedTheme === 'dark') {
            return storedTheme;
         }
         return 'dark';
      } catch (error) {
         console.error(
            'Failed to access localStorage. Defaulting to "dark".',
            error
         );
         return 'dark';
      }
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
      try {
         localStorage.setItem('theme', theme);
      } catch (error) {
         console.error('Failed to save theme to localStorage.', error);
      }
   }, [theme]);

   /**
    * Memoized value for the theme context.
    * Includes the current theme and the toggleTheme function.
    */
   const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

   return <ThemeContext value={value}>{children}</ThemeContext>;
}
