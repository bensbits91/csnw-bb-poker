import { useCallback } from 'react';
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

   if (typeof onClick !== 'function') {
      console.error('Button component requires a valid onClick handler.');
      throw new Error('Button component requires a valid onClick handler.');
   }

   /**
    * Computes the `aria-label` for the button.
    * If `ariaLabel` is provided, it is used directly.
    * If the button has an `iconName` but no `children`, the `iconName` is used as the `aria-label`.
    * If neither `ariaLabel` nor `children` is provided, a warning is logged for accessibility.
    *
    * @constant {string | undefined} computedAriaLabel - The computed `aria-label` for the button.
    */
   const computedAriaLabel =
      ariaLabel || (iconName && !children ? iconName : undefined);
   if (!computedAriaLabel && !children) {
      console.warn(
         'Button component is missing an aria-label. Buttons without visible text should have an aria-label for accessibility.'
      );
   }

   /**
    * Handles the button click event.
    * Wraps the `onClick` handler in a `useCallback` hook to prevent unnecessary re-renders.
    *
    * @function handleClick
    * @returns {void}
    */
   const handleClick = useCallback(() => {
      if (onClick) onClick();
   }, [onClick]);

   /**
    * Determines the CSS class for the disabled state based on the current theme.
    */
   const disabledClass = isDarkMode
      ? 'disabled-button-dark'
      : 'disabled-button';

   return (
      <button
         type="button"
         onClick={handleClick}
         aria-label={computedAriaLabel}
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
