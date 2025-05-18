import { Hand } from '@/components/hand';
import { GameToolbar } from './GameToolbar';
import { useGame } from '@/hooks';

export function Game() {
   const {
      players,
      wasReset,
      winners,
      finalHands,
      handleLockHand,
      handleReplaceCards,
      handleDealClick,
      handleEndNowClick
   } = useGame();

   return (
      <>
         <GameToolbar
            isGameOver={!!winners}
            onDealClick={handleDealClick}
            onEndClick={handleEndNowClick}
         />
         {/* Table */}
         <div className="grid gap-8 md:grid-cols-2">
            {players.map((hand, index) => (
               /* Player */
               <Hand
                  key={index}
                  playerIndex={index}
                  hand={hand}
                  isGameOver={!!winners}
                  wasReset={wasReset}
                  finalHand={finalHands[index]}
                  isWinner={winners?.includes(index) || false}
                  onReplaceCards={handleReplaceCards}
                  onLockHand={handleLockHand}
               />
            ))}
         </div>
      </>
   );
}
