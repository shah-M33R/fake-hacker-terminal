document.addEventListener('DOMContentLoaded', () => {
    const loginInput = document.getElementById('login-input');
    const logsContainer = document.getElementById('login-logs');

    if (loginInput) {
        loginInput.focus();
        loginInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                startLoginSequence(loginInput.value);
                loginInput.disabled = true;
            }
        });
    }

    function startLoginSequence(username) {
        const logs = [
            `USER: ${username}`,
            "CONNECTING TO SECURE SERVER...",
            "ENCRYPTING CONNECTION...",
            "BYPASSING FIREWALL...",
            "ACCESS GRANTED."
        ];

        let delay = 0;
        logs.forEach((log, index) => {
            setTimeout(() => {
                const p = document.createElement('div');
                p.className = 'output-line';
                p.textContent = `> ${log}`;
                logsContainer.appendChild(p);
                playTypingSound();
                
                if (index === logs.length - 1) {
                    setTimeout(() => {
                        window.location.href = 'terminal.php';
                    }, 1000);
                }
            }, delay);
            delay += Math.random() * 500 + 300;
        });
    }
    
    function playTypingSound() {
        // Optional: Add sound playing logic here if audio file exists
        const audio = new Audio('assets/sounds/typing.wav');
        audio.volume = 0.2;
        audio.play().catch(e => console.log("Audio play failed (interaction needed first)"));
    }
});
