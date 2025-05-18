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
            'relative flex justify-between items-end gap-2',
            // isWinner && 'text-green-500'
         )}>
         <div className='flex items-end gap-2'>
            <Icon name={`Player${playerIndex + 1}Icon`} size={8} />
            <h3 className='text-3xl'>{playerName || `Player ${playerIndex + 1}`}</h3>
         </div>
         <div className='flex items-end gap-2'>
            {finalHand && (
               <div className='text-center text-3xl'>{finalHand.name}</div>
            )}
            {isLocked && !finalHand && <Icon name='LockIcon' size={4} />}
            {isWinner && (
               <div data-testid='winner-indicator' className='absolute -top-20 -right-20'>
                  <Icon name='WinnerIcon' size={20} />
               </div>
            )}
         </div>
      </div>
   );
}
