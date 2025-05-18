import Lottie from 'lottie-react';
import { useRef, useEffect, useMemo } from 'react';
import type { LottieRefCurrentProps } from 'lottie-react';
import winnerAnimation from '@/assets/winner.json';
import { replaceLottieColors } from '@/utils/lottie';

export function WinnerAnimation() {
   const lottieRef = useRef<LottieRefCurrentProps>(null);

   useEffect(() => {
      if (lottieRef.current) {
         lottieRef.current.setSpeed(3);
      }
   }, []);

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
      return replaceLottieColors({
         animationJson: winnerAnimation,
         colorsToReplace
      });
   }, []);

   return (
      <Lottie
         lottieRef={lottieRef}
         animationData={modifiedAnimation}
         loop={false}
         autoplay={true}
         style={{ width: 250, height: 250 }}
      />
   );
}
