document.addEventListener('DOMContentLoaded', () => {
    const loginInput = document.getElementById('login-input');
    const logsContainer = document.getElementById('login-logs');

    const passwordInput = document.getElementById('password-input');
    const promptSpan = document.querySelector('.prompt');

    if (loginInput) {
        loginInput.focus();
        loginInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (loginInput.value.trim() !== "") {
                    switchToPasswordMode();
                }
            }
        });
    }

    if (passwordInput) {
        passwordInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                startLoginSequence(loginInput.value);
                passwordInput.disabled = true;
                passwordInput.blur();
            }
        });
    }

    function switchToPasswordMode() {
        loginInput.classList.add('hidden');
        passwordInput.classList.remove('hidden');
        passwordInput.focus();
        promptSpan.textContent = "PASSWORD >";
    }

    function startLoginSequence(username) {
        // Hide inputs during sequence
        document.querySelector('.input-area').style.display = 'none';
        
        const logs = [
            `USER: ${username}`,
            "VERIFYING CREDENTIALS...",
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
