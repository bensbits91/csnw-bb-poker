import { Hand } from '@/components/hand';
import { GameToolbar } from './GameToolbar';
import { useGame, usePlayers } from '@/hooks';

export function Game() {
   const {
      hands,
      wasReset,
      winners,
      finalHands,
      handleLockHand,
      handleReplaceCards,
      handleDealClick,
      handleEndNowClick
   } = useGame();

   const { players, updatePlayerName } = usePlayers();

   return (
      <>
         <GameToolbar
            isGameOver={!!winners}
            onDealClick={handleDealClick}
            onEndClick={handleEndNowClick}
         />
         {/* Table */}
         <div className="grid gap-8 md:grid-cols-2">
            {hands.map((hand, index) => (
               /* Player */
               <Hand
                  key={players[index].id}
                  playerIndex={index}
                  playerName={players[index].name}
                  onUpdatePlayerName={updatePlayerName}
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
