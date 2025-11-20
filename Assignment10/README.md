# Assignment 10 — Admin and Employee Portal (Redux + Role-Based Routing)

This assignment builds on the previous job portal application by introducing role-based authentication, admin-specific functionalities, employee-specific functionalities, and full Redux state management. Both the backend and frontend were updated to support secure routing and improved job/user handling.

## Backend Updates

### 1. User Creation API
POST /user/create
- Added a required field: "type"
  - Allowed: "admin" or "employee"
- API validates user type.
- Passwords are securely stored and not returned in API response.

### 2. Users List API
GET /users
- Returns all users except passwords.
- Used in admin dashboard to list employees.

## Admin Portal

### Role-Based Access
- Only admin users can access admin routes.
- After login:
  - Admin → Admin Dashboard
  - Employee → Employee Home

### Employees Page
- Fetches users from GET /users
- Displays employee list in a table format

### Add Job Page
Route: `/add-job`
- Form fields:
  - Company Name
  - Job Title
  - Description
  - Salary
- Submits data to POST /create/job

## Employee Portal

### Role-Based Access
- Employee routes are protected and only accessible by employee users.

### Jobs Page
Route: `/jobs`
- Fetches jobs from GET /jobs
- Display jobs with pagination

## Redux State Management

State stored in Redux includes:
- Authentication
- User type (admin / employee)
- Jobs data
- Loading & error states

Redux Toolkit used with slices and async thunks.

## UI & Styling
- Used React Bootstrap
- Navbar, cards, forms, tables, pagination