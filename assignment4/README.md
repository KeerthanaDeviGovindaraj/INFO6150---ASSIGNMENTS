# Feedback Form with AI Assistant

A modern, fully-validated feedback form with an AI-powered FAQ chatbot assistant built using HTML, CSS, and JavaScript.

##  Features added   

### Form Validation
- **Real-time validation** on all input fields with visual feedback
- **Dynamic error highlighting** with fade-in/fade-out animations
- **Field-specific validations**:
  - Title: Required radio button selection
  - First/Last Name: 2-50 characters, letters only
  - Email: Must be @northeastern.edu domain
  - Phone: Auto-formatted to (XXX) XXX-XXXX
  - Zip Code: 5 or 6 digits only
  - Street Address 2: Optional field with character counter
  - How did you hear: Required dropdown selection
  - Comments: 10-500 characters required
- **Submit button** remains disabled until all validations pass

### Input Masking
- **Phone Number**: Automatic formatting as user types
  - User enters: `1234567890`
  - Displays as: `(123) 456-7890`

### Character Counter
- **Street Address 2**: Live character counter (0/50)
  - Gray: 0-39 characters
  - Orange: 40-49 characters (warning)
  - Red: 50 characters (maximum)

### Dynamic Content
- **Dropdown-triggered checkbox**: Selecting from "How did you hear" creates:
  - Enable checkbox for additional information
  - Text input field (appears when checkbox is checked)
  - Changes dynamically based on selection

### Data Persistence
- **Submissions Table**: Displays all form submissions
  - Shows below the form after submission
  - Maintains history of all previous submissions
  - Includes all field data in organized table format
  - Auto-scrolls to table after submission

### AI FAQ Chatbot
- **AI Assistant Button**: Located in top-right corner
- **Interactive Chat Window**: Modal popup with conversation interface
- **5 Pre-defined FAQs**:
  1. Email format requirements
  2. Phone number format
  3. Zip code requirements
  4. Required vs optional fields
  5. Street Address 2 information
- **Keyword Detection**: Intelligent matching of user questions
- **Conversation History**: All messages persist until chat is closed
- **Default Response**: Helpful message when question not recognized

