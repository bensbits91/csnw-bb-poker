import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ErrorBoundary } from '@/components/common/';
import ThemeProvider from '@/context/ThemeProvider';
import PlayersProvider from '@/context/PlayersProvider';

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <ThemeProvider>
         <PlayersProvider>
            <ErrorBoundary>
               <App />
            </ErrorBoundary>
         </PlayersProvider>
      </ThemeProvider>
   </StrictMode>
);
