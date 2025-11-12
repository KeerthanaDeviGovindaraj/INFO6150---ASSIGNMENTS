# Assignment 9: React Job Portal with Material UI and Axios

A modern, professional job portal application built with React, Material-UI, and Axios. This application connects job seekers with career opportunities and integrates with Assignment 8's Node.js backend for authentication and data management.

##  Project Overview

This full-stack job portal provides:
- **User Authentication** - Secure login using Assignment 8 credentials
- **Job Listings** - Browse 6+ curated job opportunities with skills and salary information
- **Company Showcase** - Explore partner companies with image gallery
- **Session Management** - Persistent authentication using JWT tokens
- **Responsive Design** - Modern Material-UI components with professional styling
- **Protected Routes** - Secure access to application features

##  Technologies Used

### Frontend
- **React** 19.2.0 - JavaScript library for building user interfaces
- **React Router DOM** 7.9.5 - Client-side routing and navigation
- **Material-UI (MUI)** 7.3.5 - React component library implementing Material Design
- **Axios** 1.13.2 - Promise-based HTTP client for API requests
- **Emotion** - CSS-in-JS styling library for Material-UI

### Backend Integration
- **Assignment 8 Node.js API** - User authentication and data storage
- **MongoDB** - Database for user credentials
- **bcrypt** - Password hashing and validation

##  Installation & Setup

### Prerequisites

- **Node.js** 20.x LTS or higher
- **npm** 9.x or higher
- **Assignment 8 Backend** running on port 3000
- **MongoDB** connection (for Assignment 8)

### Step 1: Clone the Repository
```bashgit clone https://github.com/KeerthanaDeviGovindaraj/INFO6150---ASSIGNMENTS.git
cd INFO6150---ASSIGNMENTS/Assignment9

### Step 2: Install Dependencies
```bashnpm install

**Key Dependencies Installed:**
- react & react-dom (19.2.0)
- react-router-dom (7.9.5)
- axios (1.13.2)
- @mui/material (7.3.5)
- @mui/icons-material (7.3.5)
- @emotion/react & @emotion/styled

### Step 3: Configure Backend Connection

Ensure your Assignment 8 backend is running with these endpoints:

**Required Endpoints:**
- `POST /user/login` - User authentication
- `GET /user/companies` - Fetch company images

Update API URLs if needed in:
- `src/services/authService.js`
- `src/services/apiService.js`

### Step 4: Start the Application
```bashnpm start

The app will open at: **http://localhost:3001**

##  Authentication

### Login Credentials

Use your existing Assignment 8 user credentials:

**Example:**
- **Email:** `kee@example.com`
- **Password:** `Pass@123` (your original password)

### Authentication Flow

1. User enters email and password
2. Frontend sends POST request to Assignment 8 backend (`/user/login`)
3. Backend validates credentials using bcrypt
4. On success, backend returns user data and JWT token
5. Frontend stores token in localStorage
6. Token included in all subsequent API requests via Axios interceptors
7. Protected routes verify authentication before rendering
8. Logout clears token and redirects to login

##  Pages & Features

### 1. Login Page (`/login`)
- Email and password input fields with icons
- Form validation and error handling
- Loading state during authentication
- Gradient background with modern design
- Automatic redirect after successful login

### 2. Home Page (`/`)
**Hero Section:**
- Large headline with call-to-action
- Background image with gradient overlay
- "Explore Jobs" and "View Companies" buttons

**Features Section:**
- 4 feature cards in responsive grid
- Icons and descriptions
- Hover animations
- Professional color scheme

**Call-to-Action:**
- Bottom section encouraging user engagement
- "Get Started Now" button

### 3. Job Listings Page (`/jobs`)
**Header:**
- Page title with work icon
- Job count display

**Job Cards (6 total):**
- Job title with prominent styling
- Salary range with dollar icon
- Job description (truncated to 3 lines)
- Required skills as clickable chips
- Last updated timestamp
- "Apply Now" button with external link
- 3-column responsive grid (desktop)
- Hover effects and animations

**Job Information Displayed:**
- Job Title
-  Required Skills
-  Salary Range
-  Description
-  Last Updated

### 4. About Page (`/about`)
- Company story and mission
- Core values with icons
- 4 value cards (Innovation, Community, Growth, Trust)
- Professional layout

### 5. Contact Page (`/contact`)
- Contact form with validation
- Name, email, and message fields
- Material-UI styled inputs with icons
- Submit button with confirmation
- Form reset after submission

### 6. Company Showcase (`/companies`)
- Gallery of partner companies
- Images fetched from Assignment 8 backend
- Company name displayed below image
- Responsive grid layout (3 columns)
- Fallback to demo data if API unavailable
- Hover effects on cards

##  Navigation

**Navigation Bar (visible on all pages except login):**
- Job Portal logo (clickable, returns to home)
- Home, Jobs, Companies, About, Contact links
- Active page indicator (purple underline)
- User avatar with first letter
- Logout button

**Routing Structure:**
- `/login` - Public route
- `/` - Protected (Home page)
- `/jobs` - Protected (Job listings)
- `/companies` - Protected (Company showcase)
- `/about` - Protected (About page)
- `/contact` - Protected (Contact page)

**Protected Routes:**
- Unauthenticated users automatically redirected to `/login`
- Authentication state managed via React Context

##  Session Management

### Token Storage
- JWT tokens stored in browser's localStorage
- Persists across browser sessions
- Cleared on logout

### Axios Interceptors
- Automatically adds Authorization header to all requests
- Format: `Bearer <token>`
- Handles token refresh and errors

### AuthContext Provider
- Global authentication state
- Provides `login()`, `logout()`, `isAuthenticated`, `user` to all components
- Checks localStorage on app initialization

##  Material-UI Components Used

### Layout & Structure
- **Container** - Responsive page wrapper
- **Grid** - Responsive grid system (12 columns)
- **Box** - Flexible container with sx props
- **Paper** - Elevated surfaces

### Navigation
- **AppBar** - Application header
- **Toolbar** - Navigation items container

### Display
- **Card, CardContent, CardActions** - Job and company cards
- **Typography** - Text styling (h1-h6, body, etc.)
- **Avatar** - User profile icon
- **Chip** - Skills and timestamps
- **Divider** - Visual separators

### Inputs
- **TextField** - Form inputs
- **Button** - Interactive buttons (contained, outlined variants)
- **InputAdornment** - Icons in input fields

### Feedback
- **Alert** - Error and info messages
- **CircularProgress** - Loading spinner

### Icons
- **@mui/icons-material** - Work, Business, Email, Lock, Schedule, etc.

##  API Integration

### Base URL Configuration
```javascriptconst API_URL = 'http://localhost:3000';

### Authentication Service

**Login Endpoint:**
```javascriptPOST http://localhost:3000/user/login
Request Body: { username: string, password: string }
Response: { success: boolean, user: object, token: string }

### Company Data Service

**Get Companies:**
```javascriptGET http://localhost:3000/user/companies
Headers: { Authorization: "Bearer <token>" }
Response: [{ name: string, imageUrl: string }]

### Error Handling

All API calls include comprehensive error handling:
- Network errors (server not running)
- Authentication errors (401 Unauthorized)
- Validation errors (400 Bad Request)
- Server errors (500 Internal Server Error)
- User-friendly error messages displayed via Material-UI Alerts

##  Job Data Structure

Jobs are managed in `src/utils/jobData.js` as a static array:
```javascript{
id: number,
title: string,
description: string,
skills: string[],
salary: string,
lastUpdated: string,
applyLink: string
}

**Current Listings:**
1. Full Stack Developer - $80k-$120k
2. Digital Marketing Specialist - $60k-$85k
3. UX/UI Designer - $70k-$100k
4. Data Scientist - $90k-$140k
5. Customer Support Representative - $40k-$55k
6. Project Manager - $85k-$115k

##  Design System

### Color Palette

**Primary Colors:**
- Primary Purple: `#667eea`
- Secondary Purple: `#764ba2`
- Gradient: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`

**Supporting Colors:**
- Success Green: `#10b981`
- Warning Orange: `#f59e0b`
- Accent Pink: `#ec4899`

**Neutral Colors:**
- Background: `#F9FAFB`
- Surface: `#FFFFFF`
- Text Primary: `#1e293b`
- Text Secondary: `#64748b`
- Border: `#E5E7EB`

### Typography
- Font Family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI'
- Headings: Bold (700-900 weight)
- Body Text: Regular (400-500 weight)

### Spacing
- Card Padding: 32px (4 spacing units)
- Grid Gap: 24px (3 spacing units)
- Section Padding: 80px vertical

##  Running Both Servers

### Terminal 1: Assignment 8 Backend
```bashcd path/to/Assignment8
node server.js

**Expected Output:**Server is running on port 3000
MongoDB Connected: ...

### Terminal 2: React Frontend
```bashcd path/to/Assignment9
npm start

**Expected Output:**Compiled successfully!
Local: http://localhost:3001

##  Testing Checklist

### Authentication
-  Login with valid Assignment 8 credentials
-  Login with invalid credentials (shows error)
-  Logout redirects to login page
-  Token persists after browser refresh
-  Protected routes redirect when not authenticated

### Navigation
-  All navigation links work correctly
-  Active page indicator displays
-  Logo click returns to home
-  Breadcrumb navigation

### Job Listings
-  All 6 jobs display in grid
-  Job title, salary, skills, description visible
-  "Apply Now" buttons open in new tab
- Hover effects work smoothly
-  Grid responsive on mobile/tablet/desktop

### Company Showcase
-  Company images load from backend
-  Fallback to demo data if backend unavailable
-  Company names display correctly
-  Grid layout responsive

### Contact Form
-  All fields validate properly
-  Submit shows confirmation
-  Form clears after submission

### Responsive Design
-  Works on desktop (1920px+)
-  Works on tablet (768px-1024px)
-  Works on mobile (320px-767px)

##  Troubleshooting

### Issue: Cannot connect to backend
**Solution:**
- Ensure Assignment 8 is running: `node server.js`
- Verify port 3000 is not blocked
- Check CORS is enabled in Assignment 8

### Issue: Login fails with correct credentials
**Solution:**
- Use original password (not hashed version)
- Check Assignment 8 has `/user/login` endpoint
- Verify MongoDB is connected
- Check Assignment 8 terminal for error logs

### Issue: Images not loading in Company Showcase
**Solution:**
- Verify Assignment 8 has `/user/companies` endpoint
- Check image paths in database
- Ensure images folder exists in Assignment 8
- Fallback demo images will display if API fails

### Issue: react-scripts not found
**Solution:**
```bashnpm install react-scripts@5.0.1 --save-exact

### Issue: Port 3001 already in use
**Solution:**
```bashChange port in package.json
"start": "set PORT=3002 && react-scripts start"

##  npm Scripts
```json{
"start": "set PORT=3001 && react-scripts start",
"build": "react-scripts build",
"test": "react-scripts test",
"eject": "react-scripts eject"
}

- **`npm start`** - Start development server on port 3001
- **`npm run build`** - Create production build
- **`npm test`** - Run test suite
- **`npm run eject`** - Eject from Create React App (irreversible)

##  Assignment 8 Integration

### Required Backend Endpoints

Add these to your Assignment 8 `routes/userRoutes.js`:

#### Login Endpoint
```javascriptPOST /user/login
Body: { username: string, password: string }
Response: { success: boolean, user: object, token: string }

#### Companies Endpoint
```javascriptGET /user/companies
Response: [{ name: string, imageUrl: string }]

### CORS Configuration

Add to Assignment 8 `server.js`:
```javascriptconst cors = require('cors');
app.use(cors({
origin: 'http://localhost:3001',
credentials: true
}));
