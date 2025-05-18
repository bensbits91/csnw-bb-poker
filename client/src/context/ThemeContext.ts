import { createContext } from 'react';

interface ThemeContextType {
   theme: string;
   toggleTheme: () => void;
   setTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export default ThemeContext;
