import clsx from 'clsx';
import { Icon } from '@/components/icons';
import { useTheme } from '@/hooks/';

interface ButtonProps {
   children: React.ReactNode;
   iconName?: string;
   ariaLabel?: string;
   disabled?: boolean;
   onClick: () => void;
}

export function Button({
   children,
   iconName,
   onClick,
   ariaLabel,
   disabled = false
}: ButtonProps) {
   const { theme } = useTheme();
   const isDarkMode = theme === 'dark';

   const disabledClass = isDarkMode
      ? 'disabled-button-dark'
      : 'disabled-button';

   return (
      <button
         onClick={onClick}
         aria-label={ariaLabel}
         disabled={disabled}
         className={clsx(
            'flex items-center gap-2 rounded-md px-4 py-2 wcag-focus',
            disabled
               ? `md:cursor-not-allowed ${disabledClass}`
               : 'hover-bright md:cursor-pointer',
            isDarkMode ? 'button-dark' : 'button'
         )}>
         {iconName && <Icon name={iconName} />}
         {children}
      </button>
   );
}
