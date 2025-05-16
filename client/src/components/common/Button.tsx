import clsx from 'clsx';

interface ButtonProps {
   children: React.ReactNode;
   onClick: () => void;
   disabled?: boolean;
}

export function Button({ children, onClick, disabled = false }: ButtonProps) {
   return (
      <button
         onClick={onClick}
         disabled={disabled}
         className={clsx(
            !disabled && 'bg-teal-500 md:cursor-pointer md:hover:bg-teal-600',
            disabled && 'md:cursor-not-allowed bg-gray-600'
         )}>
         {children}
      </button>
   );
}
