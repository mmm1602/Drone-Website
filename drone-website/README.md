# DroneX - Professional Aerial Cinematography Website

A modern, responsive website for a drone cinematography business built with HTML, Tailwind CSS, and JavaScript.

## Features

- **Modern Design**: Clean, professional layout with gradient-based aesthetics
- **Responsive**: Fully responsive design that works on all device sizes
- **Interactive Elements**: 
  - Animated navigation
  - Portfolio filtering system
  - Video modal playback
  - Contact form with validation
  - Smooth scrolling and transitions

## Pages

1. **Home (index.html)**
   - Hero section with call-to-action
   - Features overview
   - Recent projects showcase
   - Call-to-action section

2. **About (about.html)**
   - Company story
   - Team member profiles
   - Equipment showcase
   - Professional excellence highlights

3. **Portfolio (portfolio.html)**
   - Filterable project grid
   - Category-based filtering (Real Estate, Events, Commercial)
   - Video modal for project details
   - Interactive hover effects

4. **Contact (contact.html)**
   - Contact form with validation
   - Business information
   - Office location
   - Business hours

## Technology Stack

- HTML5
- Tailwind CSS (via CDN)
- JavaScript (Vanilla)
- Google Fonts
- Font Awesome Icons

## Project Structure

```
drone-website/
├── index.html
├── about.html
├── portfolio.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── assets/
    ├── images/
    │   └── placeholder.txt
    └── videos/
        └── placeholder.txt
```

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd drone-website
   ```

2. Start a local server:
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   ```

3. Open in browser:
   - Visit `http://localhost:8000/drone-website`

## Production Deployment Notes

1. Replace placeholder gradients with actual high-quality images:
   - Hero section backgrounds
   - Portfolio project thumbnails
   - Team member photos
   - Equipment photos

2. Replace placeholder videos with actual drone footage:
   - Portfolio project videos
   - Background videos (if used)

3. Replace Tailwind CDN with a production build:
   - Install Tailwind CSS as a PostCSS plugin
   - Configure and build for production
   - Remove CDN link and use compiled CSS

4. Configure form submission:
   - Set up backend API endpoint
   - Add proper form handling
   - Implement email notifications

5. Add proper meta tags and SEO optimization:
   - Meta descriptions
   - Open Graph tags
   - Twitter cards
   - Sitemap
   - robots.txt

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Tailwind CSS for the utility-first CSS framework
- Font Awesome for the icon set
- Google Fonts for the typography