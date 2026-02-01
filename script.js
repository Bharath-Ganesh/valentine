const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const content = document.querySelector('.content');
const celebration = document.getElementById('celebration');
const tauntMessage = document.getElementById('tauntMessage');

let noBtnSize = 1;
let yesBtnSize = 1;
let tauntIndex = 0;

// Funny taunt messages
const taunts = [
    "Don't even try, Babe!!",
    "Aheem.. told yaa, Pookie!",
    "Don't do it, Rubina!",
    "Nope! Not happening, Idiyaat!",
    "You really thought, Babe?",
    "Nice try, Pookie!",
    "Still trying? Really, Rubina?",
    "Give up already, Babe!",
    "You know you want to say yes, Pookie!",
    "Stop being stubborn, Idiyaat!",
    "The button said BYE!",
    "Rubina, just say yes already!",
    "You can't escape this, Babe!",
    "Why you playing, Pookie?",
    "Resistance is futile, Rubina!"
];

// When hovering over the No button, it moves to a random position
noBtn.addEventListener('mouseenter', () => {
    moveNoButton();
});

// Also move when trying to click (for touch devices or quick clickers)
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
});

// Make the Yes button grow bigger each time No is hovered
function moveNoButton() {
    // Show taunt message
    tauntMessage.textContent = taunts[tauntIndex];
    tauntMessage.style.animation = 'none';
    setTimeout(() => {
        tauntMessage.style.animation = 'shake-text 0.5s';
    }, 10);

    tauntIndex = (tauntIndex + 1) % taunts.length;

    // Get random position within the main content card so it always stays visible
    const contentRect = content.getBoundingClientRect();
    const buttonWidth = noBtn.offsetWidth;
    const buttonHeight = noBtn.offsetHeight;
    const maxX = Math.max(0, contentRect.width - buttonWidth - 40);
    const maxY = Math.max(0, contentRect.height - buttonHeight - 40);

    const randomX = contentRect.left + 20 + Math.random() * maxX;
    const randomY = contentRect.top + 20 + Math.random() * maxY;

    // Move the No button to a random position inside the content area
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';

    // Make the No button smaller
    noBtnSize = Math.max(0.5, noBtnSize - 0.05);
    noBtn.style.transform = `scale(${noBtnSize})`;

    // Make the Yes button bigger and more attractive
    yesBtnSize += 0.1;
    yesBtn.style.transform = `scale(${yesBtnSize})`;

    // Add a little shake to the No button
    noBtn.style.animation = 'shake 0.3s';
    setTimeout(() => {
        noBtn.style.animation = '';
    }, 300);
}

// When Yes is clicked, show celebration
yesBtn.addEventListener('click', () => {
    content.style.display = 'none';
    celebration.classList.remove('hidden');

    // Create confetti effect
    createConfetti();

    // Create fireworks effect
    createFireworks();
});

// Confetti animation
function createConfetti() {
    const colors = ['#ff1493', '#ff69b4', '#ff85c1', '#ffc0cb', '#ff6b9d'];

    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '1000';

            document.body.appendChild(confetti);

            const fallDuration = 3 + Math.random() * 2;
            const fallDistance = window.innerHeight + 20;
            const sway = (Math.random() - 0.5) * 200;

            confetti.animate([
                {
                    transform: 'translateY(0) translateX(0) rotate(0deg)',
                    opacity: 1
                },
                {
                    transform: `translateY(${fallDistance}px) translateX(${sway}px) rotate(${Math.random() * 360}deg)`,
                    opacity: 0
                }
            ], {
                duration: fallDuration * 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });

            setTimeout(() => {
                confetti.remove();
            }, fallDuration * 1000);
        }, i * 30);
    }
}

// Add shake animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0) scale(${noBtnSize}); }
        25% { transform: translateX(-10px) scale(${noBtnSize}); }
        75% { transform: translateX(10px) scale(${noBtnSize}); }
    }
`;
document.head.appendChild(style);

// Fireworks animation
function createFireworks() {
    const fireworksContainer = document.getElementById('fireworks');
    const colors = ['#ff1493', '#ff69b4', '#ff85c1', '#ffc0cb', '#ff6b9d', '#c06c84'];

    function launchFirework() {
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        // Create multiple particles for each firework
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'firework';
            particle.style.left = x + '%';
            particle.style.top = y + '%';
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

            const angle = (Math.PI * 2 * i) / 30;
            const velocity = 50 + Math.random() * 50;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;

            particle.style.setProperty('--tx', tx + 'px');
            particle.style.setProperty('--ty', ty + 'px');

            fireworksContainer.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 1500);
        }
    }

    // Launch fireworks at intervals
    launchFirework();
    const fireworkInterval = setInterval(launchFirework, 800);

    // Stop after 10 seconds
    setTimeout(() => {
        clearInterval(fireworkInterval);
    }, 10000);
}

// Floating hearts animation
function createFloatingHearts() {
    const heartsContainer = document.getElementById('floatingHearts');
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘'];

    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart-celebration';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (3 + Math.random() * 2) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';

        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 6000);
    }

    // Create hearts continuously
    setInterval(createHeart, 500);
}
