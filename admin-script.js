// Admin Authentication Check
document.addEventListener('DOMContentLoaded', () => {
    if (!isAuthenticated()) {
        promptPassword();
    }
    
    setupAdminDashboard();
    loadBookings();
    loadTestimonials();
    loadSettings();
});

// Simple Authentication
function isAuthenticated() {
    return sessionStorage.getItem('adminAuth') === 'true';
}

function promptPassword() {
    const password = prompt('أدخل كلمة المرور:');
    if (password === 'sara2024') {
        sessionStorage.setItem('adminAuth', 'true');
    } else {
        alert('كلمة المرور غير صحيحة');
        window.location.href = 'index.html';
    }
}

// Setup Dashboard Navigation
function setupAdminDashboard() {
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
            
            btn.classList.add('active');
            const section = document.getElementById(btn.dataset.section);
            if (section) section.classList.add('active');
        });
    });
    
    document.getElementById('logoutBtn').addEventListener('click', () => {
        sessionStorage.removeItem('adminAuth');
        window.location.href = 'index.html';
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
            <td><span class="status-badge">${booking.status}</span></td>
            <td>
                <button class="status-btn" onclick="updateBookingStatus('${booking.id}')">تأكيد</button>
                <button class="delete-btn" onclick="deleteBooking('${booking.id}')">حذف</button>
            </td>
        </tr>
    `).join('');
    
    updateDashboardStats(bookings);
}

// Load Testimonials
function loadTestimonials() {
    const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [
        { id: 1, author: 'فاطمة أحمد', text: 'سارة غيّرت حياتي بشكل جذري', rating: 5 },
        { id: 2, author: 'ليلى محمد', text: 'خدمات احترافية وفعّالة', rating: 5 }
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
                <button class="btn-delete" onclick="deleteTestimonial(${testimonial.id})">حذف</button>
            </div>
        </div>
    `).join('');
}

// Load Settings
function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('adminSettings')) || {
        whatsapp: '+966544123456',
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
    
    const recentBookingsTable = document.querySelector('#recentBookingsTable tbody');
    const recent = bookings.slice(-5).reverse();
    recentBookingsTable.innerHTML = recent.map(booking => `
        <tr>
            <td>${booking.fullName}</td>
            <td>${booking.sessionType}</td>
            <td>${booking.preferredDate}</td>
            <td>${booking.status}</td>
        </tr>
    `).join('');
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
    
    if (!author || !text) {
        alert('الرجاء ملء جميع الحقول');
        return;
    }
    
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
function deleteTestimonial(id) {
    if (confirm('هل أنت متأكد من حذف هذا الرأي؟')) {
        let testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
        testimonials = testimonials.filter(t => t.id !== id);
        localStorage.setItem('testimonials', JSON.stringify(testimonials));
        loadTestimonials();
    }
}

function deleteBooking(id) {
    if (confirm('هل أنت متأكد من حذف هذا الحجز؟')) {
        let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        bookings = bookings.filter(b => b.id !== id);
        localStorage.setItem('bookings', JSON.stringify(bookings));
        loadBookings();
    }
}

function updateBookingStatus(id) {
    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const booking = bookings.find(b => b.id == id);
    if (booking) {
        booking.status = 'confirmed';
        localStorage.setItem('bookings', JSON.stringify(bookings));
        loadBookings();
        alert('تم تأكيد الحجز!');
    }
}
