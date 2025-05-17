import clsx from 'clsx';
import { Icon } from '../icons';

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
}

export function HandHeader({
   playerIndex,
   playerName,
   isLocked,
   finalHand,
   isWinner = false
}: HandHeaderProps) {
   return (
      <div
         className={clsx(
            'flex justify-between items-end gap-2 h-16',
            isWinner && 'text-green-500'
         )}>
         <div className='flex items-end gap-2'>
            <Icon name='PersonIcon' size={6} />
            {playerName || `Player ${playerIndex + 1}`}
         </div>
         <div className='flex items-end gap-2'>
            {finalHand && (
               <div className='text-center text-lg font-semibold'>{finalHand.name}</div>
            )}
            {isLocked && !finalHand && <Icon name='LockIcon' size={4} />}
            {isWinner && (
               <div data-testid='winner-indicator'>
                  <Icon name='WinnerIcon' size={12} />
               </div>
            )}
         </div>
      </div>
   );
}
