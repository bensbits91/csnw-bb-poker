/**
 * Props for the replaceLottieColors function.
 * @interface replaceLottieColorsProps
 * @property {Object} animationJson - The Lottie animation JSON object to modify.
 * @property {Array<{original: string, replacement: string}>} colorsToReplace - An array of objects specifying the colors to replace.
 * @property {string} colorsToReplace[].original - The original color to replace (in RGBA string format).
 * @property {string} colorsToReplace[].replacement - The replacement color (in RGBA string format).
 */
interface replaceLottieColorsProps {
   animationJson: unknown;
   // note: not using theme/condition because it causes re-renders. If time, resolve, else, clean up commments
   // condition: boolean; // true for dark mode, false for light mode
   colorsToReplace: Array<{
      original: string;
      replacement: string;
   }>;
}

/**
 * Replaces specific colors in a Lottie animation JSON object.
 * This function modifies the animation JSON by replacing specified colors with new ones.
 *
 * @param {replaceLottieColorsProps} props - The props for the replaceLottieColors function.
 * @param {Object} props.animationJson - The Lottie animation JSON object to modify.
 * @param {Array<{original: string, replacement: string}>} props.colorsToReplace - An array of objects specifying the colors to replace.
 * @returns {Object} The modified Lottie animation JSON object with the specified colors replaced.
 * @throws {TypeError} If the provided animationJson is not a valid object.
 */
export function replaceLottieColors({
   animationJson,
   // condition,
   colorsToReplace
}: replaceLottieColorsProps) {
   if (typeof animationJson !== 'object' || animationJson === null) {
      throw new TypeError('Invalid animationJson: must be a valid object');
   }

   // Convert the animation JSON to a string for color replacement
   let modifiedAnimationJson = JSON.stringify(animationJson);

   // Iterate over the array of colors to replace
   colorsToReplace.forEach(({ original, replacement }) => {
      const regex = new RegExp(original.replace(/[[\]]/g, '\\$&'), 'g'); // Create regex to find the original color

      // Replace the colors in the animation JSON
      modifiedAnimationJson = modifiedAnimationJson.replace(regex, replacement);
   });

   // Parse the modified JSON string back into an object
   return JSON.parse(modifiedAnimationJson);
}
