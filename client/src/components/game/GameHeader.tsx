import { Heading } from '@/components/typography';

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
            5-card single-draw no-betting good-wholesome fun
         </p>
      </div>
   );
}
