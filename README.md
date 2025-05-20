# CSNW Poker

A poker game application built with React and TypeScript.

This project uses TypeScript for type safety and React for building the UI. It also includes ESLint for linting and code quality.

❤️ Play now at [benbrookspoker.app](https://benbrookspoker.app).

For more information, check the [wiki](https://github.com/bensbits91/csnw-bb-poker/wiki).

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Features](#features)
3. [Project Structure](#project-structure)
4. [Installation](#installation)
5. [Deployment](#deployment)
6. [Client Directory Structure](#client-directory-structure)
7. [Component Hierarchy](#component-hierarchy)
8. [State Management Flow](#state-management-flow)
9. [Context Usage](#context-usage)
10.   [Key Hooks](#key-hooks)
11.   [Utilities](#utilities)
12.   [Styling](#styling)
13.   [Accessibility Features](#accessibility-features)
14.   [Error Handling](#error-handling)
15.   [Testing](#testing)
16.   [Performance Optimization](#performance-optimization)
17.   [Why I Chose to Build This Poker Game](#why-i-chose-to-build-this-poker-game)
18.   [Potential Future Enhancements](#potential-future-enhancements)
19.   [FAQ](#faq)
20.   [Contributing](#contributing)
21.   [License](#license)
22.   [Acknowledgments](#acknowledgments)

## Tech Stack

-  **Frontend**: React, TypeScript, Tailwind CSS
-  **State Management**: React Context and custom hooks
-  **Build Tool**: Vite
-  **Testing**: Jest, Testing Library, Cypress
-  **Deployment**: Vercel

## Features

-  **Dynamic UI**: Supports dark mode and responsive web design.
-  **Editable Player Names**: Easily edit player names with keyboard shortcuts (Enter to save, Escape to cancel).
-  **Persistent State**: Player names and theme persist in local storage.
-  **Animations**: Includes two types of animations:
   -  **CSS Animations** for lightweight effects.
   -  **Lottie Animations** with a custom hook for dynamic styling (used for the winner animation).
-  **Icons**: Curated from multiple sources and converted into styleable React components. The Icon.tsx component accepts an icon name and size, allowing for flexible and reusable icon rendering throughout the application.
-  **Custom Components**: Built reusable components for the game, hands and cards, including custom buttons, icons, and headings. All built from scratch. The toolbars incorporate [a Radix Primitive](https://www.radix-ui.com/primitives/docs/components/toolbar). No other libraries were used in the building of the components.
-  **Accessibility**: Designed with WCAG compliance in mind.
-  **State Management**: Managed with custom hooks (no external libraries) and React Context Providers (e.g., `ThemeProvider`, `PlayersProvider`) for global state management.
-  **Tailwind CSS**: Styled using Tailwind CSS to support quick, iterative development.
-  **Hand Ranking Logic**: Includes utilities for deck initialization, shuffling, dealing, card replacement, hand ranking, and winner determination.
-  **TypeScript Excellence**: Strongly typed codebase with heavy ESLint usage for code quality.

## Project Structure

The entire application currently resides inside the `/client` directory, including the `package.json` file. This structure was chosen because the original plan was to move most of the game logic to a backend server (using Express) and develop the API in the `/server` directory. However, due to time constraints, I chose to focus on the frontend, to be sure to showcase my skills and experience using React with TypeScript.

[Future enhancements](#potential-future-enhancements) can include separating the backend logic into its own directory and implementing server-side functionality for scalability and improved architecture.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/csnw-poker.git
   cd csnw-poker
   ```

2. Navigate to the `/client` directory:

   ```bash
   cd client
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Build for production:

   ```bash
   npm run build
   ```

6. Preview the production build:

   ```bash
   npm run preview
   ```

## Deployment

The application is deployed on **Vercel** and accessible at:

-  **Production URL**: [benbrookspoker.app](https://benbrookspoker.app)
-  **Vercel Deployment URL**: [csnw-bb-poker.vercel.app](https://csnw-bb-poker.vercel.app)

### Deployment Details

-  **Hosting Platform**: [Vercel](https://vercel.com/)
-  **Custom Domain**: [benbrookspoker.app](https://benbrookspoker.app)
-  **Build Command**: `npm run build`
-  **Output Directory**: `dist`

## Client Directory Structure

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

## Component Hierarchy

```
App
├── GameHeader
├── Game
│   ├── GameToolbar
│   ├── Hand (for each player)
│   │   ├── HandHeader
│   │   ├── Card (for each card in the hand)
│   │   └── HandToolbar
├── ThemeProvider (wraps the entire app for theme context)
└── PlayersProvider (wraps the app for player state management)
```

## State Management Flow

-  **useGame Hook**:
   -  Manages the state for the poker game:
      -  Deck of cards
      -  Player hands
      -  Locked hands
      -  Winners
      -  Game reset state
   -  Provides functions to:
      -  Deal cards
      -  Replace cards
      -  Lock hands
      -  Determine winners
-  **usePlayers Hook**:
   -  Manages the state for player information:
      -  Player names
      -  Editing state for player names
   -  Provides functions to:
      -  Update player names
      -  Start, cancel, and save name editing
-  **Interaction**:
   -  Game uses useGame to manage game logic and state.
   -  Hand components use usePlayers to display and update player names.

## Context Usage

-  **ThemeContext**:
   -  Provides the current theme (light or dark) and a function to toggle the theme.
   -  Used by:
      -  App to apply theme-based styling.
      -  GameToolbar to toggle between light and dark modes.
-  **PlayersContext**:
   -  Provides the current player names and editing state.
   -  Used by:
      -  HandHeader to display and edit player names.
      -  GameToolbar to reset player names.

### Flowchart Representation

```
[Providers]
     |
     v
    [App]
     |
     +-------------------+
     |                   |
[GameHeader]         [Game]
                         |
                         +-----------------------------------+
                         |                                   |
                 [GameToolbar]                     [Hand (for each player)]
                                                        |
                                                        +-------------------+
                                                        |       |           |
                                                [HandHeader]    |    [HandToolbar]
                                                                |
                                                       [Card (for each card)]
```

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

## Utilities

### Deck and Game Logic

-  **Deck Initialization**: Creates a standard deck of 52 cards.
-  **Shuffling and Dealing**: Randomizes the deck and deals cards to players.
   - IMPORTANT: We have logged an issue regarding the insufficient shuffling algorithm. We're curently using MATH.random(), which results in poor randomization with some browsers. We should implement a better algorithm, such as the "Fisher-Yates Shuffle.". [More details in the reported issue](https://github.com/bensbits91/csnw-bb-poker/issues/16). 
-  **Card Replacement**: Handles replacing cards in a player's hand.
-  **Hand Ranking**: Implements poker hand ranking logic.
-  **Winner Determination**: Determines the winner(s) based on hand rankings.

## Styling

-  **Tailwind CSS**: Used for rapid styling.
-  **Custom Theme Context**: Manages light and dark mode with a palette inspired by the CSNW website.
-  **Responsive Design**: Fully responsive for desktop and mobile devices.

## Accessibility Features

-  **Keyboard Navigation**: All interactive elements are accessible via keyboard.
-  **High Contrast Mode**: Dark mode and light mode provide clear visual contrast.
-  **Screen Reader Support**: Semantic HTML and ARIA attributes ensure compatibility with screen readers.

## Error Handling

The CSNW Poker application includes robust error handling mechanisms to ensure a smooth user experience and maintain application stability:

### **Components**

-  **Validation**:
   -  Components validate props and user inputs to prevent invalid states.
   -  Example: The `Card` component validates that a valid card object is passed and throws an error if the card is missing or malformed.

### **Hooks**

-  **Error Handling in Custom Hooks**:
   -  Hooks like `useGame` and `usePlayers` include validation and error handling for state updates.
   -  Example: `usePlayers` ensures that player names are not empty and prevents invalid updates.

### **Utilities**

-  **Validation in Utility Functions**:
   -  Utility functions (e.g., for deck initialization, hand ranking, and card replacement) include checks to handle edge cases and invalid inputs.
   -  Example: The hand ranking utility ensures that only valid poker hands are processed.

### **Error Boundaries**

-  **Custom Error Boundaries**:
   -  The application uses custom Error Boundaries to catch and display errors in specific parts of the UI without crashing the entire app.
   -  Examples:
      -  The ErrorBoundary wrapping the mapping of hands to Hand components ensures that if an error occurs while rendering any individual player's hand, the rest of the game remains functional.
      -  The WinnerAnimation component is responsible for displaying the animation when a winner is determined. If an error occurs in the animation (e.g., due to a rendering issue or invalid animation data), the game can still proceed without crashing.

These error handling strategies ensure that the application remains resilient and provides meaningful feedback to users in case of unexpected issues.

## Testing

The CSNW Poker application includes a comprehensive testing strategy to ensure the reliability and correctness of the codebase. We use a combination of **Jest**, **Testing Library**, and **Cypress** to cover unit, integration, and end-to-end (E2E) testing.

### **Unit and Integration Testing**

-  **Jest**:
   -  Used for unit and integration tests to validate the functionality of individual components, hooks, and utility functions.
   -  Example: Testing the `useGame` hook to ensure proper state updates when dealing cards or determining winners.
-  **Testing Library**:
   -  Used alongside Jest to test React components in a way that mimics user interactions.
   -  Example: Testing the `Hand` component to ensure player names are displayed correctly and cards are rendered as expected.

### **End-to-End Testing**

-  **Cypress**:
   -  Used for E2E testing to validate the entire user flow, from starting a game to determining a winner.
   -  Example Tests:
      -  **Core Game Flow**: Ensures the game starts, cards are dealt, hands are locked, and a winner is determined.
      -  **Player Name Editing**: Verifies that players can edit their names and the changes are reflected in the UI.
      -  **Card Replacement**: Ensures players can replace cards in their hands and the deck updates correctly.
      -  **Game Reset**: Confirms that resetting the game clears all player hands and resets the deck.

### **Testing Strategy**

-  **Focus on User Behavior**:
   -  Tests are written to simulate real user interactions, ensuring the application behaves as expected in various scenarios.
-  **Error Handling**:
   -  Tests include scenarios for invalid inputs and edge cases to ensure the application handles errors gracefully.
-  **Automation**:
   -  Cypress tests are automated to run during the CI/CD pipeline, ensuring the application is thoroughly tested before deployment.

### **How to Run Tests**

1. **Run Unit and Integration Tests**:

   ```bash
   npm run test
   ```

   -  This runs all Jest tests and provides a coverage report.

2. **Run End-to-End Tests**:

   ```bash
   npx cypress open
   ```

   -  This opens the Cypress Test Runner, where you can select and run individual E2E tests.

3. **Run All Tests in CI**:
   ```bash
   npm run test:ci
   ```
   -  This runs both Jest and Cypress tests in a headless mode for CI/CD pipelines.

By combining Jest, Testing Library, and Cypress, the CSNW Poker application ensures high-quality code and a seamless user experience.

## Performance Optimization

-  **Lazy Loading**: Components like `WinnerAnimation` are only loaded when needed.
-  **Efficient State Management**: React Context and custom hooks are used to minimize unnecessary re-renders.
-  **Build Optimization**: Vite is used for fast builds and optimized production output.

## Why I Chose to Build This Poker Game?

This poker game was chosen as a project because it offers:

-  **UI Complexity**: Multiple interactive components and dynamic state.
-  **Interactivity**: Features like editing player names, dealing cards, and determining winners.
-  **Frontend Choices**: Opportunities to explore animations, styling, and state management.

## Potential Future Enhancements

Here are some ideas for potential future improvements to the CSNW Poker application:

### **Backend Integration**

-  **Server-Side Logic**:
   -  Move most of the game logic (e.g., dealing cards, hand ranking, winner determination) to a backend server for better scalability and security.
-  **Database Integration**:
   -  Use a lightweight NoSQL database to:
      -  Save player information (e.g., names, preferences).
      -  Store hand history for analytics or replay functionality.
      -  Enable multiple players, using WebSockets for real-time communication.

### **Improved Component Hierarchy**

-  Refactor the component hierarchy to make it more intuitive and game-like:
   ```
   Game
   ├── Table
   │   ├── Player (for each player)
   │   │   ├── Hand
   │   │   │   ├── Card (for each card)
   ```
   -  Note: This approach may require lifting state and prop drilling, which could add complexity.

### **Enhanced Frontend Experience**

-  **More Game-Like Feel**:
   -  Add more animations to enhance interactivity and immersion.
   -  Introduce 3D effects for a more realistic poker table experience.
-  **Hand Value Display**:
   -  Show detailed hand values for better clarity:
      -  Example:
         -  "One Pair" → "Pair of 9s"
         -  "Two Pair" → "Pair of 9s and Pair of 3s"
         -  "Straight" → "9 high"
-  **Improved Styling for Hands and Cards**:
   -  Replace Unicode card symbols with custom-designed card graphics.
   -  Arrange cards in a radial layout to mimic a real poker table.

These enhancements aim to improve the scalability, usability, and overall user experience of the application while making it more engaging and visually appealing.

## FAQ

### Why is the game logic on the frontend?

The initial focus was on showcasing frontend skills with React and TypeScript. Future enhancements may include moving the logic to a backend server.

### Can I play this game with friends?

Currently, the game is designed for local play. Multiplayer functionality is a potential future enhancement.

### How do I reset the game?

Click the "Reset Game" button in the toolbar to clear all hands and start a new game.

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

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

This project was built using:

-  [React](https://reactjs.org/)
-  [TypeScript](https://www.typescriptlang.org/)
-  [Vite](https://vitejs.dev/)
-  [ESLint](https://eslint.org/)
-  [Radix Primitives](https://www.radix-ui.com/)
-  [Tailwind CSS](https://tailwindcss.com/)
-  [Lottie](https://airbnb.io/lottie/)
