import { cardUnicodeMap } from '@/constants/card';
import clsx from 'clsx';

type CardProps = {
   card: string;
   isSelected: boolean;
   isHidden?: boolean;
   disabled?: boolean;
   onClick: () => void;
};

export function Card({
   card,
   isSelected,
   isHidden = false,
   disabled = false,
   onClick
}: CardProps) {
   const cardColor = card[card.length - 1]; // Get the last character of the card string
   const isRed = cardColor === '♥' || cardColor === '♦';
   return (
      <button
         disabled={disabled}
         type='button'
         className={clsx(
            'text-9xl transition-transform duration-300',
            isHidden ? 'text-gray-500' : isRed ? 'text-red-300' : 'text-white',
            isSelected ? '-translate-y-4 scale-110' : '',
            disabled ? 'cursor-not-allowed' : 'cursor-pointer'
         )}
         onClick={onClick}>
         {isHidden ? cardUnicodeMap['Back'] : cardUnicodeMap[card] || card}
      </button>
   );
}
