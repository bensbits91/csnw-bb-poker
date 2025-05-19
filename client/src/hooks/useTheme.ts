import { use } from 'react';
import ThemeContext from '../context/ThemeContext';

/**
 * useTheme hook.
 * Provides access to the theme context, including the current theme and a function to toggle it.
 * Must be used within a `ThemeProvider`.
 *
 * @throws {Error} If the hook is used outside of a `ThemeProvider`.
 * @returns {Object} The theme context.
 * @property {string} theme - The current theme, either "light" or "dark".
 * @property {() => void} toggleTheme - Function to toggle between light and dark themes.
 */
export const useTheme = () => {
   const context = use(ThemeContext);
   if (!context) {
      throw new Error('useTheme must be used within a ThemeProvider');
   }
   return context;
};
