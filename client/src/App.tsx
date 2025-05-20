import { Game, GameHeader } from '@/components/game';
import { useTheme } from '@/hooks/';
import clsx from 'clsx';

/**
 * App component.
 * The root component of the application. It sets up the main layout, applies theme-based styling,
 * and renders the game header and game components.
 *
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
   const { theme } = useTheme();
   const isDarkMode = theme === 'dark';

   return (
      <main
         className={clsx(
            'min-h-screen w-full overflow-x-hidden px-2 pt-6 pb-15 md:px-12 md:pt-8',
            isDarkMode
               ? 'bg-csnw-gray-dark-50 text-white'
               : 'bg-white text-gray-900'
         )}>
         <div className="container mx-auto max-w-[1280px]">
            <div className="flex flex-col gap-8">
               <GameHeader />
               <Game />
            </div>
         </div>
      </main>
   );
}

export default App;
