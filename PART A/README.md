## Description
- A two-page web application built with HTML5, CSS3, JavaScript (ES6+), and jQuery.

- Users log in with hard-coded credentials, then access a calculator that performs basic arithmetic operations.
- User sessions are stored in sessionStorage or localStorage depending on the “Remember Me” option.
- All validations, animations, and UI updates are handled using jQuery.

## Features Implemented
- Login Page (login.html)

- Fields: Email, Password, “Remember Me” checkbox, Login button (disabled initially)

- Email Validation:

Must be in valid email format

Must end with @northeastern.edu

Cannot be empty

Error: Please enter a valid Northeastern email

- Password Validation:

Cannot be empty

Minimum 8 characters

Error shown below field in red

- Validation Behavior:

Runs on keyup and blur events

Clears errors on focus

Enables Login button only after both fields are valid

- Credential Check: Verified against hard-coded user list

On Success:

Creates session object with username, email, timestamp, and isLoggedIn flag

Stores in sessionStorage or localStorage (if “Remember Me” checked)

Shows animated success message

Redirects to calculator.html after 2 seconds

On Failure:

Displays Invalid email or password below login button (no pop-ups)

- Calculator Page (calculator.html)

Redirects to login if no valid session exists

Displays header: Welcome, [username]! and a Logout button

## Calculator Features

Two numeric input fields (Number 1 and Number 2)

Four buttons: Add, Subtract, Multiply, Divide

Read-only Result field

Input Validation:

Both fields required

Only numeric values allowed (decimals and negatives ok)

Error: Please enter a valid number

## Technologies Used

HTML5 – Semantic structure

CSS3 (Flexbox/Grid) – Responsive layout and design

JavaScript (ES6+) – Business logic

jQuery – Validation, DOM manipulation, animations

Web Storage API – Session handling with sessionStorage and localStorage