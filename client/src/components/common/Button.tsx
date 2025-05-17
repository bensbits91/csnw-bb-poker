import clsx from 'clsx';
import { Icon } from '@/components/icons';

interface ButtonProps {
   children: React.ReactNode;
   iconName?: string;
   onClick: () => void;
   disabled?: boolean;
}

export function Button({ children, iconName, onClick, disabled = false }: ButtonProps) {
   return (
      <button
         onClick={onClick}
         disabled={disabled}
         className={clsx(
            'flex items-center gap-2 px-4 py-2 rounded-md text-white',
            !disabled && 'bg-teal-500 md:cursor-pointer md:hover:bg-teal-600',
            disabled && 'md:cursor-not-allowed bg-gray-600'
         )}>
         {iconName && <Icon name={iconName} />}
         {children}
      </button>
   );
}
