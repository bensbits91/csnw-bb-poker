import clsx from 'clsx';
import { Icon } from '@/components/icons';
import { useTheme } from '@/hooks/';

interface ButtonProps {
   children: React.ReactNode;
   iconName?: string;
   onClick: () => void;
   disabled?: boolean;
}

export function Button({ children, iconName, onClick, disabled = false }: ButtonProps) {
   const { theme } = useTheme();
   const isDarkMode = theme === 'dark';

   const disabledClass = isDarkMode ? 'disabled-button-dark' : 'disabled-button';

   return (
      <button
         onClick={onClick}
         disabled={disabled}
         className={clsx(
            'flex items-center gap-2 px-4 py-2 rounded-md',
            disabled
               ? `md:cursor-not-allowed ${disabledClass}`
               : 'md:cursor-pointer hover-bright',
            isDarkMode ? 'button-dark' : 'button'
         )}>
         {iconName && <Icon name={iconName} />}
         {children}
      </button>
   );
}
