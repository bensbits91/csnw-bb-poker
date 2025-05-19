import clsx from 'clsx';
import { Heading } from '@/components/typography';
import { Icon } from '@/components/icons';
import { useTheme } from '@/hooks/';
import { useRef } from 'react';
import { usePlayers } from '@/hooks/usePlayers';

interface HandHeaderProps {
   playerIndex: number;
   playerName?: string;
   isLocked: boolean;
   finalHand?: {
      name: string;
      rank: number;
      tiebreaker: number[];
   };
   isWinner?: boolean;
   onUpdatePlayerName: (playerIndex: number, name: string) => void;
}

export function HandHeader({
   playerIndex,
   isLocked,
   finalHand,
   isWinner = false
}: HandHeaderProps) {
   const { theme } = useTheme();
   const isDarkMode = theme === 'dark';
   const winnerTextClass = isDarkMode ? 'text-teal-dark' : 'text-teal';

   const {
      players,
      isEditing,
      tempNames,
      startEditing,
      cancelEditing,
      saveEditing,
      setTempName
   } = usePlayers();

   const inputRef = useRef<HTMLInputElement>(null); // Ref for the input element

   const handleStartEditing = () => {
      startEditing(playerIndex); // Enable editing
      setTimeout(() => {
         if (inputRef.current) {
            inputRef.current.focus(); // Focus the input
            inputRef.current.select(); // Select all text
         }
      }, 0);
   };

   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         saveEditing(playerIndex); // Trigger saveEditing on Enter
      } else if (e.key === 'Escape') {
         cancelEditing(playerIndex); // Trigger cancelEditing on Escape
      }
   };

   const pIndex = playerIndex + 1;

   return (
      <header
         id={`player-${pIndex}-header`}
         className={clsx(
            'z-10 flex items-end justify-between gap-2',
            isWinner && winnerTextClass
         )}>
         <div className="flex items-end gap-2">
            <Icon name={`Player${pIndex}Icon`} size={8} />
            <Heading level={2} appearance={3}>
               <div className="flex items-center gap-2">
                  {isEditing[playerIndex] ? (
                     <>
                        <input
                           ref={inputRef} // Attach the ref to the input
                           type="text"
                           value={tempNames[playerIndex]}
                           onChange={e =>
                              setTempName(playerIndex, e.target.value)
                           }
                           onKeyDown={handleKeyDown} // Handle keyboard events
                           className="border-b border-gray-400 bg-transparent text-xl focus:outline-none"
                           aria-label={`Edit name for Player ${pIndex}`}
                        />
                        <button
                           type="button"
                           onClick={() => saveEditing(playerIndex)}
                           className="cursor-pointer text-green-500"
                           aria-label={`Save name for Player ${pIndex}`}>
                           <Icon name="CheckIcon" size={4} />
                        </button>
                        <button
                           type="button"
                           onClick={() => cancelEditing(playerIndex)}
                           className="cursor-pointer text-red-500"
                           aria-label={`Cancel editing name for Player ${pIndex}`}>
                           <Icon name="CloseIcon" size={4} />
                        </button>
                     </>
                  ) : (
                     <>
                        <span
                           onClick={handleStartEditing}
                           className="cursor-pointer">
                           {players[playerIndex].name}
                        </span>
                        <button
                           type="button"
                           onClick={handleStartEditing}
                           className="cursor-pointer text-gray-500"
                           aria-label={`Edit name for Player ${pIndex}`}>
                           <Icon name="PencilIcon" size={4} />
                        </button>
                     </>
                  )}
               </div>
            </Heading>
         </div>
         <div className="flex items-end gap-2">
            {finalHand && (
               <div className="text-center text-3xl" aria-live="polite">
                  {finalHand.name}
               </div>
            )}
            {isLocked && !finalHand && <Icon name="LockIcon" size={8} />}
         </div>
      </header>
   );
}
