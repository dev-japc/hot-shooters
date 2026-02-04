 // Particle System Logic (Slowed down for formal effect)
function createParticles() {
    const container = document.getElementById('particles-js');
    if (!container) return;
    const particleCount = 20; // Reduced count

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random positioning and sizing
        const size = Math.random() * 4 + 2; // Smaller, finer particles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        
        // Slower animation
        const duration = Math.random() * 15 + 10; // 10 to 25 seconds
        const delay = Math.random() * 5;
        
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        // Muted colors
        const colors = ['#C81D25', '#F59E0B'];
        particle.style.background = `radial-gradient(circle, ${colors[Math.floor(Math.random() * colors.length)]} 0%, transparent 70%)`;

        container.appendChild(particle);
    }
}

// Initialize
// Theme Toggle Logic
const toggleThemeBtn = document.getElementById('theme-toggle');
const html = document.documentElement;

// Function to set theme
function setTheme(theme) {
    if (theme === 'dark') {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        updateIcon(true);
    } else {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        updateIcon(false);
    }
}

// Update icon based on theme
function updateIcon(isDark) {
    if (!toggleThemeBtn) return;
    const icon = toggleThemeBtn.querySelector('i');
    if (icon) {
        icon.className = isDark ? 'fas fa-sun text-yellow-400' : 'fas fa-moon text-gray-600';
    }
}

// Initialize theme
document.addEventListener('DOMContentLoaded', () => {
    // Particle system
    createParticles();
    
    // Theme init
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        setTheme('dark');
    } else {
        setTheme('light');
    }

    // Toggle button listener
    const btn = document.getElementById('theme-toggle');
    if (btn) {
        btn.addEventListener('click', () => {
            const isDark = html.classList.contains('dark');
            setTheme(isDark ? 'light' : 'dark');
        });
    }
});