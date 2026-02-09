// Initialize
// Theme Toggle Logic
const themeToggleButtons = document.querySelectorAll('.theme-toggle-btn');
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
    if (!themeToggleButtons) return;
    themeToggleButtons.forEach(button => {
        const icon = button.querySelector('i');
        if (icon) {
            icon.className = isDark ? 'fas fa-sun text-yellow-400' : 'fas fa-moon text-gray-600';
        }
    });
}

// Initialize theme
document.addEventListener('DOMContentLoaded', () => {
    // Particle system
    // createParticles();
    
    // Theme init
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        setTheme('dark');
    } else {
        setTheme('light');
    }

    // Toggle button listener
    themeToggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const isDark = html.classList.contains('dark');
            setTheme(isDark ? 'light' : 'dark');
        });
    });
});

// Mobile Menu Toggle
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    btn.addEventListener('click', () => {
        menu.classList.toggle('max-h-0');
        menu.classList.toggle('opacity-0');
        menu.classList.toggle('max-h-96');
        menu.classList.toggle('opacity-100');
    });

// Form Handling
function handleSubmit(event) {
    event.preventDefault();
    const form = document.getElementById('contactForm');
    const successMsg = document.getElementById('successMessage');
    const submitBtn = form.querySelector('button');

    // Simulate sending
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    submitBtn.classList.add('opacity-75');

    setTimeout(() => {
        form.reset();
        form.classList.add('hidden');
        successMsg.classList.remove('hidden');
        successMsg.classList.add('flex');
        // Scroll to message
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 1500);
}