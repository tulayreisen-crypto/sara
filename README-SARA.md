# Sara Al-Nassar Coaching Website

## Project Overview

A premium, modern coaching website for Sara Al-Nassar specializing in:
- 🎯 Coaching (الكوتشنج)
- 💫 Psychosomatics (السايكوسوماتيك)
- 🌙 Hypnotherapy (التنويم الإيحائي)
- 👨‍👩‍👧‍👦 Family & Marital Counseling (الاستشارات الأسرية والزوجية)

## File Structure

```
├── sara-index.html          # Main homepage
├── sara-styles.css          # Main stylesheet
├── sara-script.js           # Main script
├── booking.html             # Booking page
├── booking-styles.css       # Booking styles
├── booking-script.js        # Booking functionality
├── admin.html               # Admin dashboard
├── admin-styles.css         # Admin styles
├── admin-script.js          # Admin functionality
├── sara-photo.jpg           # Hero photo
├── sara-about.jpg           # About section photo
└── README-SARA.md           # This file
```

## Features

### Public Website (sara-index.html)

#### Hero Section
- Large background with Sara's photo
- Compelling headline: "رحلة تحول عميق نحو الشفاء والتوازن والوعي"
- Call-to-action buttons: "احجز جلستك الآن" and "تواصل عبر واتساب"

#### About Section
- Professional biography
- Key specializations highlighted
- Visual layout with photo

#### Services Section
1. **الكوتشنج** - Individual coaching sessions
2. **السايكوسوماتيك** - Mind-body connection therapy
3. **التنويم الإيحائي** - Hypnotherapy services
4. **الاستشارات الأسرية والزوجية** - Family & marital counseling

#### Pricing Section
- Modern card layout
- Service descriptions
- Clear pricing display
- "احجز الآن" button for each service

#### Testimonials Section
- Client reviews
- Star ratings
- Professional layout

#### FAQ Section
- Expandable accordion items
- Common questions answered
- Smooth animations

#### Contact Section
- Social media links:
  - WhatsApp
  - Instagram
  - TikTok
  - YouTube
- Contact form

### Booking System (booking.html)

Complete appointment booking form with:

**Personal Information**
- Full name
- Age
- Phone number
- Email
- Gender (dropdown)
- Preferred contact method (WhatsApp, Phone, Email)

**Session Details**
- Service type (5 options)
- Preferred date
- Preferred time (9 time slots)

**Additional Information**
- Notes section for client needs

**Features**
- Form validation
- Success message
- Data storage in localStorage
- Responsive design

### Admin Dashboard (admin.html)

**Authentication**: Password protected (default: 1234)

**Dashboard Section**
- Total bookings count
- Upcoming bookings
- Total reviews
- Recent bookings table

**Bookings Management**
- View all bookings
- Filter by date
- Filter by status
- Update booking status
- Delete bookings
- Email notifications

**Services Management**
- Add new service
- Edit service details
- Change prices
- Delete services

**Testimonials Management**
- Add new testimonial
- Edit existing testimonials
- Delete testimonials
- Manage ratings

**Settings**
- WhatsApp number
- Social media links (Instagram, TikTok, YouTube)
- Notification email
- Photo management (placeholder for upload)

## Design Features

### Color Scheme
- Primary: Dark Burgundy (#8b4953)
- Secondary: Rose Brown (#c4a796)
- Accent: Rose Gold (#d4af7a)
- Background: Cream/Beige (#f5f1ed)
- Text: Dark Gray (#2a2a2a)

### Typography
- Modern, professional fonts
- RTL support for Arabic
- Responsive text sizing

### Responsive Design
- Mobile-first approach
- Tablet optimization
- Desktop enhancement
- Breakpoints: 480px, 768px

### User Experience
- Smooth scrolling
- Hover effects
- Transition animations
- Clear navigation
- Accessible forms

## Technical Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with gradients and animations
- **JavaScript (Vanilla)**: No frameworks, pure JS
- **LocalStorage**: Client-side data persistence
- **Responsive Design**: Mobile-first, CSS Grid, Flexbox

## Setup Instructions

### 1. Basic Setup
1. Download all files
2. Add Sara's photos:
   - `sara-photo.jpg` (Hero section photo)
   - `sara-about.jpg` (About section photo)
3. Open `sara-index.html` in browser

### 2. Customize Contact Information
- Edit WhatsApp number in `sara-index.html`
- Update social media links
- Change email address

### 3. Update Services & Pricing
- Go to Admin Dashboard (admin.html)
- Login with password: 1234
- Add/edit services and pricing
- Data is stored in browser's localStorage

### 4. Admin Dashboard Setup
- Access at `/admin.html`
- Default password: 1234 (change in admin-script.js)
- Manage all bookings and content

## Data Management

### LocalStorage Keys
- `bookings`: Array of all booking submissions
- `services`: Array of service offerings
- `testimonials`: Array of client reviews
- `adminSettings`: Admin configuration

### Exporting Data
To export bookings data for email/spreadsheet:
```javascript
// In browser console:
const bookings = JSON.parse(localStorage.getItem('bookings'));
console.table(bookings);
```

## Customization Guide

### Change Colors
Edit CSS variables in `sara-styles.css`:
```css
:root {
    --primary-color: #8b4953;      /* Main color */
    --secondary-color: #c4a796;    /* Secondary color */
    --accent-color: #d4af7a;       /* Accent/Gold */
    /* ... other colors ... */
}
```

### Add New Service
1. Go to Admin Dashboard
2. Click "إضافة خدمة جديدة"
3. Fill in service details
4. Click "حفظ"

### Add Testimonial
1. Go to Admin Dashboard → Testimonials
2. Click "إضافة رأي جديد"
3. Enter client name and review
4. Select rating
5. Click "حفظ"

### Change Admin Password
Edit `admin-script.js` line 14:
```javascript
if (password === '1234') {  // Change '1234' to new password
```

## SEO Optimization

### Keywords
- كوتشنج
- تنويم إيحائي
- سايكوسوماتيك
- تطوير الذات
- الاستشارات الأسرية
- العلاج التكاملي

### Meta Tags
Update in `sara-index.html`:
```html
<meta name="description" content="...">
<meta name="keywords" content="...">
```

## Deployment

### GitHub Pages
1. Upload files to GitHub repository
2. Enable Pages in repository settings
3. Select branch to deploy
4. Site will be live at: `https://username.github.io/repo-name`

### Custom Hosting
1. Upload all files to web server
2. Ensure .html files are accessible
3. No server-side code needed
4. All functionality works client-side

## Browser Support
✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+
✅ Mobile browsers

## Security Notes

⚠️ **Important**
- Admin password stored in code (not secure for production)
- For production, implement server-side authentication
- Use HTTPS for hosting
- Consider backend for sensitive data
- Don't store passwords in client-side code

## Email Notifications (Future Implementation)

To add email notifications for bookings:
1. Use a service like Formspree, EmailJS, or SendGrid
2. Or integrate with backend service
3. Update booking submission handler in `booking-script.js`

## Troubleshooting

**Data not saving?**
- Check browser's localStorage is enabled
- Clear cache if having issues
- Check browser console for errors

**Photos not showing?**
- Ensure image files are in same directory
- Check file names match HTML
- Verify file formats (jpg/png)

**Booking form not working?**
- Check all required fields filled
- Verify JavaScript is enabled
- Check browser console for errors

## Future Enhancements

- [ ] Email confirmation for bookings
- [ ] Online payment integration
- [ ] Video consultation feature
- [ ] Multi-language support (English, German)
- [ ] Calendar integration
- [ ] Client portal
- [ ] Progress tracking
- [ ] File upload for consultations
- [ ] SMS notifications
- [ ] Analytics dashboard

## License

This website is built for Sara Al-Nassar. All rights reserved.

## Support

For technical support, contact the development team.

---

**Version**: 1.0
**Last Updated**: 2024
**Language**: Arabic (RTL) with future multilingual support
