// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    setupContactForm();
    setupFAQ();
    loadTestimonials();
});

// Navigation Setup
function setupNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Setup FAQ
function setupFAQ() {
    document.querySelectorAll('.faq-item').forEach(item => {
        item.querySelector('.faq-question').addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });
}

// Contact Form
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('شكراً لك على رسالتك. سيتم التواصل معك قريباً!');
            contactForm.reset();
        });
    }
}

function loadTestimonials() {
    const stored = localStorage.getItem('testimonials');
    if (stored) {
        const testimonials = JSON.parse(stored);
        const container = document.getElementById('testimonialsContainer');
        container.innerHTML = testimonials.map(t => `
            <div class="testimonial-card">
                <p class="testimonial-text">"${t.text}"</p>
                <div class="testimonial-author">${t.author}</div>
                <div class="testimonial-rating">${'⭐'.repeat(t.rating)}</div>
            </div>
        `).join('');
    }
}
