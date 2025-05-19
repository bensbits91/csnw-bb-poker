import type { JSX } from 'react';
import clsx from 'clsx';

interface HeadingProps {
   children: React.ReactNode;
   className?: string;
   level?: 1 | 2 | 3 | 4 | 5 | 6;
   appearance?: 1 | 2 | 3 | 4 | 5 | 6 | undefined;
   weight?: 'normal' | 'bold' | 'light';
   top?: 'sm' | 'md' | 'lg' | 'no';
   bottom?: 'sm' | 'md' | 'lg' | 'no';
   id?: string;
   ariaLabel?: string;
}

export function Heading({
   children,
   className,
   appearance, // styling, will default to level below
   level = 1, // symantic HTML tag, default is h1
   weight = 'normal',
   top = 'no',
   bottom = 'no',
   id,
   ariaLabel
}: HeadingProps) {
   const Tag = `h${level}` as keyof JSX.IntrinsicElements;

   const as = appearance || level; // styling, default to level

   return (
      <Tag
         id={id}
         aria-label={ariaLabel}
         className={clsx(
            className,
            top === 'no' && 'mt-0',
            top === 'sm' && 'mt-2',
            top === 'md' && 'mt-4',
            top === 'lg' && 'mt-8',
            bottom === 'no' && 'mb-0',
            bottom === 'sm' && 'mb-2',
            bottom === 'md' && 'mb-4',
            bottom === 'lg' && 'mb-8',
            `font-${weight}`,
            as === 1 && 'text-4xl/[50px] tracking-tight md:text-5xl/[50px]',
            as === 2 && 'text-3xl md:text-3xl',
            as === 3 && 'text-2xl/7 md:text-2xl/9',
            as === 4 && 'text-2xl',
            as === 5 && 'text-lg',
            as === 6 && 'text-base'
         )}>
         {children}
      </Tag>
   );
}
