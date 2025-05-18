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
      <Toolbar className="flex items-center gap-4">
         <Button asChild>
            <OurButton
               iconName="LockIcon"
               onClick={onKeepAllClick}
               disabled={isLocked}>
               Keep all
            </OurButton>
         </Button>
         <Button asChild>
            <OurButton
               iconName="UpdateIcon"
               onClick={onReplaceClick}
               disabled={!isSelection || isLocked}>
               Replace selected
            </OurButton>
         </Button>
      </Toolbar>
   );
}
