// Admin Authentication Check
document.addEventListener('DOMContentLoaded', () => {
    if (!isAuthenticated()) {
        promptPassword();
    }
    
    setupAdminDashboard();
    loadBookings();
    loadServices();
    loadTestimonials();
    loadSettings();
});

// Simple Authentication
function isAuthenticated() {
    return sessionStorage.getItem('adminAuth') === 'true';
}

function promptPassword() {
    const password = prompt('أدخل كلمة المرور:');
    // Simple password check (in production, use proper backend authentication)
    if (password === '1234') {
        sessionStorage.setItem('adminAuth', 'true');
    } else {
        alert('كلمة المرور غير صحيحة');
        window.location.href = 'sara-index.html';
    }
}

// Setup Dashboard Navigation
function setupAdminDashboard() {
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all items
            document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked item
            btn.classList.add('active');
            const section = document.getElementById(btn.dataset.section);
            if (section) section.classList.add('active');
        });
    });
    
    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', () => {
        sessionStorage.removeItem('adminAuth');
        window.location.href = 'sara-index.html';
    });
}

// Load Bookings
function loadBookings() {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const tbody = document.getElementById('bookingsTableBody');
    
    if (!tbody) return;
    
    if (bookings.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: #999;">لا توجد حجوزات</td></tr>';
        return;
    }
    
    tbody.innerHTML = bookings.map(booking => `
        <tr>
            <td>${booking.fullName}</td>
            <td>${booking.phone}</td>
            <td>${booking.sessionType}</td>
            <td>${booking.preferredDate}</td>
            <td>${booking.preferredTime}</td>
            <td><span class="status-badge">جديد</span></td>
            <td>
                <button class="status-btn" onclick="updateBookingStatus()">تأكيد</button>
                <button class="delete-btn" onclick="deleteBooking('${booking.email}')">حذف</button>
            </td>
        </tr>
    `).join('');
    
    // Update stats
    updateDashboardStats(bookings);
}

// Load Services
function loadServices() {
    const services = JSON.parse(localStorage.getItem('services')) || [
        { id: 1, name: 'الكوتشنج', description: 'جلسات فردية', duration: '60 دقيقة', price: 300 },
        { id: 2, name: 'السايكوسوماتيك', description: 'العلاقة بين العقل والجسد', duration: '90 دقيقة', price: 450 },
        { id: 3, name: 'التنويم الإيحائي', description: 'تنويم إيحائي علاجي', duration: '90 دقيقة', price: 450 }
    ];
    
    localStorage.setItem('services', JSON.stringify(services));
    
    const list = document.getElementById('servicesList');
    if (!list) return;
    
    list.innerHTML = services.map(service => `
        <div class="service-item">
            <h3>${service.name}</h3>
            <p>${service.description}</p>
            <p>المدة: ${service.duration} | السعر: ${service.price} ر.س</p>
            <div class="service-item-actions">
                <button class="btn-edit" onclick="editService(${service.id})">تعديل</button>
                <button class="btn-delete" onclick="deleteService(${service.id})">حذف</button>
            </div>
        </div>
    `).join('');
}

// Load Testimonials
function loadTestimonials() {
    const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [
        { id: 1, author: 'فاطمة أحمد', text: 'سارة غيّرت حياتي', rating: 5 },
        { id: 2, author: 'ليلى محمد', text: 'خدمات احترافية', rating: 5 }
    ];
    
    localStorage.setItem('testimonials', JSON.stringify(testimonials));
    
    const list = document.getElementById('testimonialsList');
    if (!list) return;
    
    list.innerHTML = testimonials.map(testimonial => `
        <div class="testimonial-item">
            <h3>${testimonial.author}</h3>
            <p>"${testimonial.text}"</p>
            <p>التقييم: ${'⭐'.repeat(testimonial.rating)}</p>
            <div class="testimonial-item-actions">
                <button class="btn-edit">تعديل</button>
                <button class="btn-delete" onclick="deleteTestimonial(${testimonial.id})">حذف</button>
            </div>
        </div>
    `).join('');
}

// Load Settings
function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('adminSettings')) || {
        whatsapp: '+966xxxxxxxxx',
        instagram: 'https://instagram.com',
        tiktok: 'https://tiktok.com',
        youtube: 'https://youtube.com',
        email: 'sara@example.com'
    };
    
    document.getElementById('whatsappNumber').value = settings.whatsapp;
    document.getElementById('instagramLink').value = settings.instagram;
    document.getElementById('tiktokLink').value = settings.tiktok;
    document.getElementById('youtubeLink').value = settings.youtube;
    document.getElementById('notificationEmail').value = settings.email;
}

// Update Dashboard Stats
function updateDashboardStats(bookings) {
    document.getElementById('totalBookings').textContent = bookings.length;
    document.getElementById('upcomingBookings').textContent = bookings.filter(b => new Date(b.preferredDate) > new Date()).length;
    document.getElementById('totalReviews').textContent = (JSON.parse(localStorage.getItem('testimonials')) || []).length;
}

// Service Modal
function openServiceModal() {
    document.getElementById('serviceModal').style.display = 'flex';
}

function closeServiceModal() {
    document.getElementById('serviceModal').style.display = 'none';
}

function saveService() {
    const name = document.getElementById('serviceName').value;
    const description = document.getElementById('serviceDescription').value;
    const duration = document.getElementById('serviceDuration').value;
    const price = document.getElementById('servicePrice').value;
    
    let services = JSON.parse(localStorage.getItem('services')) || [];
    services.push({ id: Date.now(), name, description, duration, price });
    localStorage.setItem('services', JSON.stringify(services));
    
    loadServices();
    closeServiceModal();
    alert('تم إضافة الخدمة بنجاح!');
}

// Testimonial Modal
function openTestimonialModal() {
    document.getElementById('testimonialModal').style.display = 'flex';
}

function closeTestimonialModal() {
    document.getElementById('testimonialModal').style.display = 'none';
}

function saveTestimonial() {
    const author = document.getElementById('testimonialAuthor').value;
    const text = document.getElementById('testimonialText').value;
    const rating = parseInt(document.getElementById('testimonialRating').value);
    
    let testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
    testimonials.push({ id: Date.now(), author, text, rating });
    localStorage.setItem('testimonials', JSON.stringify(testimonials));
    
    loadTestimonials();
    closeTestimonialModal();
    alert('تم إضافة الرأي بنجاح!');
}

// Save Settings
function saveSettings() {
    const settings = {
        whatsapp: document.getElementById('whatsappNumber').value,
        instagram: document.getElementById('instagramLink').value,
        tiktok: document.getElementById('tiktokLink').value,
        youtube: document.getElementById('youtubeLink').value,
        email: document.getElementById('notificationEmail').value
    };
    
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    alert('تم حفظ الإعدادات بنجاح!');
}

// Delete Functions
function deleteService(id) {
    if (confirm('هل أنت متأكد من حذف هذه الخدمة؟')) {
        let services = JSON.parse(localStorage.getItem('services')) || [];
        services = services.filter(s => s.id !== id);
        localStorage.setItem('services', JSON.stringify(services));
        loadServices();
    }
}

function deleteTestimonial(id) {
    if (confirm('هل أنت متأكد من حذف هذا الرأي؟')) {
        let testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
        testimonials = testimonials.filter(t => t.id !== id);
        localStorage.setItem('testimonials', JSON.stringify(testimonials));
        loadTestimonials();
    }
}

function deleteBooking(email) {
    if (confirm('هل أنت متأكد من حذف هذا الحجز؟')) {
        let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        bookings = bookings.filter(b => b.email !== email);
        localStorage.setItem('bookings', JSON.stringify(bookings));
        loadBookings();
    }
}

function updateBookingStatus() {
    alert('تم تحديث حالة الحجز!');
}
