import { useEffect, useState } from 'react';
import {
   initializeDeck,
   shuffleAndDealCards,
   replaceCards,
   determineWinner
} from '@/utils/game';

/**
 * useGame hook.
 * Manages the state and logic for the poker game, including deck initialization, dealing cards,
 * replacing cards, locking hands, and determining the winner.
 *
 * @returns {Object} The state and functions for managing the game.
 * @property {string[]} deck - The current deck of cards.
 * @property {boolean} wasReset - Whether the game was reset.
 * @property {string[][]} hands - The current hands dealt to players.
 * @property {number[] | null} winners - The indices of the winning players, or null if no winner is determined.
 * @property {Object[]} finalHands - The final ranked hands of the players.
 * @property {string} finalHands[].name - The name of the hand (e.g., "Full House").
 * @property {number} finalHands[].rank - The rank of the hand.
 * @property {number[]} finalHands[].tiebreaker - The tiebreaker values for the hand.
 * @property {(playerIndex: number) => void} handleLockHand - Locks a player's hand.
 * @property {(playerIndex: number, cardIndices: number[]) => void} handleReplaceCards - Replaces cards in a player's hand.
 * @property {() => void} handleDealClick - Deals a new round of cards.
 * @property {() => void} handleEndNowClick - Ends the game immediately by locking all hands.
 */
export const useGame = () => {
   /**
    * State for the current deck of cards.
    * Initializes the deck using the `initializeDeck` utility function.
    */
   const [deck, setDeck] = useState(() => initializeDeck());

   /**
    * State to track if the game was reset.
    */
   const [wasReset, setWasReset] = useState(false); // Track if the game was reset

   /**
    * State for the players' hands.
    * Initializes by dealing cards to 4 players and updating the deck.
    */
   const [hands, setPlayers] = useState(() => {
      const { dealtPlayers, updatedDeck } = shuffleAndDealCards(deck, 4); // Deal cards to 4 players
      setDeck(updatedDeck); // Update the deck after dealing cards
      return dealtPlayers;
   });

   /**
    * State to track locked hands.
    * Stores the indices of players whose hands are locked.
    */
   const [lockedHands, setLockedHands] = useState<number[]>([]); // Track locked hands

   /**
    * State to track the winning players.
    * Stores the indices of the winning players or null if no winner is determined.
    */
   const [winners, setWinners] = useState<number[] | null>(null);

   /**
    * State for the final ranked hands of the players.
    */
   const [finalHands, setFinalHands] = useState<
      {
         name: string;
         rank: number;
         tiebreaker: number[];
      }[]
   >([]);

   /**
    * Locks a player's hand.
    * Adds the player's index to the `lockedHands` state.
    *
    * @param {number} playerIndex - The index of the player whose hand is being locked.
    */
   const handleLockHand = (playerIndex: number) => {
      setLockedHands(prev => {
         const updatedLockedHands = [...prev, playerIndex];
         return updatedLockedHands;
      });
   };

   /**
    * Effect to determine the winner when all hands are locked.
    */
   useEffect(() => {
      if (lockedHands.length === hands.length) {
         const { winners, rankedHands } = determineWinner(hands);
         setWinners(winners);
         setFinalHands(rankedHands);
      }
   }, [lockedHands, hands.length, hands]);

   /**
    * Replaces cards in a player's hand.
    * Updates the hands and deck state after replacing cards.
    *
    * @param {number} playerIndex - The index of the player whose cards are being replaced.
    * @param {number[]} cardIndices - The indices of the cards to replace.
    */
   const handleReplaceCards = (playerIndex: number, cardIndices: number[]) => {
      // Replace cards and update the deck and players
      const { updatedPlayers, updatedDeck } = replaceCards(
         hands,
         deck,
         playerIndex,
         cardIndices
      );
      setPlayers(updatedPlayers); // Update players' hands
      setDeck(updatedDeck); // Update the deck
   };

   /**
    * Deals a new round of cards.
    * Resets the game state and deals cards to all players.
    */
   const handleDealClick = () => {
      const newDeck = initializeDeck();
      const { dealtPlayers, updatedDeck } = shuffleAndDealCards(newDeck, 4); // Deal cards to 4 players
      setDeck(updatedDeck); // Update the deck after dealing cards
      setPlayers(dealtPlayers); // Update players' hands
      setLockedHands([]); // Reset locked hands
      setWinners(null); // Reset winners
      setFinalHands([]); // Reset final hands
      setWasReset(true); // Set the reset flag to inform Hand components
   };

   /**
    * Effect to reset the `wasReset` flag after informing components.
    */
   useEffect(() => {
      if (wasReset) {
         setWasReset(false); // Reset the flag after informing Hand components
      }
   }, [wasReset]);

   /**
    * Ends the game immediately by locking all hands and determining the winner.
    */
   const handleEndNowClick = () => {
      setLockedHands([1, 2, 3, 4]);
   };

   return {
      hands,
      deck,
      wasReset,
      winners,
      finalHands,
      handleLockHand,
      handleReplaceCards,
      handleDealClick,
      handleEndNowClick
   };
};
