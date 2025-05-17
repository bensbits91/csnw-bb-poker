import { Toolbar, Button, ToggleGroup, ToggleItem } from '@radix-ui/react-toolbar';
import { Button as OurButton } from '../common';

interface GameToolbarProps {
   onDealClick: () => void;
}

export function GameToolbar({ onDealClick }: GameToolbarProps) {
   return (
      <Toolbar className='flex items-center justify-between bg-gray-800 p-4'>
         <Button asChild>
            <OurButton onClick={onDealClick}>Deal</OurButton>
         </Button>
         <ToggleGroup type='single' defaultValue='replace'>
            <ToggleItem value='replace'>Replace</ToggleItem>
            <ToggleItem value='lock'>Lock</ToggleItem>
         </ToggleGroup>
      </Toolbar>
   );
}
