import { GameToolbar } from './GameToolbar';
import { Hand } from '../hand';
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
         <div className="grid gap-8 md:grid-cols-2">
            {players.map((hand, index) => (
               <Hand
                  key={index}
                  playerIndex={index}
                  hand={hand}
                  isGameOver={!!winners}
                  wasReset={wasReset}
                  finalHand={finalHands[index]} // Pass the final hand info
                  isWinner={winners?.includes(index) || false} // Check if this player is a winner
                  onReplaceCards={handleReplaceCards}
                  onLockHand={handleLockHand} // Pass the callback to Hand
               />
            ))}
         </div>
      </>
   );
}
