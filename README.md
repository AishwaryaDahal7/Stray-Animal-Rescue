# Stray Animal Rescue Connect

A responsive, zero-cost web application to help report and rescue stray, injured, sick, and abused animals while connecting communities with professional rescue centers.

## 🎯 Project Overview

**Stray Animal Rescue Connect** is a community-driven initiative designed to:

- **Enable Quick Reporting**: Allow the public to instantly report animal emergencies with location details
- **Connect with Rescue Centers**: Provide an easy-to-access directory of rescue organizations and their services
- **Streamline Operations**: Give rescue teams a dashboard to manage and track rescue reports
- **Build Community**: Foster collaboration between concerned citizens and professional rescue organizations

This project is built for the **zero-cost** requirement using free services and open-source technologies.

## ✨ Features

### 1. **Home Page**
- Attractive hero section with mission statement
- Quick action buttons (Report Emergency, Find Rescue Centers)
- "How It Works" section explaining the system
- Mission and value propositions

### 2. **Report Animal Page**
- Multi-field form for reporting (animal type, problem type, description)
- **Browser Geolocation**: Auto-detect reporter's current location
- Manual location input as fallback
- Reporter information (name, phone, email)
- Form validation and error handling
- Success message with nearby rescue centers list after submission

### 3. **Rescue Center Directory**
- List view with filtering (city, services)
- Search functionality
- **Interactive Map**: Leaflet + OpenStreetMap showing all rescue centers
- Detailed center information (address, phone, email, hours, services, emergency availability)
- Communication buttons:
  - 📞 Call Now (tel: link)
  - ✉️ Email (mailto: link)
  - 💬 WhatsApp (WhatsApp link)

### 4. **Interactive Map**
- Powered by **Leaflet.js** and **OpenStreetMap** (100% free, no API keys required)
- Rescue center markers with popup details
- User location marker
- Nearby center detection using distance calculation (Haversine formula)
- Zoom to fit all markers

### 5. **Rescue Team Dashboard**
- Simple email/password login (demo credentials provided)
- View all rescue reports with status filtering (Pending, In Progress, Rescued, Closed)
- Search reports by reporter name or animal type
- Edit report status in detail modal
- View full reporter contact information
- Dashboard statistics (total reports, pending, in-progress, rescued)

### 6. **About Page**
- Mission and vision statements
- How the system works for public users and rescue teams
- Core values
- Problem statement and solutions

### 7. **Contact Page**
- Contact form (name, email, subject, message)
- Emergency hotline information
- Multiple contact methods
- FAQ section

### 8. **Navigation & Layout**
- Responsive navbar with mobile menu
- Footer with social media links
- Mobile-first responsive design
- Tailwind CSS styling with custom animal-friendly color palette

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework for styling
- **React Router** - Client-side routing
- **Leaflet.js** - Interactive maps
- **OpenStreetMap** - Free map tiles (no API keys needed)
- **Lucide React** - Beautiful SVG icons
- **React Toastify** - Toast notifications

### Backend/Storage (MVP)
- **localStorage** - Mock data storage for development
- **Ready for Firebase integration** - Code structure supports easy migration to Firebase Firestore + Authentication

### Deployment
- **Vercel** - Free hosting with automatic CI/CD from GitHub
- **GitHub** - Version control and repository hosting

### Development Tools
- **npm** - Package manager
- **PostCSS & Autoprefixer** - CSS processing

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm (comes with Node.js)
- Git

### Step 1: Clone the Repository
```bash
git clone https://github.com/AishwaryaDahal7/Stray-Animal-Rescue.git
cd Stray-Animal-Rescue
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- React and React DOM
- React Router DOM (navigation)
- Tailwind CSS (styling)
- Leaflet and React Leaflet (maps)
- Firebase (if backend is configured later)
- Lucide React (icons)
- React Toastify (notifications)

### Step 3: Run Development Server
```bash
npm run dev
```

The application will start on `http://localhost:5173/`

The dev server automatically opens in your browser and supports Hot Module Replacement (HMR) for instant updates as you edit code.

### Step 4: Build for Production
```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Step 5: Preview Production Build
```bash
npm run preview
```

## 📋 Project Structure

```
stray-animal-rescue/
├── src/
│   ├── components/
│   │   ├── Layout.jsx          # Main layout wrapper
│   │   ├── NavBar.jsx          # Navigation bar with mobile menu
│   │   ├── Footer.jsx          # Footer with links
│   │   └── Map.jsx             # Leaflet map component
│   │
│   ├── pages/
│   │   ├── Home.jsx            # Landing page
│   │   ├── About.jsx           # About & mission page
│   │   ├── Contact.jsx         # Contact form page
│   │   ├── ReportAnimal.jsx    # Report animal form with geolocation
│   │   ├── RescueCenters.jsx   # Directory with list/map views
│   │   └── Dashboard.jsx       # Rescue team dashboard
│   │
│   ├── services/
│   │   └── firebaseService.js  # Firebase/mock storage operations
│   │
│   ├── hooks/
│   │   └── useGeolocation.js   # Custom hook for browser geolocation
│   │
│   ├── data/
│   │   └── rescueCenters.js    # Sample rescue center data (~10-15 centers)
│   │
│   ├── utils/
│   │   └── distance.js         # Utility functions (haversine, WhatsApp, etc.)
│   │
│   ├── styles/
│   │   └── index.css           # Global Tailwind + custom styles
│   │
│   ├── App.jsx                 # Main app component with routes
│   └── main.jsx                # React entry point
│
├── public/                      # Static assets
├── package.json                # Dependencies and scripts
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── .gitignore                  # Git ignore file
├── .env.example                # Environment variables template
├── index.html                  # HTML template
└── README.md                   # This file
```

## 🗺️ Sample Data

The project includes seed data for rescue centers in Nepal:

### Locations Covered
- **Kathmandu District**: 3 rescue centers (Kathmandu, Lalitpur, Bhaktapur)
- **Pokhara City**: 4 rescue centers

### Sample Centers Include
- Center name, address, phone, email
- Operating hours and emergency availability
- Services offered (Rescue, Medical, Rehabilitation, etc.)
- GPS coordinates for map display

**Note**: You can easily add more centers by editing `src/data/rescueCenters.js`

## 🔐 Dashboard Login (MVP)

For demo purposes, the rescue team dashboard has pre-configured test accounts:

```
Email: rescue1@test.com
Password: password123

Email: rescue2@test.com
Password: password123

Email: rescue3@test.com
Password: password123
```

**⚠️ Security Note**: These are hardcoded for MVP. For production, implement proper authentication using Firebase Authentication or similar.

## 💾 Data Storage

### Current Implementation (MVP)
- Uses **localStorage** for data persistence
- All data is stored locally in the browser
- Suitable for development, testing, and small-scale deployments

### Data Structures
```javascript
// Rescue Report
{
  id: "timestamp",
  animalType: "dog|cat|bird|...",
  problemType: "injured|sick|abandoned|...",
  description: "...",
  reporterName: "...",
  reporterPhone: "...",
  reporterEmail: "...",
  location: "...",
  latitude: 27.7172,
  longitude: 85.3240,
  status: "pending|in-progress|rescued|closed",
  createdAt: "ISO timestamp",
  updatedAt: "ISO timestamp"
}
```

### Future: Firebase Integration
The code is structured to easily migrate to Firebase. To enable Firebase:

1. Create a Firebase project at [firebase.google.com](https://firebase.google.com)
2. Add Firebase credentials to `.env`
3. Update `src/services/firebaseService.js` to use actual Firebase SDK calls
4. Create Firestore collections:
   - `rescue_reports`
   - `rescue_centers`
   - `rescue_teams`

See `.env.example` for Firebase configuration template.

## 🎨 Design & Styling

### Color Palette
- **Primary Green**: `#22c55e` - Trust, nature, rescue
- **Accent Orange**: `#fb923c` - Energy, urgency, action
- **Neutral**: Beige, white, gray - Clean, professional
- **Status Colors**: Red (pending), Yellow (in-progress), Green (rescued), Gray (closed)

### Responsive Design
- **Mobile-first** approach
- Breakpoints: < 640px (mobile), 640-1024px (tablet), 1024px+ (desktop)
- All components tested on various screen sizes
- Touch-friendly buttons and forms

### Accessibility
- Semantic HTML elements
- ARIA labels for icons
- Proper color contrast ratios
- Keyboard navigation support

## 🚀 Deployment

### Deploy to Vercel (Recommended - Free)

1. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/AishwaryaDahal7/Stray-Animal-Rescue.git
   git branch -M main
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Import your repository
   - Vercel will auto-detect Vite configuration
   - Click "Deploy"

3. **Configure Environment Variables** (in Vercel dashboard)
   - Add any Firebase config if using real backend
   - Vercel provides a live URL after deployment

### Alternative: Deploy to Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist/` folder or connect GitHub
   - Netlify will auto-deploy on every push

### Alternative: Deploy to GitHub Pages

1. **Update `vite.config.js`**
   ```javascript
   export default {
     base: '/Stray-Animal-Rescue/',
     // ... rest of config
   }
   ```

2. **Build and deploy**
   ```bash
   npm run build
   npm run deploy
   ```

## 📝 Development Guide

### Adding a New Page
1. Create a new file in `src/pages/YourPage.jsx`
2. Add route in `src/App.jsx`
3. Add navigation link in `src/components/NavBar.jsx`

### Adding a New Component
1. Create in `src/components/YourComponent.jsx`
2. Import and use in pages

### Using Utilities
```javascript
import { calculateDistance, sortByDistance } from '../utils/distance'

const distance = calculateDistance(lat1, lon1, lat2, lon2)
const nearestCenters = sortByDistance(centers, userLat, userLng)
```

### Using Custom Hook
```javascript
import { useGeolocation } from '../hooks/useGeolocation'

const { latitude, longitude, loading, error, getLocation } = useGeolocation()
```

### Submitting Reports
```javascript
import { submitRescueReport } from '../services/firebaseService'

const reportId = await submitRescueReport(formData)
```

## 🔄 State Management

For MVP, the app uses:
- **React Hooks** (`useState`, `useEffect`) for component state
- **localStorage** for persistence across sessions
- **URL params** (via React Router) for navigation state

Future: Consider adding Redux or Context API for complex state management.

## 🐛 Common Issues & Solutions

### Issue: Map not displaying
- **Solution**: Check if Leaflet CSS is imported in `src/styles/index.css`
- **Solution**: Verify map container has a fixed height

### Issue: Geolocation not working
- **Solution**: Ensure HTTPS (or localhost) for browser permission
- **Solution**: Allow location access in browser settings
- **Solution**: Try manual location input as fallback

### Issue: Styles not applying
- **Solution**: Run `npm install` to ensure Tailwind is installed
- **Solution**: Check `tailwind.config.js` includes correct content paths

### Issue: Build fails
- **Solution**: Delete `node_modules/` and `package-lock.json`, then `npm install`
- **Solution**: Check Node.js version (require v16+)

## 📈 Future Improvements

### Phase 2 (Production Readiness)
- [ ] Firebase backend integration (real-time database, authentication)
- [ ] Email notifications to rescue teams
- [ ] SMS notifications for urgent reports
- [ ] Image upload to Firebase Storage
- [ ] Admin panel for managing rescue centers
- [ ] Rescue team self-registration
- [ ] Multi-language support
- [ ] Progressive Web App (PWA) features
- [ ] Advanced analytics dashboard
- [ ] Twilio integration for calling/SMS

### Phase 3 (Advanced Features)
- [ ] Mobile app (React Native)
- [ ] Live chat support (Tawk.to integration)
- [ ] AI-powered animal identification from images
- [ ] Predictive dispatch optimization
- [ ] Volunteer scheduling system
- [ ] Donation platform integration
- [ ] Social sharing features
- [ ] Community forum

## 📄 License

This project is open-source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact & Support

- **GitHub Issues**: Report bugs or request features via GitHub Issues
- **Email**: For inquiries, contact the project maintainer
- **Discussion**: Use GitHub Discussions for general questions

## 🙏 Acknowledgments

- **Leaflet** - Open-source mapping library
- **OpenStreetMap** - Free map data
- **React** - UI library
- **Tailwind CSS** - Utility-first CSS
- **Vite** - Build tool
- **Vercel/Netlify** - Free hosting

## 📊 Project Statistics

- **Total Components**: 4 (Layout, NavBar, Footer, Map)
- **Total Pages**: 6 (Home, About, Contact, Report, Centers, Dashboard)
- **Lines of Code**: ~2,500+
- **Dependencies**: 10+ (React, React Router, Tailwind, Leaflet, etc.)
- **Time to Deploy**: < 5 minutes
- **Zero Cost**: 100% free tools and services

---

**Happy rescuing! Together, we can save lives.** 🐾❤️
