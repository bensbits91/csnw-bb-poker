import { createContext } from 'react';

/**
 * ThemeContextType interface.
 * Defines the shape of the theme context, including the current theme and a function to toggle it.
 *
 * @interface ThemeContextType
 * @property {string} theme - The current theme, either "light" or "dark".
 * @property {() => void} toggleTheme - Function to toggle between light and dark themes.
 */
interface ThemeContextType {
   theme: string;
   toggleTheme: () => void;
}

/**
 * ThemeContext.
 * A React context for managing the application's theme (light or dark).
 * Provides the current theme and a function to toggle the theme.
 *
 * @type {React.Context<ThemeContextType | undefined>}
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export default ThemeContext;
