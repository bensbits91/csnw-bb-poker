import { Heading } from '@/components/typography';
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
      <section
         className={clsx(
            'min-h-screen w-full overflow-x-hidden px-2 pt-6 pb-15 md:px-12 md:pt-12',
            appClass
         )}>
         <div className="container mx-auto max-w-[1280px]">
            <div className="flex flex-col gap-8">
               <div>
                  <Heading className="text-center">CSNW Poker by Ben</Heading>
                  <Heading level={2} appearance={3} className="text-center">
                     5-card single-draw no-betting good-wholesome fun
                  </Heading>
               </div>
               <Game />
            </div>
         </div>
      </section>
   );
}

export default App;
