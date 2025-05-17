import { cardUnicodeMap } from '@/constants/card';
import clsx from 'clsx';

type CardProps = {
   card: string;
   isSelected: boolean;
   onClick: () => void;
   disabled?: boolean;
};

export function Card({ card, isSelected, onClick, disabled = false }: CardProps) {
   const cardColor = card[card.length - 1]; // Get the last character of the card string
   const isRed = cardColor === '♥' || cardColor === '♦';
   return (
      <button
         disabled={disabled}
         type='button'
         className={clsx(
            'text-9xl transition-transform duration-300',
            isRed ? 'text-red-300' : 'text-white',
            isSelected ? '-translate-y-4 scale-110' : '',
            disabled ? 'cursor-not-allowed' : 'cursor-pointer'
         )}
         onClick={onClick}>
         {cardUnicodeMap[card] || card}
      </button>
   );
}
