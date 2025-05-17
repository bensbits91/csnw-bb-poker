import { Toolbar, Button, ToggleGroup, ToggleItem } from '@radix-ui/react-toolbar';
import clsx from 'clsx';
import { Icon } from '@/components/icons';

interface GameToolbarProps {
   isGameOver?: boolean;
   onDealClick: () => void;
   onEndClick: () => void;
}

export function GameToolbar({ onDealClick, onEndClick, isGameOver }: GameToolbarProps) {
   return (
      <Toolbar className='flex items-center justify-between bg-gray-800 p-4'>
         <div className='flex items-center gap-2'>
            <Button
               onClick={onDealClick}
               className='flex items-center gap-2 md:cursor-pointer text-teal-500 md:hover:text-teal-600'>
               <Icon name='ReloadIcon' size={4} />
               <div>New deal</div>
            </Button>
            <Button
               disabled={isGameOver}
               onClick={onEndClick}
               className={clsx(
                  'flex items-center gap-2',
                  !isGameOver && 'md:cursor-pointer text-teal-500 md:hover:text-teal-600',
                  isGameOver && 'md:cursor-not-allowed text-gray-500'
               )}>
               <Icon name='SkipIcon' size={4} />
               <div>Skip to winner</div>
            </Button>
         </div>
         <ToggleGroup type='single' defaultValue='light'>
            <ToggleItem
               value='light'
               className='text-teal-500 md:hover:text-teal-600 cursor-pointer'>
               <Icon name='SunIcon' />
            </ToggleItem>
            <ToggleItem
               value='dark'
               className='text-teal-500 md:hover:text-teal-600 cursor-pointer'>
               <Icon name='MoonIcon' />
            </ToggleItem>
         </ToggleGroup>
      </Toolbar>
   );
}
