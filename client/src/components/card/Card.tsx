import clsx from 'clsx';
import { useTheme } from '@/hooks/';
import { cardUnicodeMap } from '@/constants/card';

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
   const { theme } = useTheme();
   const isDarkMode = theme === 'dark';
   const cardSuit = card[card.length - 1]; // Get the last character of the card string
   const isRed = (cardSuit === '♥' || cardSuit === '♦') && !isHidden;
   const redClass = isDarkMode ? 'text-red-300' : 'text-red-400';
   const isNotRed = !isRed && !isHidden;
   const notRedClass = isDarkMode ? 'text-gray-300' : 'text-gray-700';
   const hiddenClass = isDarkMode ? 'text-gray-500' : 'text-gray-400';

   return (
      <div
         className={clsx(
            'relative h-[76px] w-[56px] md:h-[101px] md:w-[74px]', // to fit unicode characters neatly
            'text-8xl md:text-9xl transition-transform duration-300',
            isDarkMode ? 'bg-elevated-dark-1 shadow-dark-1' : 'bg-elevated-1 shadow-1',
            isHidden && hiddenClass,
            isRed && redClass,
            isNotRed && notRedClass,
            isSelected && '-translate-y-4 scale-110'
         )}>
         <button
            disabled={disabled}
            type='button'
            className={clsx(
               'absolute leading-[0.8] bottom-[8px] right-[-6px] md:bottom-[12px] md:right-[-8px]', // to fit unicode characters neatly
               disabled ? 'cursor-not-allowed' : 'cursor-pointer'
            )}
            onClick={onClick}>
            {isHidden ? cardUnicodeMap['Back'] : cardUnicodeMap[card] || card}
         </button>
      </div>
   );
}
