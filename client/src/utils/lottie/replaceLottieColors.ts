// note: not using theme/condition because it causes re-renders. If time, resolve, else, clean up commments

interface replaceLottieColorsProps {
   animationJson: unknown;
   // condition: boolean; // true for dark mode, false for light mode
   colorsToReplace: Array<{
      original: string;
      replacement: string;
   }>;
}

export function replaceLottieColors({
   animationJson,
   // condition,
   colorsToReplace
}: replaceLottieColorsProps) {
   if (typeof animationJson !== 'object' || animationJson === null) {
      throw new TypeError('Invalid animationJson: must be a valid object');
   }

   // Iterate over the array of colors to replace
   let modifiedAnimationJson = JSON.stringify(animationJson);

   colorsToReplace.forEach(({ original, replacement }) => {
      const regex = new RegExp(original.replace(/[[\]]/g, '\\$&'), 'g'); // Create regex to find the original color

      // Replace the colors in the animation JSON
      modifiedAnimationJson = modifiedAnimationJson.replace(regex, replacement);
   });

   return JSON.parse(modifiedAnimationJson);
}
