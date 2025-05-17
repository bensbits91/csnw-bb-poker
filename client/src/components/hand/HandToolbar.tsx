import { Toolbar, Button } from '@radix-ui/react-toolbar';
import { Button as OurButton } from '../common';

interface HandToolbarProps {
   isSelection?: boolean;
   isLocked?: boolean;
   onKeepAllClick: () => void;
   onReplaceClick: () => void;
}

export function HandToolbar({
   isSelection,
   isLocked,
   onKeepAllClick,
   onReplaceClick
}: HandToolbarProps) {
   return (
      <Toolbar className='flex items-center justify-between bg-gray-800 p-4'>
         <Button asChild>
            <OurButton onClick={onKeepAllClick}>Keep all</OurButton>
         </Button>
         <Button asChild>
            <OurButton onClick={onReplaceClick} disabled={!isSelection || isLocked}>
               Replace selected
            </OurButton>
         </Button>
      </Toolbar>
   );
}
