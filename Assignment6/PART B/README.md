# Event Stopwatch with Session Logging (Part B)

## Description
A single-page stopwatch app that lets users time events, tag them with dates, and persist session history to `localStorage`. The UI includes validation, session history, filtering by date, and statistics.

## Features Implemented
- Stopwatch display in `HH:MM:SS` (read-only); updates every second.
- Date picker (HTML5 `type="date"`) defaulting to today's date.
- Event name input with validation (3–100 chars; allowed characters: letters, numbers, spaces, hyphen, apostrophe).
- Buttons: Start, Pause/Resume, Stop & Save (with confirmation modal), Reset.
- Form fields disabled while timer is running.
- Sessions saved to `localStorage` (most recent first).
- Session history with date, event name, duration.
- Filter history by date and clear filter button.
- Statistics: total sessions and total time across saved sessions.
- Validation using jQuery with inline error messages (no pop-ups).
- Notification overlay for saves / actions.
- Modal dialog with backdrop for save confirmation.
- Responsive layout and accessible focus/keyboard support.
- Small bonus: click a history item to copy its summary to clipboard.

## Technologies Used
- HTML5
- CSS3
- JavaScript (ES6+)
- jQuery 3.6.0

## Notes / Bonus
- History items are ordered with the most recent saved first.
- Clicking a session copies `<date> - <name> - <duration>` to clipboard (if supported).
- Uses Promises and async/await in the timer/save flow and uses `setInterval`/`clearInterval` for clock updates.

