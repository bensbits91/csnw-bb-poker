import { useRef, useEffect, useMemo } from 'react';
import Lottie from 'lottie-react';
import type { LottieRefCurrentProps } from 'lottie-react';
import winnerAnimation from '@/assets/winner.json';
import { replaceLottieColors } from '@/utils/lottie';

/**
 * WinnerAnimation component.
 * Displays a Lottie animation for the winner with customized colors and playback speed.
 * The animation can be replayed by clicking on it.
 *
 * @returns {JSX.Element} The rendered WinnerAnimation component.
 */
export function WinnerAnimation() {
   const lottieRef = useRef<LottieRefCurrentProps>(null);

   /**
    * Sets the playback speed of the Lottie animation to 3x when the component mounts.
    */
   useEffect(() => {
      if (lottieRef.current) {
         lottieRef.current.setSpeed(3);
      }
   }, []);

   /**
    * Memoized Lottie animation data with replaced colors.
    * Replaces specific colors in the animation JSON with custom colors.
    */
   const modifiedAnimation = useMemo(() => {
      const colorsToReplace = [
         {
            original: '0.964705942191,0.219607858097,0.20000001496,1',
            replacement: '0.152941176471,0.866666666667,0.866666666667,1'
         },
         {
            original: '0.917647118662,0.149019607843,0.137254901961,1',
            replacement: '0.137254901961,0.749019607843,0.749019607843,1'
         },
         {
            original: '0.968627510819,0.223529426724,0.203921583587,1',
            replacement: '0.149019607843,0.780392156863,0.780392156863,1'
         },
         {
            original: '0.776470648074,0.117647066303,0.066666666667,1',
            replacement: '0.117647058824,0.639215686275,0.639215686275,1'
         },
         {
            original: '0.741176470588,0.109803929048,0.054901964524,1',
            replacement: '0.105882352941,0.560784313725,0.560784313725,1'
         }
      ];
      try {
         return replaceLottieColors({
            animationJson: winnerAnimation,
            colorsToReplace
         });
      } catch (error) {
         console.error('Error replacing Lottie colors:', error);
         return winnerAnimation; // Fallback to the original animation
      }
   }, []);

   /**
    * Handles the click event to replay the animation.
    * Resets the animation to the beginning and plays it at 3x speed.
    */
   const handleReplay = () => {
      if (lottieRef.current) {
         try {
            lottieRef.current.setSpeed(3);
            lottieRef.current.goToAndPlay(0, true);
         } catch (error) {
            console.error('Error replaying the animation:', error);
         }
      } else {
         console.warn('Lottie reference is not available.');
      }
   };

   return (
      <div onClick={handleReplay} aria-label="Play winner animation">
         <Lottie
            lottieRef={lottieRef}
            animationData={modifiedAnimation}
            loop={false}
            autoplay={true}
            style={{ width: 250, height: 250, cursor: 'pointer' }}
            aria-label="Winner receiving chips animation"
         />
      </div>
   );
}
