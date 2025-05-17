import { useState, useEffect } from 'react';

interface UseHandProps {
   playerIndex: number;
   wasReset: boolean;
   onReplaceCards: (playerIndex: number, cardIndices: number[]) => void;
   onLockHand: (playerIndex: number) => void; // New prop to notify when a hand is locked
}

export const useHand = ({
   playerIndex,
   wasReset,
   onReplaceCards,
   onLockHand
}: UseHandProps) => {
   const [selectedCards, setSelectedCards] = useState<number[]>([]);
   const [isLocked, setIsLocked] = useState(false);
   const [hiddenCards, setHiddenCards] = useState<number[]>([]);

   const toggleCardSelection = (index: number) => {
      setSelectedCards(prev =>
         prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
      );
   };

   const handleLock = () => {
      setIsLocked(true);
      setSelectedCards([]);
      onLockHand(playerIndex); // Notify Game.tsx that this hand is locked
   };

   const handleReplace = () => {
      onReplaceCards(playerIndex, selectedCards);
      setSelectedCards([]);
      setHiddenCards(prev => [...prev, ...selectedCards]);
      handleLock();
   };

   const handleKeepAll = () => {
      setSelectedCards([]);
      handleLock();
   };

   const handleCardClick = (index: number) => {
      setIsLocked(false);
      toggleCardSelection(index);
   };

   useEffect(() => {
      if (wasReset) {
         setHiddenCards([]);
         setSelectedCards([]);
         setIsLocked(false);
      }
   }, [wasReset]);

   const isSelection = selectedCards.length !== 0;

   return {
      selectedCards,
      isLocked,
      hiddenCards,
      isSelection,
      handleCardClick,
      handleReplace,
      handleKeepAll,
      handleLock
   };
};
