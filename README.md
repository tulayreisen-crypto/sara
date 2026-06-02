# Sara Coach 777 - Professional Coaching Website

## Overview
A modern, professional coaching website for Sara Coach 777 with bilingual support (English/Arabic), mobile-friendly design, and an integrated admin panel.

## Features

### 🌟 Core Features
- **Hero Section**: Eye-catching welcome section with coach's photo and call-to-action
- **About Me Page**: Professional biography and coaching philosophy
- **Services**: Display of different coaching services with pricing
- **Online Booking**: Integrated calendar system for appointment scheduling
- **Social Links**: YouTube, Instagram, and TikTok integration
- **WhatsApp Integration**: Direct contact button for WhatsApp messaging
- **Language Support**: Full Arabic and English language support
- **Mobile Responsive**: Fully optimized for mobile devices
- **Admin Panel**: Simple content management system

### 📱 Admin Panel Features
- **Edit Content**: Update main page text and hero section
- **Manage Services**: Edit service titles and descriptions
- **Social Links**: Update social media URLs and WhatsApp number
- **Local Storage**: All changes are saved to browser's local storage

## File Structure
```
sara/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
├── sara-coach.jpg      # Coach's profile photo (to be added)
└── README.md          # Documentation
```

## Getting Started

### Prerequisites
- A web browser (Chrome, Firefox, Safari, Edge)
- A text editor for customization
- Optional: Node.js for local server (development)

### Installation

1. Clone or download the repository
2. Add Sara's photo as `sara-coach.jpg` in the root directory
3. Open `index.html` in your browser
4. Update the Calendly link in `index.html` (line with iframe)
5. Click the Admin button to customize content

### Customization

#### Update Calendly Calendar
Replace the iframe URL in `index.html` (around line 101):
```html
<iframe src="https://calendly.com/your-calendly-link/30min" ...></iframe>
```

#### Update WhatsApp Number
1. Click the Admin button (bottom right)
2. Go to "Social Links" tab
3. Enter your WhatsApp number with country code (e.g., +1234567890)
4. Click "Save Links"

#### Customize Services
1. Click the Admin button
2. Go to "Edit Services" tab
3. Update service titles and descriptions
4. Click "Save Services"

#### Edit Main Content
1. Click the Admin button
2. Go to "Edit Content" tab
3. Update about text and hero section
4. Click "Save Changes"

## Language Support

### Automatic Language Detection
- Click the language button in the top navigation (العربية / English)
- The website switches between Arabic and English
- All content is automatically translated
- Layout direction changes for RTL (Arabic) and LTR (English)

### Adding More Languages
Edit the `translations` object in `script.js`:
```javascript
const translations = {
    en: { /* English translations */ },
    ar: { /* Arabic translations */ },
    // Add new language here
    es: { /* Spanish translations */ }
};
```

## Mobile Responsive Design

### Breakpoints
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

### Features
- Hamburger menu on mobile
- Responsive grid layouts
- Touch-friendly buttons
- Optimized images
- Full functionality on all screen sizes

## Data Storage

The website uses browser's **localStorage** to save:
- Content changes (about text, hero section)
- Service information
- Social media links
- Language preference

### Clear Data
To reset all data, open browser DevTools (F12) and run:
```javascript
localStorage.clear();
```

## Color Scheme

- **Primary Color**: #d4a574 (Gold)
- **Secondary Color**: #2c3e50 (Dark Blue)
- **Accent Color**: #e74c3c (Red)
- **Background**: #f8f9fa (Light Gray)

### Customize Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #d4a574;
    --secondary-color: #2c3e50;
    --accent-color: #e74c3c;
    /* ... other colors ... */
}
```

## Browser Compatibility

✅ **Supported Browsers**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## SEO Optimization

### Meta Tags (to customize)
Edit the `<head>` section in `index.html`:
```html
<meta name="description" content="Your coaching description">
<meta name="keywords" content="coaching, life coaching, career coaching">
```

## Performance

- **Lightweight**: No heavy frameworks
- **Fast Loading**: Pure CSS and vanilla JavaScript
- **Optimized Images**: Recommended to optimize coach's photo
- **Mobile First**: Responsive design approach

## Security Notes

⚠️ **Important**: 
- The Admin panel has no authentication - it's for local use only
- For production, implement proper authentication
- Never commit sensitive data to version control

## Deployment

### Deploy to GitHub Pages
1. Push files to a GitHub repository
2. Go to repository Settings → Pages
3. Select main branch as source
4. Your site will be available at: `https://username.github.io/repo-name`

### Deploy to Other Hosts
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your GitHub repository
- **Traditional Hosting**: Upload files via FTP

## Troubleshooting

### Photo not showing
- Ensure `sara-coach.jpg` is in the same directory as `index.html`
- Check file name capitalization
- Use absolute URL if needed

### Admin panel not working
- Clear browser cache (Ctrl+Shift+Del)
- Check browser console for errors (F12)
- Ensure JavaScript is enabled

### Calendly not showing
- Update the Calendly URL with your actual account
- Check if Calendly account is active
- Allow popups for the domain

## Support & Maintenance

For updates and improvements:
1. Test changes locally first
2. Backup before major changes
3. Use browser DevTools to debug
4. Keep content updated regularly

## License

This website template is provided as-is for Sara Coach 777.

## Contact

For technical support with the website, contact the web developer or refer to the code comments for implementation details.

---

**Last Updated**: 2024
**Version**: 1.0
