import { replaceLottieColors } from '../replaceLottieColors';

describe('replaceLottieColors', () => {
   const mockAnimationJson = {
      layers: [
         {
            shapes: [
               {
                  it: [
                     {
                        c: {
                           k: ['0.964705942191,0.219607858097,0.20000001496,1']
                        }
                     },
                     {
                        c: {
                           k: ['0.776470648074,0.117647066303,0.066666666667,1']
                        }
                     }
                  ]
               }
            ]
         }
      ]
   };

   it('replaces specified colors in the animation JSON', () => {
      const colorsToReplace = [
         {
            original: '0.964705942191,0.219607858097,0.20000001496,1',
            replacement: '0.152941176471,0.866666666667,0.866666666667,1'
         }
      ];

      const result = replaceLottieColors({
         animationJson: mockAnimationJson,
         colorsToReplace
      });

      expect(result.layers[0].shapes[0].it[0].c.k[0]).toBe(
         '0.152941176471,0.866666666667,0.866666666667,1'
      );
   });

   it('does not modify the JSON if no colors match', () => {
      const colorsToReplace = [
         {
            original: 'nonexistent-color',
            replacement: '0.152941176471,0.866666666667,0.866666666667,1'
         }
      ];

      const result = replaceLottieColors({
         animationJson: mockAnimationJson,
         colorsToReplace
      });

      expect(result).toEqual(mockAnimationJson);
   });

   it('replaces multiple occurrences of the same color', () => {
      const colorsToReplace = [
         {
            original: '0.776470648074,0.117647066303,0.066666666667,1',
            replacement: '0.117647058824,0.639215686275,0.639215686275,1'
         }
      ];

      const result = replaceLottieColors({
         animationJson: mockAnimationJson,
         colorsToReplace
      });

      expect(result.layers[0].shapes[0].it[1].c.k[0]).toBe(
         '0.117647058824,0.639215686275,0.639215686275,1'
      );
   });

   it('returns the same JSON if colorsToReplace is empty', () => {
      const result = replaceLottieColors({
         animationJson: mockAnimationJson,
         colorsToReplace: []
      });

      expect(result).toEqual(mockAnimationJson);
   });

   it('throws an error if the input JSON is invalid', () => {
      const invalidJson = null; // Invalid input (not a valid object)

      expect(() =>
         replaceLottieColors({
            animationJson: invalidJson,
            colorsToReplace: []
         })
      ).toThrow(TypeError); // Expect a TypeError because null is not a valid object
   });
});
