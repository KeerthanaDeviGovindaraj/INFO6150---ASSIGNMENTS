# Assignment 2 – Professional Portfolio Website

# Objective
The goal of this assignment was to create a personal portfolio website that feels professional, organized, and modern. The site is meant to function like a LinkedIn-style profile, but built from scratch using only HTML and CSS. It highlights my skills, projects, experience, and also allows visitors to get in touch with me.

# What I Built
- A **clean homepage** with my name, degree program, and quick contact details.
- A **navigation bar** that lets users jump to About, Skills, Projects, Experience, Testimonials, and Contact sections.
- A **skills table** that groups technologies by category and shows my proficiency level.
- A **gallery of projects**, each card with a screenshot, short description, and link to code or paper.
- A **testimonials section**, where past supervisors and collaborators provide short quotes about my work.
- A **contact form** that allows someone to fill in their name, email, and a short message.
- A **footer** with my name and the current year.

---

# Technical Highlights

# Semantic HTML
I used proper semantic elements throughout:
- `<header>` for the top navigation and branding.
- `<section>` to organize each major part of the site (About, Skills, Projects, etc.).
- `<article>` for individual pieces of content like internships and testimonials.
- `<aside>` for a profile card in the hero section.
- `<footer>` for site information at the bottom.

# HTML Controls
- **Navigation menu** built with `<nav>` and a list of links.
- **Skills table** built with `<table>` using `<thead>`, `<tbody>`, `<th>`, and `<td>`.
- **Contact form** with text inputs, email input, textarea, and two buttons (Submit + Reset).
- **Buttons** styled consistently with hover and focus effects.

# CSS Selectors in Table
- I used `nth-child(odd)` to alternate row colors.
- I also used `td:nth-child(3)` to center and bold the proficiency column.

# Responsive Components
- **Gallery**: A flexbox-based grid of project cards. On desktop, multiple cards appear per row; on smaller screens they stack.
- **Testimonials**: Each testimonial is styled like a card with hover effects and adjusts to different screen sizes.

# Flexbox
Flexbox is used heavily to handle layouts:
- `display: flex`, `justify-content`, and `align-items` for horizontal and vertical alignment.
- `flex-wrap` for wrapping items on smaller screens.
- `flex-direction` changes at different breakpoints to stack content.

# Media Queries
- At **768px** (tablet size), the layout switches to two-column or stacked formats.
- At **480px and below** (mobile size), navigation hides, sections collapse into one column, and forms/buttons adjust to full width.
