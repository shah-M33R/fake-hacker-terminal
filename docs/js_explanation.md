# JavaScript Code Explanation for "Fake Hacker Terminal"

## Overview

JavaScript brings the terminal to life. It handles user input, processes commands, updates the DOM (Document Object Model) in real-time, and communicates with the server.

## Key Functions

### 1. Event Listeners

- **`keydown`**: Listens for the 'Enter' key to process commands and 'ArrowUp/Down' for command history.
- **`DOMContentLoaded`**: Ensures the code runs only after the page is fully loaded.

### 2. `processCommand(cmd)`

This is the brain of the terminal.

- **Parsing**: It splits the user's input string into the command (e.g., `steal`) and arguments (e.g., `--03 --10`).
- **Routing**: It uses `if/else` statements to decide which function to call based on the command.
- **Validation**: It checks if the user is in the correct "stage" (e.g., you can't steal before selecting a subject).

### 3. `initiateSteal(roll, targetAmount)`

This function handles the visual part of the hacking.

- **`setInterval`**: Creates a loop that runs every 100ms to update the screen.
- **Visual Logic**:
  - Randomly selects a "victim" row.
  - Decrements their number visually and flashes it red.
  - Increments the hacker's number visually and flashes it green.
  - Keeps track of the total stolen amount.
- **Completion**: When the animation finishes, it sends a `fetch` request to `actions.php` to actually save the changes.

### 4. `printOutput(text)`

A helper function that creates a new `<div>` element with the given text and appends it to the terminal window, simulating a scrolling log.

### 5. `fetch()`

Used to get data from the server (reading `attendance.json`) and send data to the server (posting to `actions.php`) without reloading the page.
