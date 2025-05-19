
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Install uuid: npm install uuid

interface Player {
   id: string;
   name: string;
}

export function usePlayers() {
   const [players, setPlayers] = useState<Player[]>(() => {
      const storedPlayers = localStorage.getItem('players');
      if (storedPlayers) {
         return JSON.parse(storedPlayers);
      }
      // Initialize with default players if none are stored
      return [
         { id: uuidv4(), name: 'Player 1' },
         { id: uuidv4(), name: 'Player 2' },
         { id: uuidv4(), name: 'Player 3' },
         { id: uuidv4(), name: 'Player 4' }
      ];
   });

   const [isEditing, setIsEditing] = useState<boolean[]>(() =>
      Array(players.length).fill(false)
   );
   const [tempNames, setTempNames] = useState<string[]>(() =>
      players.map(player => player.name)
   );

   // Persist players to local storage whenever they change
   useEffect(() => {
      localStorage.setItem('players', JSON.stringify(players));
   }, [players]);

   const updatePlayerName = (index: number, newName: string) => {
      setPlayers(prevPlayers => {
         const updatedPlayers = [...prevPlayers];
         updatedPlayers[index] = { ...updatedPlayers[index], name: newName }; // Update name, keep id
         return updatedPlayers;
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
         updatedTempNames[index] = players[index].name; // Reset to original name
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
      players, // Array of { id, name }
      updatePlayerName,
      isEditing,
      tempNames,
      startEditing,
      cancelEditing,
      saveEditing,
      setTempName
   };
}
