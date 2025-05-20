import { GameToolbar } from './GameToolbar';
import { Hand } from '@/components/hand';
import { ErrorBoundary } from '@/components/common';
import { useGame, usePlayers } from '@/hooks';

/**
 * Game component.
 * The main component for the poker game, responsible for managing the game state and rendering the game UI.
 * It includes the game toolbar, player hands, and game logic.
 *
 * This component uses the `useGame` hook to manage game-related state and actions,
 * and the `usePlayers` hook to manage player-related state and actions.
 *
 * @component
 * @returns {JSX.Element} The rendered Game component.
 */
export function Game() {
   const {
      hands, // The current hands dealt to players
      wasReset, // Whether the game was reset
      winners, // The winning player(s)
      finalHands, // The final ranked hands
      handleLockHand, // Function to lock a player's hand
      handleReplaceCards, // Function to replace cards in a player's hand
      handleDealClick, // Function to deal a new round of cards
      handleEndNowClick // Function to end the current game
   } = useGame();

   const { players, updatePlayerName } = usePlayers();

   if (!hands || !players) {
      console.error('useGame or usePlayers returned invalid data.');
      return <div>Error loading game data.</div>;
   }
   if (hands.length !== players.length) {
      console.error(
         `Mismatch between hands (${hands.length}) and players (${players.length}).`
      );
      throw new Error('Mismatch between hands and players.');
   }
   if (winners && finalHands && finalHands.length !== players.length) {
      console.error(
         `Mismatch between finalHands (${finalHands.length}) and players (${players.length}).`
      );
      throw new Error('Mismatch between finalHands and players.');
   }

   return (
      <>
         <ErrorBoundary fallback={<div>Error loading game toolbar.</div>}>
            <GameToolbar
               isGameOver={!!winners}
               onDealClick={handleDealClick}
               onEndClick={handleEndNowClick}
            />
         </ErrorBoundary>
         {/* Table */}
         <div className="grid gap-8 lg:grid-cols-2">
            <ErrorBoundary fallback={<div>Error loading player hands.</div>}>
               {hands.map((hand, index) => (
                  /* Player */
                  <Hand
                     key={players[index].id} // Unique key for each player
                     playerIndex={index} // Index of the player
                     playerName={players[index].name} // Name of the player
                     onUpdatePlayerName={updatePlayerName} // Function to update the player's name
                     hand={hand} // The player's current hand
                     isGameOver={!!winners} // Whether the game is over
                     wasReset={wasReset} // Whether the game was reset
                     finalHand={finalHands[index]} // The player's final ranked hand
                     isWinner={winners?.includes(index) || false} // Whether the player is a winner
                     onReplaceCards={handleReplaceCards} // Function to replace cards in the player's hand
                     onLockHand={handleLockHand} // Function to lock the player's hand
                  />
               ))}
            </ErrorBoundary>
         </div>
      </>
   );
}
