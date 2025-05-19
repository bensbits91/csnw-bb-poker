import { Toolbar, Button } from '@radix-ui/react-toolbar';
import clsx from 'clsx';
import { Icon } from '@/components/icons';
import { useTheme } from '@/hooks/';

/**
 * Props for the GameToolbar component.
 * @interface GameToolbarProps
 * @property {boolean} [isGameOver=false] - Indicates whether the game is over.
 * @property {() => void} onDealClick - Callback function triggered when the "New deal" button is clicked.
 * @property {() => void} onEndClick - Callback function triggered when the "Skip to winner" button is clicked.
 */
interface GameToolbarProps {
   isGameOver?: boolean;
   onDealClick: () => void;
   onEndClick: () => void;
}

/**
 * GameToolbar component.
 * Displays the toolbar for the poker game, including buttons for dealing a new hand,
 * skipping to the winner, and toggling the theme.
 *
 * @param {GameToolbarProps} props - The props for the GameToolbar component.
 * @returns {JSX.Element} The rendered GameToolbar component.
 */
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
            {/* New Deal Button */}
            <Button
               aria-label="New deal button"
               tabIndex={0}
               onClick={onDealClick}
               className="hover-bright wcag-focus flex items-center gap-2 md:cursor-pointer">
               <Icon name="ReloadIcon" />
               <div>New deal</div>
            </Button>
            {/* Skip to Winner Button */}
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
         {/* Theme Toggle Button */}
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
