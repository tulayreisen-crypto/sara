// Booking Form Handler
document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(bookingForm);
            const bookingData = {
                id: Date.now(),
                fullName: formData.get('fullName'),
                age: formData.get('age'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                gender: formData.get('gender'),
                preferredContact: formData.get('preferredContact'),
                sessionType: formData.get('sessionType'),
                preferredDate: formData.get('preferredDate'),
                preferredTime: formData.get('preferredTime'),
                notes: formData.get('notes'),
                status: 'pending',
                submittedAt: new Date().toISOString()
            };
            
            let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
            bookings.push(bookingData);
            localStorage.setItem('bookings', JSON.stringify(bookings));
            
            document.getElementById('bookingForm').parentElement.style.display = 'none';
            document.getElementById('successMessage').style.display = 'flex';
        });
    }
});
