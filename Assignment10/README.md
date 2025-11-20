Assignment 10 — Admin and Employee Portal (Redux + Role-Based Routing)

This assignment builds on the previous job portal application by introducing role-based authentication, admin-specific functionalities, employee-specific functionalities, and full Redux state management. Both the backend and frontend were updated to support secure routing and improved job/user handling.

Backend Updates
1. User Creation API

POST /user/create

Added a required field: type

Accepted values: "admin" or "employee"

The API validates the user type.

Passwords are securely stored and not returned in the API response.

2. Users List API

GET /users

Returns all users except their passwords.

Used by the admin to view employees.

Admin Portal
Role-Based Access

Admin routes are protected and can only be accessed by users with type = "admin".

After login:

Admin users are redirected to the Admin Dashboard.

Employee users are redirected to Employee-specific pages.

Employees Page

Fetches all users from GET /users.

Displays the user list in a structured table (name, email, type).

Add Job Page

Route: /add-job

Contains a form with the following fields:

Company Name

Job Title

Description

Salary

On submission, data is posted to POST /create/job.

Employee Portal
Role-Based Access

Employee routes can only be accessed by users with type = "employee".

Jobs Page

Route: /jobs

Fetches available jobs from GET /jobs.

Displays jobs using cards or lists.

Pagination is included.

Redux State Management

The application uses Redux Toolkit for global state management. The following states are stored in Redux:

User authentication

User type (admin or employee)

Job listings

Loading indicators

API response and error handling

Redux Toolkit slices and async thunks were used to manage API calls and state transitions.

UI and Styling

The project uses React Bootstrap for layout and styling.

Components such as Navbar, Cards, Forms, Buttons, Modals, and Tables were built using Bootstrap.