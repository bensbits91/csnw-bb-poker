import clsx from 'clsx';
import { Icon } from '@/components/icons';
import { useTheme } from '@/hooks/';
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
   const { theme } = useTheme();
   const isDarkMode = theme === 'dark';
   const winnerTextClass = isDarkMode ? 'text-teal-dark' : 'text-teal';

   return (
      <div
         className={clsx(
            'flex justify-between items-end gap-2',
            isWinner && winnerTextClass
         )}>
         <div className='flex items-end gap-2'>
            <Icon name={`Player${playerIndex + 1}Icon`} size={8} />
            <h3 className='text-3xl'>{playerName || `Player ${playerIndex + 1}`}</h3>
         </div>
         <div className='flex items-end gap-2'>
            {finalHand && <div className='text-center text-3xl'>{finalHand.name}</div>}
            {isLocked && !finalHand && <Icon name='LockIcon' size={8} />}
         </div>
      </div>
   );
}
