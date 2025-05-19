import { Toolbar, Button } from '@radix-ui/react-toolbar';
import { Button as OurButton } from '@/components/common';

interface HandToolbarProps {
   playerIndex: number;
   isSelection?: boolean;
   isLocked?: boolean;
   onKeepAllClick: () => void;
   onReplaceClick: () => void;
}

export function HandToolbar({
   playerIndex,
   isSelection,
   isLocked,
   onKeepAllClick,
   onReplaceClick
}: HandToolbarProps) {
   const pIndex = playerIndex + 1;

   return (
      <Toolbar
         aria-label={`Player ${pIndex}`}
         className="flex items-center gap-4">
         <Button asChild aria-label="Keep all cards button">
            <OurButton
               iconName="LockIcon"
               onClick={onKeepAllClick}
               disabled={isLocked}>
               Keep all
            </OurButton>
         </Button>
         <Button asChild aria-label="Replace selected cards button">
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
