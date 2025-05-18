import { Toolbar, Button } from '@radix-ui/react-toolbar';
import clsx from 'clsx';
import { Icon } from '@/components/icons';
import { useTheme } from '@/hooks/';

interface GameToolbarProps {
   isGameOver?: boolean;
   onDealClick: () => void;
   onEndClick: () => void;
}

export function GameToolbar({ onDealClick, onEndClick, isGameOver }: GameToolbarProps) {
   const { theme, toggleTheme } = useTheme();
   const isDarkMode = theme === 'dark';

   return (
      <Toolbar
         className={clsx(
            'flex items-center justify-between px-8 py-4 rounded-lg',
            isDarkMode
               ? 'bg-elevated-dark-1 shadow-dark-1 link-dark'
               : 'bg-elevated-1 shadow-1 link'
         )}>
         <div className='flex items-center gap-6'>
            <Button
               onClick={onDealClick}
               className='flex items-center gap-2 md:cursor-pointer hover-bright'>
               <Icon name='ReloadIcon' />
               <div>New deal</div>
            </Button>
            <Button
               disabled={isGameOver}
               onClick={onEndClick}
               className={clsx(
                  'flex items-center gap-2',
                  isGameOver
                     ? 'md:cursor-not-allowed disabled-text'
                     : 'md:cursor-pointer hover-bright'
               )}>
               <Icon name='SkipIcon' />
               <div>Skip to winner</div>
            </Button>
         </div>
         <Button
            onClick={() => {
               toggleTheme();
            }}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className='cursor-pointer hover-bright'>
            <Icon name={theme === 'dark' ? 'SunIcon' : 'MoonIcon'} />
         </Button>
      </Toolbar>
   );
}
