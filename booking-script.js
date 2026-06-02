// Booking Form Handler
document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(bookingForm);
            const bookingData = {
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
                submittedAt: new Date().toISOString()
            };
            
            // Save to localStorage
            let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
            bookings.push(bookingData);
            localStorage.setItem('bookings', JSON.stringify(bookings));
            
            // Show success message
            document.getElementById('bookingForm').parentElement.style.display = 'none';
            document.getElementById('successMessage').style.display = 'flex';
            
            // Log to console (in production, send to server)
            console.log('Booking submitted:', bookingData);
        });
    }
});
