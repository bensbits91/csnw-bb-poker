import { Heading } from '@/components/typography';

/**
 * GameHeader component.
 * Displays the main header for the poker game, including the title and a brief description.
 *
 * @returns {JSX.Element} The rendered GameHeader component.
 */
export function GameHeader() {
   return (
      <div>
         <Heading
            level={1}
            ariaLabel="CSNW Poker by Ben"
            className="text-center">
            CSNW Poker by Ben
         </Heading>
         <p className="text-center">
            Five-card, single-draw, no bets, wholesome fun
         </p>
      </div>
   );
}
