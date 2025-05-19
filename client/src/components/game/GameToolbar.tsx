import { Toolbar, Button } from '@radix-ui/react-toolbar';
import clsx from 'clsx';
import { Icon } from '@/components/icons';
import { useTheme } from '@/hooks/';

interface GameToolbarProps {
   isGameOver?: boolean;
   onDealClick: () => void;
   onEndClick: () => void;
}

export function GameToolbar({
   onDealClick,
   onEndClick,
   isGameOver
}: GameToolbarProps) {
   const { theme, toggleTheme } = useTheme();
   const isDarkMode = theme === 'dark';

   return (
      <Toolbar
         className={clsx(
            'flex items-center justify-between rounded-lg px-8 py-4',
            isDarkMode
               ? 'bg-elevated-dark-1 shadow-dark-1 text-teal-dark'
               : 'bg-elevated-1 shadow-1 text-teal'
         )}>
         <div className="flex items-center gap-6">
            <Button
               aria-label="New deal button"
               tabIndex={0}
               onClick={onDealClick}
               className="hover-bright wcag-focus flex items-center gap-2 md:cursor-pointer">
               <Icon name="ReloadIcon" />
               <div>New deal</div>
            </Button>
            <Button
               aria-label="Skip to winner button"
               disabled={isGameOver}
               tabIndex={isGameOver ? -1 : 0}
               onClick={onEndClick}
               className={clsx(
                  'wcag-focus flex items-center gap-2',
                  isGameOver
                     ? 'disabled-text md:cursor-not-allowed'
                     : 'hover-bright md:cursor-pointer'
               )}>
               <Icon name="SkipIcon" />
               <div>Skip to winner</div>
            </Button>
         </div>
         <Button
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            tabIndex={0}
            data-testid="theme-toggle-button"
            onClick={() => {
               toggleTheme();
            }}
            className="hover-bright wcag-focus cursor-pointer">
            <Icon name={theme === 'dark' ? 'SunIcon' : 'MoonIcon'} />
         </Button>
      </Toolbar>
   );
}
