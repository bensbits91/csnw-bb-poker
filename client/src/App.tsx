import { Game } from '@/components/game';
import { useTheme } from '@/hooks/';
import clsx from 'clsx';

function App() {
   const { theme } = useTheme();
   const isDarkMode = theme === 'dark';
   const appClass = isDarkMode
      ? 'bg-[var(--csnw-gray-dark-50)] text-white'
      : 'bg-white text-gray-900';
   return (
      <section className={clsx('w-full h-screen flex md:place-items-center', appClass)}>
         <div className='container mx-auto'>
            <Game />
         </div>
      </section>
   );
}

export default App;
