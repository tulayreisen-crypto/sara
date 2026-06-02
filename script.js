// Language translations
const translations = {
    en: {
        home: 'Home',
        about: 'About Me',
        services: 'Services',
        booking: 'Booking',
        heroTitle: 'Welcome to Sara Coach 777',
        heroSubtitle: 'Transform Your Life Through Professional Coaching',
        bookSession: 'Book Your Session',
        aboutText: 'I am a certified professional coach with 10+ years of experience helping individuals achieve their personal and professional goals. My approach combines evidence-based coaching techniques with a deep understanding of human psychology.',
        aboutText2: 'I specialize in life coaching, career development, and personal transformation. My mission is to empower you to unlock your full potential and create meaningful change in your life.',
        service1Title: 'Life Coaching',
        service1Desc: 'Achieve your life goals and create lasting positive change',
        service2Title: 'Career Coaching',
        service2Desc: 'Advance your career and find professional fulfillment',
        service3Title: 'Personal Development',
        service3Desc: 'Build confidence and develop your personal potential',
        service4Title: 'Group Workshops',
        service4Desc: 'Interactive sessions for teams and organizations',
        bookingTitle: 'Book Your Session',
        sessionInfo: 'Session Information',
        info1: '✓ 30-minute discovery session',
        info2: '✓ Flexible scheduling',
        info3: '✓ Online or in-person options',
        info4: '✓ Money-back guarantee',
        followTitle: 'Follow Me'
    },
    ar: {
        home: 'الرئيسية',
        about: 'عني',
        services: 'الخدمات',
        booking: 'الحجز',
        heroTitle: 'مرحبا بك في سارة كوتش 777',
        heroSubtitle: 'حول حياتك من خلال التدريب المهني',
        bookSession: 'احجز جلستك',
        aboutText: 'أنا مدربة محترفة معتمدة بخبرة تزيد عن 10 سنوات في مساعدة الأفراد على تحقيق أهدافهم الشخصية والمهنية. يجمع منهجي بين تقنيات التدريب القائمة على الأدلة وفهم عميق لعلم النفس البشري.',
        aboutText2: 'أتخصص في تدريب الحياة والتطوير الوظيفي والتحول الشخصي. مهمتي هي تمكينك لفتح كامل إمكاناتك وإحداث تغيير ذي مغزى في حياتك.',
        service1Title: 'تدريب الحياة',
        service1Desc: 'تحقيق أهدافك في الحياة وإحداث تغيير إيجابي دائم',
        service2Title: 'التدريب الوظيفي',
        service2Desc: 'تقدم في حياتك الوظيفية وجد الرضا المهني',
        service3Title: 'التطوير الشخصي',
        service3Desc: 'بناء الثقة بالنفس وتطوير إمكانياتك الشخصية',
        service4Title: 'ورش عمل جماعية',
        service4Desc: 'جلسات تفاعلية للفريق والمؤسسات',
        bookingTitle: 'احجز جلستك',
        sessionInfo: 'معلومات الجلسة',
        info1: '✓ جلسة اكتشاف لمدة 30 دقيقة',
        info2: '✓ جدولة مرنة',
        info3: '✓ خيارات عبر الإنترنت أو وجهاً لوجه',
        info4: '✓ ضمان استرجاع الأموال',
        followTitle: 'تابعني'
    }
};

let currentLanguage = 'en';
let contentData = {
    whatsappNumber: '+1234567890',
    youtubeUrl: 'https://www.youtube.com',
    instagramUrl: 'https://www.instagram.com',
    tiktokUrl: 'https://www.tiktok.com'
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadContent();
    setupEventListeners();
    loadSocialLinks();
});

function setupEventListeners() {
    // Language toggle
    document.getElementById('langToggle').addEventListener('click', toggleLanguage);
    
    // Mobile menu toggle
    document.getElementById('navToggle').addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when link is clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('navMenu').classList.remove('active');
        });
    });
}

function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'ar' : 'en';
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    updatePageLanguage();
    localStorage.setItem('language', currentLanguage);
}

function updatePageLanguage() {
    const t = translations[currentLanguage];
    
    // Update navigation
    document.querySelectorAll('.nav-menu a').forEach((link, index) => {
        const keys = ['home', 'about', 'services', 'booking'];
        if (index < 4) link.textContent = t[keys[index]];
    });
    
    document.getElementById('langToggle').textContent = currentLanguage === 'en' ? 'العربية' : 'English';
    
    // Update hero section
    document.querySelector('.hero-text h1').textContent = t.heroTitle;
    document.querySelector('.hero-text p').textContent = t.heroSubtitle;
    document.querySelector('.cta-btn').textContent = t.bookSession;
    
    // Update section titles
    document.querySelectorAll('section h2').forEach((h2, index) => {
        const titles = ['about', 'services', 'bookingTitle', 'followTitle'];
        if (titles[index]) h2.textContent = t[titles[index]];
    });
    
    // Update about text
    const aboutTexts = document.querySelectorAll('#aboutText, #aboutText2');
    if (aboutTexts[0]) aboutTexts[0].textContent = t.aboutText;
    if (aboutTexts[1]) aboutTexts[1].textContent = t.aboutText2;
    
    // Update service cards
    const serviceTitle = ['service1Title', 'service2Title', 'service3Title', 'service4Title'];
    const serviceDesc = ['service1Desc', 'service2Desc', 'service3Desc', 'service4Desc'];
    
    document.querySelectorAll('.service-card').forEach((card, index) => {
        if (serviceTitle[index]) {
            card.querySelector('h3').textContent = t[serviceTitle[index]];
        }
        if (serviceDesc[index]) {
            card.querySelector('p').textContent = t[serviceDesc[index]];
        }
    });
    
    // Update booking section
    document.getElementById('sessionInfo').textContent = t.sessionInfo;
    document.querySelectorAll('.booking-info li').forEach((li, index) => {
        const infoKeys = ['info1', 'info2', 'info3', 'info4'];
        if (infoKeys[index]) li.textContent = t[infoKeys[index]];
    });
}

function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}

function openAdminPanel() {
    const modal = document.getElementById('adminModal');
    modal.style.display = 'block';
    loadAdminData();
}

function closeAdminPanel() {
    document.getElementById('adminModal').style.display = 'none';
}

function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

function loadAdminData() {
    const aboutText = document.querySelector('#aboutText');
    document.getElementById('aboutInput').value = aboutText.textContent;
    document.getElementById('heroTitleInput').value = document.querySelector('.hero-text h1').textContent;
    document.getElementById('heroSubtitleInput').value = document.querySelector('.hero-text p').textContent;
    
    // Load services
    document.getElementById('service1Input').value = document.getElementById('service1Title').textContent;
    document.getElementById('service2Input').value = document.getElementById('service2Title').textContent;
    document.getElementById('service3Input').value = document.getElementById('service3Title').textContent;
    document.getElementById('service4Input').value = document.getElementById('service4Title').textContent;
    
    // Load social links
    document.getElementById('youtubeInput').value = contentData.youtubeUrl;
    document.getElementById('instagramInput').value = contentData.instagramUrl;
    document.getElementById('tiktokInput').value = contentData.tiktokUrl;
    document.getElementById('whatsappInput').value = contentData.whatsappNumber;
}

function saveContent() {
    const aboutText = document.getElementById('aboutInput').value;
    const heroTitle = document.getElementById('heroTitleInput').value;
    const heroSubtitle = document.getElementById('heroSubtitleInput').value;
    
    document.querySelector('#aboutText').textContent = aboutText;
    document.querySelector('.hero-text h1').textContent = heroTitle;
    document.querySelector('.hero-text p').textContent = heroSubtitle;
    
    localStorage.setItem('contentData', JSON.stringify({
        aboutText,
        heroTitle,
        heroSubtitle
    }));
    
    alert('Content saved successfully!');
}

function saveServices() {
    const services = [
        document.getElementById('service1Input').value,
        document.getElementById('service2Input').value,
        document.getElementById('service3Input').value,
        document.getElementById('service4Input').value
    ];
    
    document.querySelectorAll('.service-card h3').forEach((h3, index) => {
        h3.textContent = services[index];
    });
    
    localStorage.setItem('servicesData', JSON.stringify(services));
    alert('Services updated successfully!');
}

function saveSocial() {
    contentData.youtubeUrl = document.getElementById('youtubeInput').value;
    contentData.instagramUrl = document.getElementById('instagramInput').value;
    contentData.tiktokUrl = document.getElementById('tiktokInput').value;
    contentData.whatsappNumber = document.getElementById('whatsappInput').value;
    
    // Update social links
    document.querySelector('.youtube').href = contentData.youtubeUrl;
    document.querySelector('.instagram').href = contentData.instagramUrl;
    document.querySelector('.tiktok').href = contentData.tiktokUrl;
    
    localStorage.setItem('socialData', JSON.stringify(contentData));
    alert('Social links updated successfully!');
}

function loadContent() {
    // Load from localStorage if available
    const savedContent = localStorage.getItem('contentData');
    if (savedContent) {
        const data = JSON.parse(savedContent);
        document.querySelector('#aboutText').textContent = data.aboutText;
        document.querySelector('.hero-text h1').textContent = data.heroTitle;
        document.querySelector('.hero-text p').textContent = data.heroSubtitle;
    }
    
    const savedServices = localStorage.getItem('servicesData');
    if (savedServices) {
        const services = JSON.parse(savedServices);
        document.querySelectorAll('.service-card h3').forEach((h3, index) => {
            h3.textContent = services[index];
        });
    }
}

function loadSocialLinks() {
    const savedSocial = localStorage.getItem('socialData');
    if (savedSocial) {
        contentData = JSON.parse(savedSocial);
        document.querySelector('.youtube').href = contentData.youtubeUrl;
        document.querySelector('.instagram').href = contentData.instagramUrl;
        document.querySelector('.tiktok').href = contentData.tiktokUrl;
    }
}

function openWhatsApp() {
    const number = contentData.whatsappNumber.replace(/[^0-9]/g, '');
    const message = encodeURIComponent('Hello Sara! I would like to book a coaching session.');
    window.open(`https://wa.me/${number}?text=${message}`, '_blank');
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('adminModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Load saved language preference
const savedLanguage = localStorage.getItem('language');
if (savedLanguage) {
    currentLanguage = savedLanguage;
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    updatePageLanguage();
}