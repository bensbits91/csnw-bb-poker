import { useState } from 'react';
import type { ReactNode } from 'react';
import ThemeContext from './ThemeContext';

const ThemeProvider = ({ children }: { children: ReactNode }) => {
   const [theme, setTheme] = useState<string>('light'); // Default theme is 'light'

   const toggleTheme = () => {
      setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
   };

   return (
      <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
         {children}
      </ThemeContext.Provider>
   );
};

export default ThemeProvider;
