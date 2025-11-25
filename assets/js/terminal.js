document.addEventListener('DOMContentLoaded', () => {
    const commandInput = document.getElementById('command-input');
    const outputContainer = document.getElementById('terminal-output');
    const commandHistory = [];
    let historyIndex = -1;

    if (commandInput) {
        commandInput.focus();
        document.addEventListener('click', () => commandInput.focus());

        commandInput.addEventListener('keydown', (e) => {
            // Sound removed

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

    let hackStage = 0;
    let currentRoll = null;

    function processCommand(cmd) {
        printOutput(`root@hacker:~$ ${cmd}`);

        const parts = cmd.split(' ');
        const action = parts[0].toLowerCase();
        const args = parts.slice(1).join(' ');

        if (action === 'help') {
            printOutput("AVAILABLE COMMANDS:");
            printOutput("- hack uni_database : Access University Database");
            printOutput("- show subjects : Display Attendance (Requires DB Access)");
            printOutput("- select --(subject) : Select Subject (e.g., 'web technologies')");
            printOutput("- steal --(id) --(percentage) : Steal Attendance");
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
        } else if (action === 'show' && args === 'subjects') {
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
            } else if (args.toLowerCase() === '--web technologies') {
                hackStage = 2;
                printOutput("SUBJECT SELECTED: WEB TECHNOLOGIES");
                printOutput("FETCHING ATTENDANCE DATA...");
                setTimeout(fetchAndDisplayAttendance, 1000);
            } else {
                triggerError(`ERROR: Subject '${args}' not found. Use --(subject)`);
            }
        } else if (action === 'steal') {
            if (hackStage < 2) {
                triggerError("ERROR: NO SUBJECT SELECTED.");
            } else {
                const idMatch = cmd.match(/--([a-zA-Z0-9]+)/);
                const percentMatch = cmd.match(/--\w+\s+--(\d+)/); 
                
                if (idMatch && percentMatch) {
                     const id = idMatch[1];
                     const percentage = parseInt(percentMatch[1]); // Fix: percentMatch index
                     initiateSteal(id, percentage);
                } else {
                    triggerError("ERROR: Usage: steal --(id) --(percentage)");
                }
            }
        } else {
            triggerError(`Command not found: ${cmd}`);
        }
    }

    function triggerError(msg) {
        printOutput(msg);
        outputContainer.classList.add('error-shake');
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
        fetch('assets/data/attendance.json?t=' + new Date().getTime())
            .then(response => response.json())
            .then(data => {
                let tableHtml = '<table id="attendance-table" style="width:100%; text-align:left; color:var(--neon-green);"><tr><th>ID</th><th>NAME</th><th>DAYS</th></tr>';
                for (const [id, info] of Object.entries(data)) {
                    tableHtml += `<tr id="row-${id}"><td>${id}</td><td>${info.name}</td><td class="attendance-val">${info.attendance}</td></tr>`;
                }
                tableHtml += '</table>';
                printOutput(tableHtml, true);
                printOutput("READY TO STEAL. USE: steal --(id) --(percentage)");
            })
            .catch(err => printOutput("ERROR: FAILED TO FETCH DATA"));
    }

    function initiateSteal(roll, targetAmount) {
        currentRoll = roll;
        printOutput(`[!] TARGETING: ${roll}`);
        printOutput(`[!] SIPHONING ${targetAmount}% ATTENDANCE FROM PEERS...`);
        
        const hackerRow = document.getElementById(`row-${roll}`);
        if (!hackerRow) {
            triggerError("ERROR: YOUR ID NOT FOUND IN TABLE. PLEASE RE-SCAN.");
            return;
        }
        hackerRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
        hackerRow.classList.add('row-increment');

        const rows = document.querySelectorAll('#attendance-table tr');
        let totalStolen = 0;
        
        const interval = setInterval(() => {
            
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
                    
                    const hackerValCell = hackerRow.querySelector('.attendance-val');
                    let hackerVal = parseInt(hackerValCell.textContent);
                    hackerVal++;
                    hackerValCell.innerHTML = `${hackerVal} <span class="up-arrow green">+1</span>`;
                }
                
                setTimeout(() => {
                    randomRow.classList.remove('row-decrement');
                }, 200);
            }

            if (totalStolen >= targetAmount) {
                clearInterval(interval);
                printOutput(`[+] ATTENDANCE TRANSFERRED.`);
                printOutput(`[+] UPDATING RECORDS...`);
                
                const formData = new FormData();
                formData.append('roll', roll);
                formData.append('amount', targetAmount);
                fetch('actions.php', {
                    method: 'POST',
                    body: formData
                }).then(() => {
                    printOutput(`[+] RECORDS UPDATED SUCCESSFULLY.`);
                    printOutput(`[!] MISSION COMPLETE. TYPE 'exit' TO LEAVE.`);
                });
            }
        }, 100);
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
