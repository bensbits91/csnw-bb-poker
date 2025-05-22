/**
 * GameHeader component.
 * Displays the main header for the poker game, including the title and a brief description.
 *
 * @returns {JSX.Element} The rendered GameHeader component.
 */
export function GameHeader() {
   return (
      <div>
         <h1
            aria-label="CSNW Poker by Ben"
            className="text-center text-3xl">
            CSNW Poker by Ben
         </h1>
      </div>
   );
}
