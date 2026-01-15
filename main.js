import { createIcons, Download, ArrowRight, ExternalLink, ArrowLeft } from 'lucide';

// Initialize Lucide icons
createIcons({
    icons: {
        Download,
        ArrowRight,
        ExternalLink,
        ArrowLeft
    }
});

// Simple Scroll Animation Observer
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in classes to sections for a modern feel
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.8s ease-out';
    observer.observe(section);
});

// Inject CSS for the animation state
const style = document.createElement('style');
style.textContent = `
    section.visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Smooth scroll for internal links on the same page
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            e.preventDefault();
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for sticky header
                behavior: 'smooth'
            });
        }
    });
});

// Fetch and update version tags from GitHub
async function updateVersionTags() {
    try {
        const response = await fetch('https://api.github.com/repos/YogaindoCR/Mine-imator-2.0.2-Simply-Upscaled-Build/releases/latest');
        if (!response.ok) throw new Error('Failed to fetch version');
        const data = await response.json();
        const latestVersion = data.tag_name;
        
        const versionElements = document.querySelectorAll('.current-version-text');
        versionElements.forEach(el => {
            el.textContent = latestVersion;
        });
    } catch (error) {
        console.error('Error fetching latest version:', error);
    }
}

// Initial version fetch
updateVersionTags();

// Easter Egg: Double click logo for RGB mode
const logos = document.querySelectorAll('.logo');
logos.forEach(logo => {
    logo.style.cursor = 'pointer';
    logo.addEventListener('dblclick', () => {
        document.body.classList.toggle('rgb-mode');
        
        // Visual feedback
        if (document.body.classList.contains('rgb-mode')) {
            console.log("RGB Mode Activated! 🌈");
        }
    });
});
