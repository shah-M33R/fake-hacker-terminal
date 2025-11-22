document.addEventListener('DOMContentLoaded', () => {
    const commandInput = document.getElementById('command-input');
    const outputContainer = document.getElementById('terminal-output');
    const form = document.getElementById('hack-form');
    const rollInput = document.getElementById('roll-input');

    if (commandInput) {
        commandInput.focus();
        // Keep focus
        document.addEventListener('click', () => commandInput.focus());

        commandInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const command = commandInput.value.trim();
                processCommand(command);
                commandInput.value = '';
            }
        });
    }

    function processCommand(cmd) {
        printOutput(`root@hacker:~$ ${cmd}`);

        const parts = cmd.split(' ');
        const action = parts[0].toLowerCase();

        if (action === 'help') {
            printOutput("AVAILABLE COMMANDS:");
            printOutput("- hack attendance : Initiate general hack");
            printOutput("- hack <roll_number> : Hack specific student");
            printOutput("- clear : Clear terminal");
        } else if (action === 'clear') {
            outputContainer.innerHTML = '';
        } else if (action === 'hack') {
            if (parts.length > 1) {
                const target = parts[1];
                if (target === 'attendance') {
                    printOutput("ERROR: Specify target roll number. Usage: hack <roll>");
                } else {
                    initiateHack(target);
                }
            } else {
                printOutput("ERROR: Target missing.");
            }
        } else {
            printOutput(`Command not found: ${cmd}`);
        }
    }

    function printOutput(text) {
        const div = document.createElement('div');
        div.className = 'output-line';
        div.textContent = text;
        outputContainer.appendChild(div);
        outputContainer.scrollTop = outputContainer.scrollHeight;
    }

    function initiateHack(roll) {
        printOutput(`[!] TARGET IDENTIFIED: ${roll}`);
        printOutput(`[!] INITIATING BRUTE FORCE ATTACK...`);
        
        let progress = 0;
        const progressBar = document.createElement('div');
        progressBar.className = 'output-line';
        outputContainer.appendChild(progressBar);

        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 10) + 5;
            if (progress > 100) progress = 100;
            
            let bar = '[';
            for(let i=0; i<20; i++) {
                bar += (i < progress / 5) ? '#' : '.';
            }
            bar += `] ${progress}%`;
            progressBar.textContent = bar;

            if (progress === 100) {
                clearInterval(interval);
                printOutput(`[+] PASSWORD CRACKED.`);
                printOutput(`[+] INJECTING PAYLOAD...`);
                setTimeout(() => {
                    rollInput.value = roll;
                    form.submit();
                }, 1000);
            }
            outputContainer.scrollTop = outputContainer.scrollHeight;
        }, 100);
    }
});
