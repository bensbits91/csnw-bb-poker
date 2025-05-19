import clsx from 'clsx';
import { Icon } from '@/components/icons';
import { useTheme } from '@/hooks/';

/**
 * Props for the Button component.
 * @interface ButtonProps
 * @property {React.ReactNode} children - The content to display inside the button.
 * @property {string} [iconName] - The name of the icon to display inside the button.
 * @property {string} [ariaLabel] - The accessible label for the button.
 * @property {boolean} [disabled=false] - Whether the button is disabled.
 * @property {() => void} onClick - Callback function triggered when the button is clicked.
 */
interface ButtonProps {
   children: React.ReactNode;
   iconName?: string;
   ariaLabel?: string;
   disabled?: boolean;
   onClick: () => void;
}

/**
 * Button component.
 * A reusable button component with optional icon support, accessibility features, and theme-based styling.
 *
 * @param {ButtonProps} props - The props for the Button component.
 * @returns {JSX.Element} The rendered Button component.
 */
export function Button({
   children,
   iconName,
   onClick,
   ariaLabel,
   disabled = false
}: ButtonProps) {
   const { theme } = useTheme();
   const isDarkMode = theme === 'dark';

   /**
    * Determines the CSS class for the disabled state based on the current theme.
    */
   const disabledClass = isDarkMode
      ? 'disabled-button-dark'
      : 'disabled-button';

   return (
      <button
         type="button"
         onClick={onClick}
         aria-label={ariaLabel}
         disabled={disabled}
         className={clsx(
            'wcag-focus flex items-center gap-2 rounded-md px-4 py-2',
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
