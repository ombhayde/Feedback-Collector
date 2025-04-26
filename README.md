markdown
# Feedback Collector

## Project Overview
A single-page application for collecting and viewing user feedback with:
- Form validation
- Admin view toggle
- Dark/light theme
- Responsive design

## Tech Stack
- Frontend: Next.js 14, CSS Modules
- Backend: Next.js API Routes (Netlify Functions)
- Database: JSON file storage
- Hosting: Netlify

## Project Structure
/src
/app
/api # API endpoints
/components # React components
/lib # Database utilities
page.js # Main page
/public
/data # JSON data storage

### Key Files Explained

1. **Frontend Components** (`/app/components`)
   - `FeedbackForm`: Handles user input with validation
   - `FeedbackList`: Displays submitted feedbacks (admin view)
   - `ThemeToggle`: Dark/light mode switcher
   - `Watermark`: Footer attribution

2. **API Endpoints** (`/app/api`)
   - `submit-feedback`: Processes form submissions
   - `feedbacks`: Returns all stored feedbacks

3. **Core Infrastructure**
   - `db.js`: Manages JSON file read/write operations
   - `globals.css`: CSS variables for theming
   - `feedbacks.json`: Persistent data storage

4. **Configuration**
   - `netlify.toml`: Deployment settings for Netlify
   - `package.json`: Project metadata and scripts

### Data Flow
1. User submits form → `POST /api/submit-feedback`
2. Admin views feedbacks → `GET /api/feedbacks`
3. All data persists in `public/data/feedbacks.json`

## Deployment Steps
1. Clone repository
2. Install dependencies: `npm install`
3. Run locally: `npm run dev`
4. Deploy to Netlify:
   - Connect GitHub repo
   - Set build command: `npm run build`
   - Set publish directory: `.next/static`
