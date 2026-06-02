// Data Management
const appData = {
    pricing: [
        { id: 1, title: 'جلسة كوتشنج فردية', duration: '60 دقيقة', price: 300, description: 'جلسة فردية متكاملة' },
        { id: 2, title: 'جلسة علاجية', duration: '90 دقيقة', price: 450, description: 'جلسة عميقة للعلاج' },
        { id: 3, title: 'جلسة تنويم إيحائي', duration: '90 دقيقة', price: 450, description: 'تنويم إيحائي علاجي' },
        { id: 4, title: 'استشارة أسرية فردية', duration: 'متفاوت', price: 350, description: 'استشارة للفرد' },
        { id: 5, title: 'استشارة زوجية', duration: 'متفاوت', price: 600, description: 'استشارة للزوجين' }
    ],
    testimonials: [
        { id: 1, author: 'فاطمة أحمد', text: 'سارة غيّرت حياتي بشكل جذري. جلساتها ساعدتني على فهم نفسي بشكل أعمق.', rating: 5 },
        { id: 2, author: 'ليلى محمد', text: 'الخدمات احترافية وفعّالة جداً. أنصح بها بشدة!', rating: 5 },
        { id: 3, author: 'نور علي', text: 'تجربة رائعة. سارة مدربة متمكنة وداعمة.', rating: 5 }
    ],
    faqs: [
        { question: 'كم تستغرق الجلسة الواحدة؟', answer: 'تستغرق الجلسات بين 60-90 دقيقة حسب نوع الخدمة.' },
        { question: 'هل يمكن الحجز عبر الإنترنت؟', answer: 'نعم، يمكنك الحجز عبر الموقع أو التواصل عبر الواتساب.' },
        { question: 'ما الفرق بين الكوتشنج والسايكوسوماتيك؟', answer: 'الكوتشنج يركز على الأهداف بينما السايكوسوماتيك يركز على العلاقة بين العقل والجسد.' },
        { question: 'هل هناك جلسات تجريبية؟', answer: 'نعم، يمكنك حجز جلسة استشارية مجانية 30 دقيقة.' }
    ]
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    loadPricingCards();
    loadTestimonials();
    loadFAQ();
    setupNavigation();
    setupContactForm();
});

// Load Pricing Cards
function loadPricingCards() {
    const container = document.getElementById('pricingContainer');
    if (!container) return;

    container.innerHTML = appData.pricing.map(item => `
        <div class="pricing-card">
            <h3 class="pricing-title">${item.title}</h3>
            <p class="pricing-duration"><i class="fas fa-clock"></i> ${item.duration}</p>
            <p class="pricing-price">${item.price} ر.س</p>
            <p class="pricing-description">${item.description}</p>
            <a href="booking.html" class="btn btn-primary" style="width: 100%; justify-content: center;">احجز الآن</a>
        </div>
    `).join('');
}

// Load Testimonials
function loadTestimonials() {
    const container = document.getElementById('testimonialsContainer');
    if (!container) return;

    container.innerHTML = appData.testimonials.map(item => `
        <div class="testimonial-card">
            <p class="testimonial-text">"${item.text}"</p>
            <div class="testimonial-author">${item.author}</div>
            <div class="testimonial-rating">${'⭐'.repeat(item.rating)}</div>
        </div>
    `).join('');
}

// Load FAQ
function loadFAQ() {
    const container = document.getElementById('faqContainer');
    if (!container) return;

    container.innerHTML = appData.faqs.map((item, index) => `
        <div class="faq-item" data-faq="${index}">
            <div class="faq-question">
                <span>${item.question}</span>
                <i class="fas fa-chevron-down faq-icon"></i>
            </div>
            <div class="faq-answer">${item.answer}</div>
        </div>
    `).join('');

    // Setup FAQ toggle
    document.querySelectorAll('.faq-item').forEach(item => {
        item.querySelector('.faq-question').addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });
}

// Navigation Setup
function setupNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Close menu on link click
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Navbar shadow on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 0) {
            navbar.style.boxShadow = 'var(--shadow-lg)';
        } else {
            navbar.style.boxShadow = 'var(--shadow)';
        }
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

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
