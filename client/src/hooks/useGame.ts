import { useEffect, useState } from 'react';
import {
   initializeDeck,
   shuffleAndDealCards,
   replaceCards,
   determineWinner
} from '@/utils/game';

export const useGame = () => {
   const [deck, setDeck] = useState(() => initializeDeck());
   const [wasReset, setWasReset] = useState(false); // Track if the game was reset

   // todo: this fixes the issue of the deck be reinitialized when we replace cards
   // but feels messy/hacky so let's clean it up
   const [players, setPlayers] = useState(() => {
      const { dealtPlayers, updatedDeck } = shuffleAndDealCards(deck, 4); // Deal cards to 4 players
      setDeck(updatedDeck); // Update the deck after dealing cards
      return dealtPlayers;
   });

   const [lockedHands, setLockedHands] = useState<number[]>([]); // Track locked hands

   const [winners, setWinners] = useState<number[] | null>(null);
   const [finalHands, setFinalHands] = useState<
      {
         name: string;
         rank: number;
         tiebreaker: number[];
      }[]
   >([]);

   const handleLockHand = (playerIndex: number) => {
      setLockedHands(prev => {
         const updatedLockedHands = [...prev, playerIndex];
         return updatedLockedHands;
      });
   };

   useEffect(() => {
      if (lockedHands.length === players.length) {
         const { winners, rankedHands } = determineWinner(players);
         console.log('bb ~ Game.tsx:40 ~ useEffect ~ winners:', winners);
         console.log('bb ~ Game.tsx:39 ~ useEffect ~ rankedHands:', rankedHands);
         setWinners(winners);
         setFinalHands(rankedHands);
      }
   }, [lockedHands, players.length, players]);

   const handleReplaceCards = (playerIndex: number, cardIndices: number[]) => {
      // Replace cards and update the deck and players
      const { updatedPlayers, updatedDeck } = replaceCards(
         players,
         deck,
         playerIndex,
         cardIndices
      );
      setPlayers(updatedPlayers); // Update players' hands
      setDeck(updatedDeck); // Update the deck
   };

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

   useEffect(() => {
      if (wasReset) {
         setWasReset(false); // Reset the flag after informing Hand components
      }
   }, [wasReset]);

   const handleEndNowClick = () => {
      setLockedHands([1, 2, 3, 4]);
   };

   return {
      players,
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
