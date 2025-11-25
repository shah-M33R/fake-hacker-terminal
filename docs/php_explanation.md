# PHP Code Explanation for "Fake Hacker Terminal"

## Overview
PHP is used in this project as the server-side language to handle data processing, file operations (reading/writing JSON), and page routing. It acts as the "brain" behind the terminal's actions.

## Key Files

### 1. `actions.php`
This file handles the core logic for the "steal" command.
- **Receiving Data**: It checks if a POST request is received containing the `roll` (hacker's ID) and `amount` (percentage to steal).
- **Reading Data**: It reads the `attendance.json` file to get the current state of all students.
- **The Algorithm**:
    - It identifies the hacker and all potential "victims" (other students).
    - It enters a loop that runs until the target amount is stolen.
    - Inside the loop, it randomly selects a victim and decrements their attendance by 1, adding it to a "stolen" counter.
    - If a victim reaches 0, they are removed from the pool.
- **Saving Data**: Once the amount is stolen, it updates the hacker's attendance (capped at 100%) and saves the modified data back to `attendance.json`.
- **Response**: It redirects or sends a success signal back to the frontend.

### 2. `result.php`
This page displays the final outcome after a successful hack.
- **Dynamic Content**: It uses `$_GET['roll']` to identify which student is viewing the page.
- **Data Display**: It reads `attendance.json` to show the updated attendance percentage for that specific student.

### 3. `credits.php`
This is a simple display page.
- **Structure**: It contains the HTML for the scrolling credits.
- **Logic**: Minimal PHP is used here, primarily for including common header files if necessary.

## Why PHP?
- **File Handling**: PHP is excellent for reading and writing files on the server, which is essential for our JSON-based database.
- **Simplicity**: It allows us to easily mix logic with HTML output.
