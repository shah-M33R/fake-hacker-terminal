// Common effects and utilities
document.addEventListener('DOMContentLoaded', () => {
    // Typing sound effect for all inputs
    const inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            const audio = new Audio('assets/sounds/typing.mp3');
            audio.volume = 0.1;
            audio.play().catch(() => {}); // Ignore errors if no interaction yet
        });
    });
});

function typeWriter(elementId, text, speed = 50) {
    let i = 0;
    const element = document.getElementById(elementId);
    if (!element) return;
    
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}
