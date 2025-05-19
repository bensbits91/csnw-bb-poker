import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import ThemeContext from './ThemeContext';

const ThemeProvider = ({ children }: { children: ReactNode }) => {
   // Retrieve the theme from local storage or default to 'light'
   const [theme, setTheme] = useState<string>(() => {
      return localStorage.getItem('theme') || 'dark';
   });

   const toggleTheme = () => {
      setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
   };

   // Save the theme to local storage whenever it changes
   useEffect(() => {
      localStorage.setItem('theme', theme);
   }, [theme]);

   return (
      <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
         {children}
      </ThemeContext.Provider>
   );
};

export default ThemeProvider;

// import { useState } from 'react';
// import type { ReactNode } from 'react';
// import ThemeContext from './ThemeContext';

// const ThemeProvider = ({ children }: { children: ReactNode }) => {
//    const [theme, setTheme] = useState<string>('light'); // Default theme is 'light'

//    const toggleTheme = () => {
//       setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
//    };

//    return (
//       <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
//          {children}
//       </ThemeContext.Provider>
//    );
// };

// export default ThemeProvider;
