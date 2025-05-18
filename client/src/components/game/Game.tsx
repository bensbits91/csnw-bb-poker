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
      <div className='flex flex-col gap-8'>
         <div>
            <h1 className='text-center text-2xl'>CSNW Poker by Ben</h1>
            <h2 className='text-center text-xl'>
               5-card single-draw no-betting good-wholesome fun
            </h2>
         </div>
         <GameToolbar
            isGameOver={!!winners}
            onDealClick={handleDealClick}
            onEndClick={handleEndNowClick}
         />
         <div className='players grid md:grid-cols-2 gap-8'>
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
      </div>
   );
}
