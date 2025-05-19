import { Toolbar, Button } from '@radix-ui/react-toolbar';
import { Button as OurButton } from '@/components/common';

/**
 * Props for the HandToolbar component.
 * @typedef {Object} HandToolbarProps
 * @property {number} playerIndex - The index of the player.
 * @property {boolean} [isSelection=false] - Whether there are selected cards.
 * @property {boolean} [isLocked=false] - Whether the player's hand is locked.
 * @property {() => void} onKeepAllClick - Callback triggered when the "Keep all" button is clicked.
 * @property {() => void} onReplaceClick - Callback triggered when the "Replace selected" button is clicked.
 */
interface HandToolbarProps {
   playerIndex: number;
   isSelection?: boolean;
   isLocked?: boolean;
   onKeepAllClick: () => void;
   onReplaceClick: () => void;
}

/**
 * HandToolbar component.
 * Displays the toolbar for a player's hand, providing actions to lock all cards or replace selected cards.
 *
 * @param {HandToolbarProps} props - The props for the HandToolbar component.
 * @returns {JSX.Element} The rendered HandToolbar component.
 */
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
