import clsx from 'clsx';
import { useTheme } from '@/hooks/';
import { cardUnicodeMap } from '@/constants/card';

type CardProps = {
   card: string;
   isSelected: boolean;
   isFlipped?: boolean;
   disabled?: boolean;
   onClick: () => void;
};

export function Card({
   card,
   isSelected,
   isFlipped = false,
   disabled = false,
   onClick
}: CardProps) {
   const { theme } = useTheme();
   const isDarkMode = theme === 'dark';
   const suit = card[card.length - 1]; // Get the suit, the last character of the card string
   const isRed = (suit === '♥' || suit === '♦') && !isFlipped;
   const redClass = isDarkMode ? 'text-red-300' : 'text-red-400';
   const isNotRed = !isRed && !isFlipped;
   const notRedClass = isDarkMode ? 'text-gray-300' : 'text-gray-700';
   const flippedClass = isDarkMode ? 'text-gray-500' : 'text-gray-400';

   return (
      <div
         className={clsx(
            'relative h-[76px] w-[56px] md:h-[101px] md:w-[74px]', // to fit unicode characters neatly
            'text-8xl transition-transform duration-300 md:text-9xl',
            isDarkMode
               ? 'bg-elevated-dark-1 shadow-dark-1'
               : 'bg-elevated-1 shadow-1',
            isFlipped && flippedClass,
            isRed && redClass,
            isNotRed && notRedClass,
            isSelected && '-translate-y-4 scale-110'
         )}>
         <button
            disabled={disabled}
            type="button"
            aria-label={isFlipped ? 'Flipped card' : card}
            onClick={onClick}
            className={clsx(
               'wcag-focus',
               'absolute right-[-6px] bottom-[8px] leading-[0.8] md:right-[-8px] md:bottom-[12px]', // to fit unicode characters neatly
               disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
            )}>
            {isFlipped ? cardUnicodeMap['Back'] : cardUnicodeMap[card] || card}
         </button>
      </div>
   );
}
