import * as Icons from './index';

interface IconProps {
   name: string;
   size?: number;
}

export default function Icon({ name, size = 4 }: IconProps) {
   const IconComponent = Icons[name as keyof typeof Icons];

   const iconSize = `${size * 4}px`; // Convert to pixels

   if (!IconComponent) {
      console.error(`Icon "${name}" does not exist.`);
      return null; // Return null if the icon name is invalid
   }

   return (
      <div style={{ height: iconSize, width: iconSize }}>
         <IconComponent name={name} />
      </div>
   );
}
