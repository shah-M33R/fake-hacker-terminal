# CSS Code Explanation for "Fake Hacker Terminal"

## Overview

CSS (Cascading Style Sheets) is responsible for the visual style, layout, and animations of the terminal. It creates the "hacker" aesthetic using neon colors, dark backgrounds, and specific fonts.

## Key Concepts

### 1. Variables (`:root`)

We use CSS variables to maintain consistency.

- `--neon-green`: The signature hacker green color used for text and borders.
- `--bg-color`: Deep black for the terminal background.

### 2. Terminal Styling

- **Font**: A monospaced font (like 'Courier New' or a custom web font) is used to mimic old-school terminals.
- **Glow Effects**: `text-shadow` and `box-shadow` are used to create a glowing neon effect on text and containers.

### 3. Animations

- **`@keyframes`**: This rule defines the steps of an animation.
- **`scrollUp` (Credits)**: Moves the text from the bottom of the screen to the top (or center) to simulate movie credits.
- **`error-shake`**: A quick vibration effect applied to the terminal window when an incorrect command is entered.
- **`blink`**: Makes the cursor appear and disappear to simulate typing.

### 4. Layout (Flexbox)

- We use `display: flex` to center elements like the login box and the credits container. It ensures the content stays perfectly aligned regardless of screen size.

### 5. Classes for Logic

- **`.row-increment` / `.row-decrement`**: These classes are added by JavaScript to specific table rows to trigger color changes (green for gain, red for loss) during the stealing process.
