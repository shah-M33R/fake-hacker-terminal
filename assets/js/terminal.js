document.addEventListener('DOMContentLoaded', () => {
    const commandInput = document.getElementById('command-input');
    const outputContainer = document.getElementById('terminal-output');
    const commandHistory = [];
    let historyIndex = -1;

    if (commandInput) {
        commandInput.focus();
        document.addEventListener('click', () => commandInput.focus());

        commandInput.addEventListener('keydown', (e) => {
            playTypingSound();

            if (e.key === 'Enter') {
                e.preventDefault();
                const command = commandInput.value.trim();
                
                if (command) {
                    commandHistory.push(command);
                    historyIndex = commandHistory.length;
                }
                
                processCommand(command);
                commandInput.value = '';
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (historyIndex > 0) {
                    historyIndex--;
                    commandInput.value = commandHistory[historyIndex];
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    commandInput.value = commandHistory[historyIndex];
                } else {
                    historyIndex = commandHistory.length;
                    commandInput.value = '';
                }
            }
        });
    }

    function playTypingSound() {
        const audio = new Audio('assets/sounds/typing.mp3');
        audio.volume = 0.2;
        audio.currentTime = 0;
        audio.play().catch(e => {});
    }

    function playErrorSound() {
        // Error sound logic
    }

    let hackStage = 0; // 0: None, 1: Database Accessed, 2: Subject Selected
    let currentRoll = null;

    function processCommand(cmd) {
        printOutput(`root@hacker:~$ ${cmd}`);

        const parts = cmd.split(' ');
        const action = parts[0].toLowerCase();
        const args = parts.slice(1).join(' ');

        if (action === 'help') {
            printOutput("AVAILABLE COMMANDS:");
            printOutput("- hack uni_database : Access University Database");
            printOutput("- show attendance_sheets : Display Attendance (Requires DB Access)");
            printOutput("- select <subject> : Select Subject (e.g., 'web technologies')");
            printOutput("- steal <my_roll_number> : Steal Attendance");
            printOutput("- exit : Logout and view credits");
            printOutput("- clear : Clear terminal");
        } else if (action === 'clear') {
            outputContainer.innerHTML = '';
        } else if (action === 'exit') {
            printOutput("LOGGING OUT...", true);
            setTimeout(() => {
                if (currentRoll) {
                    window.location.href = `result.php?roll=${currentRoll}`;
                } else {
                    window.location.href = 'credits.php';
                }
            }, 1000);
        } else if (action === 'hack' && args === 'uni_database') {
            initiateDatabaseHack();
        } else if (action === 'show' && args === 'attendance_sheets') {
            if (hackStage < 1) {
                triggerError("ERROR: ACCESS DENIED. DATABASE NOT ACCESSED.");
            } else {
                printOutput("AVAILABLE SUBJECTS:");
                printOutput("- Web Technologies");
                printOutput("- Data Structures");
                printOutput("- Artificial Intelligence");
            }
        } else if (action === 'select') {
            if (hackStage < 1) {
                triggerError("ERROR: ACCESS DENIED. DATABASE NOT ACCESSED.");
            } else if (args.toLowerCase() === 'web technologies') {
                hackStage = 2;
                printOutput("SUBJECT SELECTED: WEB TECHNOLOGIES");
                printOutput("FETCHING ATTENDANCE DATA...");
                setTimeout(fetchAndDisplayAttendance, 1000);
            } else {
                triggerError(`ERROR: Subject '${args}' not found.`);
            }
        } else if (action === 'steal') {
            if (hackStage < 2) {
                triggerError("ERROR: NO SUBJECT SELECTED.");
            } else if (args) {
                initiateSteal(args);
            } else {
                triggerError("ERROR: Specify your roll number. Usage: steal <roll>");
            }
        } else {
            triggerError(`Command not found: ${cmd}`);
        }
    }

    function triggerError(msg) {
        printOutput(msg);
        outputContainer.classList.add('error-shake');
        playErrorSound();
        setTimeout(() => {
            outputContainer.classList.remove('error-shake');
        }, 500);
    }

    function printOutput(text, isHtml = false) {
        const div = document.createElement('div');
        div.className = 'output-line';
        if (isHtml) {
            div.innerHTML = text;
        } else {
            div.textContent = text;
        }
        outputContainer.appendChild(div);
        outputContainer.scrollTop = outputContainer.scrollHeight;
    }

    function initiateDatabaseHack() {
        printOutput(`[!] TARGET: UNIVERSITY DATABASE`);
        printOutput(`[!] INITIATING BRUTE FORCE ATTACK...`);
        
        simulateProgress(() => {
            printOutput(`[+] ACCESS GRANTED. DATABASE CONNECTED.`);
            hackStage = 1;
        });
    }

    function fetchAndDisplayAttendance() {
        fetch('assets/data/attendance.json')
            .then(response => response.json())
            .then(data => {
                let tableHtml = '<table id="attendance-table" style="width:100%; text-align:left; color:var(--neon-green);"><tr><th>ID</th><th>NAME</th><th>DAYS</th></tr>';
                for (const [id, info] of Object.entries(data)) {
                    tableHtml += `<tr id="row-${id}"><td>${id}</td><td>${info.name}</td><td class="attendance-val">${info.attendance}</td></tr>`;
                }
                tableHtml += '</table>';
                printOutput(tableHtml, true);
                printOutput("READY TO STEAL. USE: steal <your_roll_number>");
            })
            .catch(err => printOutput("ERROR: FAILED TO FETCH DATA"));
    }

    function initiateSteal(roll) {
        currentRoll = roll;
        printOutput(`[!] TARGETING: ${roll}`);
        printOutput(`[!] SIPHONING ATTENDANCE FROM PEERS...`);
        
        const hackerRow = document.getElementById(`row-${roll}`);
        if (!hackerRow) {
            triggerError("ERROR: YOUR ID NOT FOUND IN TABLE. PLEASE RE-SCAN.");
            return;
        }
        hackerRow.classList.add('row-increment');

        const rows = document.querySelectorAll('#attendance-table tr');
        let totalStolen = 0;
        let iterations = 0;
        const maxIterations = 20; // How many updates to show

        const interval = setInterval(() => {
            iterations++;
            
            // Pick a random victim
            const randomRow = rows[Math.floor(Math.random() * rows.length)];
            const victimId = randomRow.id.replace('row-', '');
            
            if (victimId && victimId !== roll && randomRow.id.startsWith('row-')) {
                randomRow.classList.add('row-decrement');
                const valCell = randomRow.querySelector('.attendance-val');
                let currentVal = parseInt(valCell.textContent);
                
                if (currentVal > 0) {
                    currentVal--;
                    valCell.innerHTML = `${currentVal} <span class="down-arrow red">-1</span>`;
                    totalStolen++;
                }
                
                // Remove highlight after a bit
                setTimeout(() => {
                    randomRow.classList.remove('row-decrement');
                }, 200);
            }

            // Update hacker
            const hackerValCell = hackerRow.querySelector('.attendance-val');
            let hackerVal = parseInt(hackerValCell.textContent); // Parse just the number
            hackerVal++;
            hackerValCell.innerHTML = `${hackerVal} <span class="up-arrow green">+1</span>`;

            if (iterations >= maxIterations) {
                clearInterval(interval);
                printOutput(`[+] ATTENDANCE TRANSFERRED.`);
                printOutput(`[+] UPDATING RECORDS...`);
                
                // Send data to backend without redirecting
                const formData = new FormData();
                formData.append('roll', roll);
                fetch('actions.php', {
                    method: 'POST',
                    body: formData
                }).then(() => {
                    printOutput(`[+] RECORDS UPDATED SUCCESSFULLY.`);
                    printOutput(`[!] MISSION COMPLETE. TYPE 'exit' TO LEAVE.`);
                });
            }
        }, 100); // Faster animation
    }

    function simulateProgress(callback) {
        let progress = 0;
        const progressBar = document.createElement('div');
        progressBar.className = 'output-line progress-bar-text';
        outputContainer.appendChild(progressBar);

        // Create Overlay
        const overlay = document.createElement('div');
        overlay.className = 'overlay-message';
        overlay.innerHTML = `
            <div class="overlay-title">WORKING WITH WORK</div>
            <div class="overlay-subtitle">PLEASE WAIT...</div>
        `;
        document.body.appendChild(overlay);

        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 5) + 1; // Slower increment
            if (progress > 100) progress = 100;
            
            let bar = '[';
            for(let i=0; i<20; i++) {
                bar += (i < progress / 5) ? '#' : '.';
            }
            bar += `] ${progress}%`;
            progressBar.textContent = bar;

            if (progress === 100) {
                clearInterval(interval);
                document.body.removeChild(overlay); // Remove overlay
                callback();
            }
            outputContainer.scrollTop = outputContainer.scrollHeight;
        }, 200); // Slower interval (was 100)
    }
});
