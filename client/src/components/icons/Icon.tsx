import * as Icons from './index';

/**
 * Props for the Icon component.
 * @interface IconProps
 * @property {string} name - The name of the icon to render.
 * @property {number} [size=4] - The size of the icon, where the value is multiplied by 4 to determine the pixel size.
 */
interface IconProps {
   name: string;
   size?: number;
}
const FallbackIcon = ({ iconSize }: { iconSize: string }) => (
   <div
      data-testid="icon-fallback"
      style={{
         height: iconSize,
         width: iconSize
      }}
   />
);

/**
 * Icon component.
 * Dynamically renders an icon based on the provided name and size.
 * If the icon name is invalid, logs an error and renders nothing.
 *
 * @param {IconProps} props - The props for the Icon component.
 * @returns {JSX.Element | null} The rendered Icon component or null if the icon name is invalid.
 */
export default function Icon({ name, size = 4 }: IconProps) {
   const IconComponent = Icons[name as keyof typeof Icons];
   const iconSize = `${size * 4}px`;

   if (!name || typeof name !== 'string') {
      console.error('Icon component requires a valid "name" prop.');
      return <FallbackIcon iconSize={iconSize} />;
   }
   if (!IconComponent) {
      console.error(`Icon "${name}" does not exist.`);
      return <FallbackIcon iconSize={iconSize} />;
   }

   return (
      <div
         data-testid={`icon-${name}`}
         aria-label={`Icon: ${name}`}
         style={{ height: iconSize, width: iconSize }}>
         <IconComponent name={name} />
      </div>
   );
}
