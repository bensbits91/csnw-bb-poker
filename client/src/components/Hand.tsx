import { useState } from 'react';
import Card from './Card';

type HandProps = {
   playerIndex: number;
   hand: string[];
   onReplaceCards: (playerIndex: number, cardIndices: number[]) => void;
};

export default function Hand({ playerIndex, hand, onReplaceCards }: HandProps) {
   const [selectedCards, setSelectedCards] = useState<number[]>([]);

   const toggleCardSelection = (index: number) => {
      setSelectedCards(prev =>
         prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
      );
   };

   const handleReplace = () => {
      onReplaceCards(playerIndex, selectedCards);
      setSelectedCards([]);
   };

   return (
      <div className='hand'>
         <h2>Player {playerIndex + 1}</h2>
         <div className='cards'>
            {hand.map((card, index) => (
               <Card
                  key={index}
                  card={card}
                  isSelected={selectedCards.includes(index)}
                  onClick={() => toggleCardSelection(index)}
               />
            ))}
         </div>
         <button onClick={handleReplace} disabled={selectedCards.length === 0}>
            Replace Selected Cards
         </button>
      </div>
   );
}
