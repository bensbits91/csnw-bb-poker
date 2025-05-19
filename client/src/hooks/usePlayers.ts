import { useState, useEffect } from 'react';

export function usePlayers() {
   const [playerNames, setPlayerNames] = useState<string[]>(() => {
      const storedNames = localStorage.getItem('playerNames');
      return storedNames
         ? JSON.parse(storedNames)
         : ['Player 1', 'Player 2', 'Player 3', 'Player 4'];
   });

   const [isEditing, setIsEditing] = useState<boolean[]>(() =>
      Array(playerNames.length).fill(false)
   );
   const [tempNames, setTempNames] = useState<string[]>(() => [...playerNames]);

   // Persist player names to local storage whenever they change
   useEffect(() => {
      localStorage.setItem('playerNames', JSON.stringify(playerNames));
   }, [playerNames]);

   const updatePlayerName = (index: number, newName: string) => {
      setPlayerNames(prevNames => {
         const updatedNames = [...prevNames];
         updatedNames[index] = newName;
         return updatedNames;
      });
   };

   const startEditing = (index: number) => {
      setIsEditing(prevEditing => {
         const updatedEditing = [...prevEditing];
         updatedEditing[index] = true;
         return updatedEditing;
      });
   };

   const cancelEditing = (index: number) => {
      setTempNames(prevTempNames => {
         const updatedTempNames = [...prevTempNames];
         updatedTempNames[index] = playerNames[index]; // Reset to original name
         return updatedTempNames;
      });
      setIsEditing(prevEditing => {
         const updatedEditing = [...prevEditing];
         updatedEditing[index] = false;
         return updatedEditing;
      });
   };

   const saveEditing = (index: number) => {
      if (tempNames[index].trim() !== '') {
         updatePlayerName(index, tempNames[index]); // Save the name
         setIsEditing(prevEditing => {
            const updatedEditing = [...prevEditing];
            updatedEditing[index] = false;
            return updatedEditing;
         });
      }
   };

   const setTempName = (index: number, newName: string) => {
      setTempNames(prevTempNames => {
         const updatedTempNames = [...prevTempNames];
         updatedTempNames[index] = newName;
         return updatedTempNames;
      });
   };

   return {
      playerNames,
      updatePlayerName,
      isEditing,
      tempNames,
      startEditing,
      cancelEditing,
      saveEditing,
      setTempName
   };
}
