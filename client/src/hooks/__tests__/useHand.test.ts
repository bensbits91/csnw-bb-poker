import { renderHook, act } from '@testing-library/react';
import { useHand } from '../useHand';

describe('useHand Hook', () => {
   const mockOnReplaceCards = jest.fn();
   const mockOnLockHand = jest.fn();

   it('handles card selection and replacement', () => {
      const { result } = renderHook(() =>
         useHand({
            playerIndex: 0,
            wasReset: false,
            onReplaceCards: mockOnReplaceCards,
            onLockHand: mockOnLockHand
         })
      );

      // Select a card
      act(() => {
         result.current.handleCardClick(1);
      });
      expect(result.current.selectedCards).toEqual([1]);

      // Replace selected cards
      act(() => {
         result.current.handleReplace();
      });
      expect(mockOnReplaceCards).toHaveBeenCalledWith(0, [1]);
      expect(result.current.selectedCards).toEqual([]);
      expect(result.current.isLocked).toBe(true);
   });

   it('resets state when wasReset is true', () => {
      const { result, rerender } = renderHook(
         ({ wasReset }) =>
            useHand({
               playerIndex: 0,
               wasReset,
               onReplaceCards: mockOnReplaceCards,
               onLockHand: mockOnLockHand
            }),
         { initialProps: { wasReset: false } }
      );

      // Select a card
      act(() => {
         result.current.handleCardClick(1);
      });
      expect(result.current.selectedCards).toEqual([1]);

      // Reset state
      rerender({ wasReset: true });
      expect(result.current.selectedCards).toEqual([]);
      expect(result.current.isLocked).toBe(false);
   });
});
