import clsx from 'clsx';
import { useTheme } from '@/hooks/';
import { cardUnicodeMap } from '@/constants/card';

/**
 * Props for the Card component.
 * @interface {Object} CardProps
 * @property {string} card - The card string (e.g., "10♥", "A♠").
 * @property {boolean} isSelected - Whether the card is selected.
 * @property {boolean} [isFlipped=false] - Whether the card is flipped (face down).
 * @property {boolean} [disabled=false] - Whether the card is disabled.
 * @property {() => void} onClick - Callback function triggered when the card is clicked.
 */
interface CardProps {
   card: string;
   isSelected: boolean;
   isFlipped?: boolean;
   disabled?: boolean;
   onClick: () => void;
}

/**
 * Card component for displaying a playing card.
 * Handles styling based on the card's suit, selection state, and theme.
 *
 * @param {CardProps} props - The props for the Card component.
 * @returns {JSX.Element} The rendered Card component.
 */
export function Card({
   card,
   isSelected,
   isFlipped = false,
   disabled = false,
   onClick
}: CardProps) {
   const { theme } = useTheme();
   const isDarkMode = theme === 'dark';

   if (!card) {
      console.error('Card component is missing a valid card.');
      throw new Error('Card component is missing a valid card.');
   }
   if (typeof onClick !== 'function') {
      console.error('Card component requires a valid onClick handler.');
      throw new Error('Card component requires a valid onClick handler.');
   }

   // Get the card display from the cardUnicodeMap
   const cardDisplay = cardUnicodeMap[card];

   // Extract the suit from the card string (last character)
   const suit = card[card.length - 1];

   // Determine if the card is red (hearts or diamonds) and not flipped
   const isRed = (suit === '♥' || suit === '♦') && !isFlipped;
   const isNotRed = !isRed && !isFlipped;

   // Define classes for red cards, non-red cards, and flipped cards
   const redClass = isDarkMode
      ? 'text-csnw-red-light-50'
      : 'text-csnw-red-light-30';
   const notRedClass = isDarkMode ? 'text-gray-300' : 'text-gray-700';
   const flippedClass = isDarkMode ? 'text-gray-500' : 'text-gray-400';

   return (
      <div
         className={clsx(
            'text-8xl transition-transform duration-300 md:text-9xl',
            isDarkMode
               ? 'bg-csnw-gray-dark-50 shadow-lg shadow-black'
               : 'bg-white shadow-lg',
            isFlipped && flippedClass,
            isRed && redClass,
            isNotRed && notRedClass,
            isSelected && '-translate-y-4 scale-110',
            // to fit unicode characters neatly
            'relative h-[76px] w-[56px] md:h-[101px] md:w-[74px]'
         )}>
         <button
            disabled={disabled}
            type="button"
            aria-label={isFlipped ? 'Flipped card' : card}
            onClick={onClick}
            className={clsx(
               'wcag-focus',
               disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
               // to fit unicode characters neatly
               'absolute right-[-6px] bottom-[8px] leading-[0.8] md:right-[-8px] md:bottom-[12px]'
            )}>
            {isFlipped ? cardUnicodeMap['Back'] : cardDisplay || card}
         </button>
      </div>
   );
}
