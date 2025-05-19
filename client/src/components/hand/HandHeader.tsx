import clsx from 'clsx';
import { Heading } from '@/components/typography';
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
   const pIndex = playerIndex + 1;

   return (
      <header
         id={`player-${pIndex}-header`}
         className={clsx(
            'flex items-end justify-between gap-2',
            isWinner && winnerTextClass
         )}>
         <div className="flex items-end gap-2">
            <Icon name={`Player${pIndex}Icon`} size={8} />
            <Heading level={2} appearance={3}>
               {playerName || `Player ${pIndex}`}
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
