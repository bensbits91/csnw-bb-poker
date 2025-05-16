import { unicodeMap } from '../utils/card/unicodeMap';

type CardProps = {
   card: string;
   isSelected: boolean;
   onClick: () => void;
};

export default function Card({ card, isSelected, onClick }: CardProps) {
   return (
      <div className={`card ${isSelected ? 'selected' : ''}`} onClick={onClick}>
         {unicodeMap[card] || card}
      </div>
   );
}
