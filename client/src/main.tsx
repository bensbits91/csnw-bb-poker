import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import ThemeProvider from './context/ThemeProvider';
import { PlayersProvider } from '@/context/PlayersProvider';

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <ThemeProvider>
         <PlayersProvider>
            <App />
         </PlayersProvider>
      </ThemeProvider>
   </StrictMode>
);
