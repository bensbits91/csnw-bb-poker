import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PlayerName } from '../PlayerName';

describe('PlayerName Component', () => {
   const mockHandleStartEditing = jest.fn();
   const mockHandleKeyDown = jest.fn();
   const mockSetTempName = jest.fn();
   const mockSaveEditing = jest.fn();
   const mockCancelEditing = jest.fn();

   const defaultProps = {
      playerIndex: 0,
      playerName: 'Player 1',
      isEditing: false,
      tempName: '',
      inputRef: { current: null },
      handleStartEditing: mockHandleStartEditing,
      handleKeyDown: mockHandleKeyDown,
      setTempName: mockSetTempName,
      saveEditing: mockSaveEditing,
      cancelEditing: mockCancelEditing
   };

   it('renders the player name when not editing', () => {
      render(<PlayerName {...defaultProps} />);

      expect(screen.getByText('Player 1')).toBeInTheDocument();
      expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
   });

   it('calls handleStartEditing when the name is clicked', () => {
      render(<PlayerName {...defaultProps} />);

      fireEvent.click(screen.getByText('Player 1'));
      expect(mockHandleStartEditing).toHaveBeenCalledWith(0);
   });

   it('renders the input field when editing', () => {
      render(
         <PlayerName {...defaultProps} isEditing={true} tempName="Player 1" />
      );

      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toHaveValue('Player 1');
   });

   it('calls setTempName when the input value changes', () => {
      render(
         <PlayerName {...defaultProps} isEditing={true} tempName="Player 1" />
      );

      fireEvent.change(screen.getByRole('textbox'), {
         target: { value: 'New Name' }
      });
      expect(mockSetTempName).toHaveBeenCalledWith(0, 'New Name');
   });

   it('calls handleKeyDown when a key is pressed in the input field', () => {
      render(
         <PlayerName {...defaultProps} isEditing={true} tempName="Player 1" />
      );

      fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });
      expect(mockHandleKeyDown).toHaveBeenCalledWith(expect.any(Object), 0);
   });

   it('calls saveEditing when the save button is clicked', () => {
      render(
         <PlayerName {...defaultProps} isEditing={true} tempName="Player 1" />
      );

      fireEvent.click(screen.getByLabelText('Save name for Player 1'));
      expect(mockSaveEditing).toHaveBeenCalledWith(0);
   });

   it('calls cancelEditing when the cancel button is clicked', () => {
      render(
         <PlayerName {...defaultProps} isEditing={true} tempName="Player 1" />
      );

      fireEvent.click(
         screen.getByLabelText('Cancel editing name for Player 1')
      );
      expect(mockCancelEditing).toHaveBeenCalledWith(0);
   });
});
