import { useState, useEffect } from 'react';

/**
 * Props for the useHand hook.
 * @typedef {Object} UseHandProps
 * @property {number} playerIndex - The index of the player.
 * @property {boolean} wasReset - Whether the game was reset.
 * @property {(playerIndex: number, cardIndices: number[]) => void} onReplaceCards - Callback to replace cards in the player's hand.
 * @property {(playerIndex: number) => void} onLockHand - Callback to notify when a player's hand is locked.
 */
interface UseHandProps {
   playerIndex: number;
   wasReset: boolean;
   onReplaceCards: (playerIndex: number, cardIndices: number[]) => void;
   onLockHand: (playerIndex: number) => void; // New prop to notify when a hand is locked
}

/**
 * useHand hook.
 * Manages the state and logic for a single player's hand, including card selection, locking, and replacement.
 *
 * @param {UseHandProps} props - The props for the useHand hook.
 * @returns {Object} The state and functions for managing the player's hand.
 * @property {number[]} selectedCards - The indices of the currently selected cards.
 * @property {boolean} isLocked - Whether the player's hand is locked.
 * @property {number[]} flippedCards - The indices of the cards that have been flipped.
 * @property {boolean} isSelection - Whether any cards are currently selected.
 * @property {(index: number) => void} handleCardClick - Handles the selection or deselection of a card.
 * @property {() => void} handleReplace - Replaces the selected cards in the player's hand.
 * @property {() => void} handleKeepAll - Locks the player's hand without replacing any cards.
 * @property {() => void} handleLock - Locks the player's hand and clears the selection.
 */
export const useHand = ({
   playerIndex,
   wasReset,
   onReplaceCards,
   onLockHand
}: UseHandProps) => {
   /**
    * State for the indices of the currently selected cards.
    */
   const [selectedCards, setSelectedCards] = useState<number[]>([]);

   /**
    * State to track whether the player's hand is locked.
    */
   const [isLocked, setIsLocked] = useState(false);

   /**
    * State for the indices of the cards that have been flipped.
    */
   const [flippedCards, setFlippedCards] = useState<number[]>([]);

   /**
    * Toggles the selection state of a card.
    *
    * @param {number} index - The index of the card to toggle.
    */
   const toggleCardSelection = (index: number) => {
      setSelectedCards(prev =>
         prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
      );
   };

   /**
    * Locks the player's hand and clears the selection.
    * Notifies the parent component that the hand is locked.
    */
   const handleLock = () => {
      setIsLocked(true);
      setSelectedCards([]);
      onLockHand(playerIndex); // Notify Game.tsx that this hand is locked
   };

   /**
    * Replaces the selected cards in the player's hand.
    * Flips the replaced cards and locks the hand.
    */
   const handleReplace = () => {
      onReplaceCards(playerIndex, selectedCards);
      setSelectedCards([]);
      setFlippedCards(prev => [...prev, ...selectedCards]);
      handleLock();
   };

   /**
    * Locks the player's hand without replacing any cards.
    */
   const handleKeepAll = () => {
      setSelectedCards([]);
      handleLock();
   };

   /**
    * Handles the selection or deselection of a card.
    * Unlocks the hand if it was previously locked.
    *
    * @param {number} index - The index of the card to select or deselect.
    */
   const handleCardClick = (index: number) => {
      setIsLocked(false);
      toggleCardSelection(index);
   };

   /**
    * Effect to reset the hand state when the game is reset.
    */
   useEffect(() => {
      if (wasReset) {
         setFlippedCards([]);
         setSelectedCards([]);
         setIsLocked(false);
      }
   }, [wasReset]);

   /**
    * Whether any cards are currently selected.
    */
   const isSelection = selectedCards.length !== 0;

   return {
      selectedCards,
      isLocked,
      flippedCards,
      isSelection,
      handleCardClick,
      handleReplace,
      handleKeepAll,
      handleLock
   };
};
