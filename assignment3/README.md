# Assignment 3 - Dynamic Data Management Web Application

## Student Info
- **Name**: Keerthana Devi Govindaraj
- **NUID**: 002472189

## Overview
This project is a dynamic web application that demonstrates DOM manipulation, event handling, and responsive table interactions.

## Features Implemented

1. Display Student Info – Full Name and NUID are shown on page load.
2. Dynamic Table – Rows can expand/collapse to show more details.
3. Button Creation – Action buttons (Add, Delete, Expand) are created dynamically in JavaScript.
4. Conditional Styling – Specific conditions (like values above/below a threshold) change row or cell colors.
5. Form Validation – Ensures that only valid input is accepted before adding new data.
6. Real-Time Feedback – Alerts and messages guide the user when an action succeeds or fails.

## Code Explanation
## 1. DOM Manipulation Functions

document.getElementById() = Used to access specific elements (like table, form, or inputs).
document.createElement() = Dynamically creates new HTML elements (e.g., buttons, table rows).
element.appendChild() = Inserts newly created elements into the DOM.
element.innerText / innerHTML = Sets or retrieves text inside elements.

## 2. Event Handling Functions

element.addEventListener("click", function) = Listens for user interactions like button clicks.
onsubmit = Validates form input before adding new data.

## 3. Expand/Collapse Row Function

Custom function toggles the display of additional row data.
Uses classList.toggle("hidden") or style changes to show/hide content.

## 4. Button Creation Functions

createButton(label, action) =  A helper function to generate buttons (e.g., Add, Delete, Expand).

## How to Run
1. Download the project folder or zip.
2. Open `index.html` in a browser.
3. Interact with the table to test all features.

## Technologies Used
- HTML
- CSS
- JavaScript 
