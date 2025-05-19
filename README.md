# CSNW Poker

A poker game application built with React, TypeScript, and Vite.

This project uses Vite for fast builds and hot module replacement (HMR), along with TypeScript for type safety and React for building the UI. It also includes ESLint for linting and code quality.

---

## Features

-  **Dynamic UI**: Supports dark mode and responsive web design.
-  **Editable Player Names**: Easily edit player names with keyboard shortcuts (Enter to save, Escape to cancel).
-  **Persistent State**: Player names and theme persist in local storage.
-  **Animations**: Includes two types of animations:
   -  **CSS Animations** for lightweight effects.
   -  **Lottie Animations** with a custom hook for dynamic styling.
-  **Icons**: Curated from multiple sources and converted into styleable React components.
-  **Custom Components**: Built reusable components for buttons, icons, and more.
-  **Accessibility**: Designed with WCAG compliance in mind.
-  **State Management**: Managed with custom hooks (no external libraries).
-  **Tailwind CSS**: Styled using Tailwind CSS with best practices.
-  **Radix Primitives**: Used for building the toolbar.
-  **Hand Ranking Logic**: Includes utilities for deck initialization, shuffling, dealing, card replacement, hand ranking, and winner determination.
-  **TypeScript Excellence**: Strongly typed codebase with heavy ESLint usage for code quality.

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/csnw-poker.git
   cd csnw-poker
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Build for production:

   ```bash
   npm run build
   ```

5. Preview the production build:
   ```bash
   npm run preview
   ```

---

## Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── common/       # Shared components (e.g., Button, Icon)
│   │   ├── game/         # Game-related components (e.g., Game, GameToolbar)
│   │   ├── hand/         # Hand-related components (e.g., Hand, HandHeader)
│   ├── context/          # React context providers (e.g., ThemeProvider)
│   ├── hooks/            # Custom hooks (e.g., usePlayers, useTheme, useGame)
│   ├── utils/            # Utility functions (e.g., deck initialization, shuffling, hand ranking)
│   ├── App.tsx           # Main application component
│   ├── index.tsx         # Entry point
```

---

## Key Hooks

### `usePlayers`

Manages player names and editing state.

-  **State**:

   -  `players`: Array of player objects with `id` and `name`.
   -  `isEditing`: Array of booleans indicating if a player is being edited.
   -  `tempNames`: Temporary names for editing.

-  **Functions**:
   -  `updatePlayerName(index, newName)`: Updates a player's name.
   -  `startEditing(index)`: Enables editing mode for a player.
   -  `cancelEditing(index)`: Cancels editing and resets the name.
   -  `saveEditing(index)`: Saves the edited name.

### `useGame`

Manages game state, including hands, winners, and game actions.

-  **State**:

   -  `hands`: The current hands dealt to players.
   -  `winners`: The winning player(s).
   -  `finalHands`: The final ranked hands.

-  **Functions**:
   -  `handleLockHand(index)`: Locks a player's hand.
   -  `handleReplaceCards(index)`: Replaces cards in a player's hand.
   -  `handleDealClick()`: Deals a new round of cards.
   -  `handleEndNowClick()`: Ends the current game.

### `useTheme`

Manages the application's theme (light/dark mode).

-  **State**:

   -  `theme`: Current theme (`light` or `dark`).

-  **Functions**:
   -  `toggleTheme()`: Toggles between light and dark mode.

---

## Utilities

### Deck and Game Logic

-  **Deck Initialization**: Creates a standard deck of 52 cards.
-  **Shuffling and Dealing**: Randomizes the deck and deals cards to players.
-  **Card Replacement**: Handles replacing cards in a player's hand.
-  **Hand Ranking**: Implements poker hand ranking logic.
-  **Winner Determination**: Determines the winner(s) based on hand rankings.

---

## Custom Components

-  **Button**: A reusable button component with support for icons and accessibility.
-  **Icon**: Styleable React components for various icons.
-  **GameToolbar**: Built with Radix Primitives for accessibility and flexibility.
-  **HandHeader**: Displays player information and allows editing player names.

---

## Styling

-  **Tailwind CSS**: Used for styling with best practices.
-  **Custom Theme Context**: Manages light and dark mode with a palette inspired by the CSNW website.
-  **Responsive Design**: Fully responsive for desktop and mobile devices.

---

## Accessibility

-  Designed with WCAG compliance in mind.
-  Focus management and keyboard navigation for interactive elements.
-  High contrast and clear visual indicators for dark mode.

---

## Why Build This Poker Game?

This poker game was chosen as a project because it offers:

-  **UI Complexity**: Multiple interactive components and dynamic state.
-  **Interactivity**: Features like editing player names, dealing cards, and determining winners.
-  **Frontend Choices**: Opportunities to explore animations, styling, and state management.

---

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgments

This project was built using:

-  [React](https://reactjs.org/)
-  [TypeScript](https://www.typescriptlang.org/)
-  [Vite](https://vitejs.dev/)
-  [ESLint](https://eslint.org/)
-  [Radix Primitives](https://www.radix-ui.com/)
-  [Tailwind CSS](https://tailwindcss.com/)
-  [Lottie](https://airbnb.io/lottie/)
