document.addEventListener('DOMContentLoaded', function() {

let submissions = [];

const validationState = {
    title: false,
    firstName: false,
    lastName: false,
    emailId: false,
    phoneNumber: false,
    zipcode: false,
    source: false,
    comments: false
};

const validationRules = {
    title: {
        type: 'radio',
        required: true,
        errorMsg: 'Please select a title'
    },
    firstName: {
        type: 'text',
        required: true,
        minLength: 2,
        maxLength: 50,
        pattern: /^[a-zA-Z\s]+$/,
        errorMsgs: {
            required: 'First name is required',
            minLength: 'First name must be at least 2 characters',
            maxLength: 'First name must not exceed 50 characters',
            pattern: 'First name should only contain letters'
        }
    },
    lastName: {
        type: 'text',
        required: true,
        minLength: 2,
        maxLength: 50,
        pattern: /^[a-zA-Z\s]+$/,
        errorMsgs: {
            required: 'Last name is required',
            minLength: 'Last name must be at least 2 characters',
            maxLength: 'Last name must not exceed 50 characters',
            pattern: 'Last name should only contain letters'
        }
    },
    emailId: {
        type: 'text',
        required: true,
        minLength: 5,
        maxLength: 100,
        pattern: /^[a-zA-Z0-9._-]+@northeastern\.edu$/,
        errorMsgs: {
            required: 'Email is required',
            minLength: 'Email must be at least 5 characters',
            maxLength: 'Email must not exceed 100 characters',
            pattern: 'Email must be a valid @northeastern.edu address'
        }
    },
    phoneNumber: {
        type: 'text',
        required: true,
        pattern: /^\(\d{3}\)\s\d{3}-\d{4}$/,
        errorMsgs: {
            required: 'Phone number is required',
            pattern: 'Phone number must be in format (123) 456-7890'
        }
    },
    zipcode: {
        type: 'text',
        required: true,
        pattern: /^\d{5,6}$/,
        errorMsgs: {
            required: 'Zipcode is required',
            pattern: 'Zipcode must be 5 or 6 digits'
        }
    },
    source: {
        type: 'select',
        required: true,
        errorMsg: 'Please select how you heard about us'
    },
    comments: {
        type: 'textarea',
        required: true,
        minLength: 10,
        maxLength: 500,
        errorMsgs: {
            required: 'Comments are required',
            minLength: 'Comments must be at least 10 characters',
            maxLength: 'Comments must not exceed 500 characters'
        }
    }
};

const form = document.getElementById('feedbackForm');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');

function validateField(fieldName, value, rules) {

    if (rules.required && !value) {
        return { valid: false, message: rules.errorMsgs?.required || rules.errorMsg };
    }
    
    if (rules.minLength && value.length < rules.minLength) {
        return { valid: false, message: rules.errorMsgs.minLength };
    }

    if (rules.maxLength && value.length > rules.maxLength) {
        return { valid: false, message: rules.errorMsgs.maxLength };
    }
    
    if (rules.pattern && !rules.pattern.test(value)) {
        return { valid: false, message: rules.errorMsgs.pattern };
    }
    
    return { valid: true, message: '' };
}

function validate(fieldName) {
    const rules = validationRules[fieldName];
    const errorElement = document.getElementById(`${fieldName}Error`);
    let value = '';

    if (rules.type === 'radio') {
        const checked = document.querySelector(`input[name="${fieldName}"]:checked`);
        value = checked ? checked.value : '';
    } else if (rules.type === 'select') {
        value = document.getElementById(fieldName).value;
    } else {
        value = document.getElementById(fieldName).value.trim();
    }
    
    const result = validateField(fieldName, value, rules);
    
    const field = document.getElementById(fieldName);
    errorElement.textContent = result.message;
    errorElement.classList.toggle('show', !result.valid);
    
    if (field && rules.type !== 'radio' && rules.type !== 'select') {
        field.classList.toggle('invalid', !result.valid);
        field.classList.toggle('valid', result.valid && value !== '');
    } else if (field && rules.type === 'select') {
        field.classList.toggle('invalid', !result.valid);
        field.classList.toggle('valid', result.valid);
    }
    
    validationState[fieldName] = result.valid;
    updateSubmitButton();
}

function setupValidation() {
    Object.keys(validationRules).forEach(fieldName => {
        const rules = validationRules[fieldName];
        
        if (rules.type === 'radio') {
            const radios = document.querySelectorAll(`input[name="${fieldName}"]`);
            radios.forEach(radio => {
                radio.addEventListener('change', () => validate(fieldName));
            });
        } else if (rules.type === 'select') {
            const field = document.getElementById(fieldName);
            field.addEventListener('change', () => {
                validate(fieldName);
                if (fieldName === 'source') {
                    createDynamicContent();
                }
            });
        } else {
            const field = document.getElementById(fieldName);
            field.addEventListener('input', () => validate(fieldName));
            field.addEventListener('blur', () => validate(fieldName));
        }
    });
}
    
const phoneNumber = document.getElementById('phoneNumber');
phoneNumber.addEventListener('input', function(e) {

    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 10) {
        value = value.slice(0, 10);
    }
    
    let formattedValue = '';
    if (value.length > 0) {
        formattedValue = '(' + value.substring(0, 3);
        if (value.length >= 3) {
            formattedValue += ') ' + value.substring(3, 6);
        }
        if (value.length >= 6) {
            formattedValue += '-' + value.substring(6, 10);
        }
    }
    
    e.target.value = formattedValue;
    
    validate('phoneNumber');
});

const streetAddress2 = document.getElementById('streetAddress2');
const streetAddress2Counter = document.getElementById('streetAddress2Counter');

streetAddress2.addEventListener('input', function() {
    const length = streetAddress2.value.length;
    const maxLength = 50;
    streetAddress2Counter.textContent = `${length}/${maxLength} characters used`;
    
    if (length >= maxLength) {
        streetAddress2Counter.style.color = '#e74c3c';
    } else if (length >= maxLength * 0.8) {
        streetAddress2Counter.style.color = '#f39c12';
    } else {
        streetAddress2Counter.style.color = '#666';
    }
});

function createDynamicContent() {
    const dynamicCheckboxDiv = document.getElementById('dynamicCheckbox');
    const selectedValue = document.getElementById('source').value;
    
    if (selectedValue === '') {
        dynamicCheckboxDiv.innerHTML = '';
    } else {
        dynamicCheckboxDiv.innerHTML = `
            <input type="checkbox" id="enable_${selectedValue}" name="enable_${selectedValue}" />
            <label for="enable_${selectedValue}" style="float: none; width: auto;">Enable additional ${selectedValue} information</label>
            <br><br>
            <div id="additionalInfo_${selectedValue}" style="display: none;">
                <label for="additionalInput_${selectedValue}" style="float: left; width: 150px;">Additional ${selectedValue} Info*:</label>
                <input type="text" id="additionalInput_${selectedValue}" name="additionalInput_${selectedValue}" placeholder="Enter details..." />
                <br><br>
            </div>
        `;

        const dynamicCheckbox = document.getElementById(`enable_${selectedValue}`);
        const additionalInfoDiv = document.getElementById(`additionalInfo_${selectedValue}`);
        
        dynamicCheckbox.addEventListener('change', function() {
            if (this.checked) {
                additionalInfoDiv.style.display = 'block';
            } else {
                additionalInfoDiv.style.display = 'none';
            }
        });
    }
}

function updateSubmitButton() {
    const allValid = Object.values(validationState).every(value => value === true);
    submitBtn.disabled = !allValid;
}

resetBtn.addEventListener('click', function() {
    setTimeout(function() {
        Object.keys(validationState).forEach(key => {
            validationState[key] = false;
        });
        
        document.querySelectorAll('.error').forEach(error => {
            error.textContent = '';
            error.classList.remove('show');
        });
        
        document.querySelectorAll('input, textarea, select').forEach(element => {
            element.classList.remove('valid', 'invalid');
        });
        
        document.getElementById('dynamicCheckbox').innerHTML = '';
        
        streetAddress2Counter.textContent = '0/50 characters used';
        streetAddress2Counter.style.color = '#666';
        
        updateSubmitButton();
    }, 0);
});

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        title: document.querySelector('input[name="title"]:checked').value,
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        emailId: document.getElementById('emailId').value.trim(),
        phoneNumber: phoneNumber.value.trim(),
        zipcode: document.getElementById('zipcode').value.trim(),
        streetAddress2: streetAddress2.value.trim() || '',
        source: document.getElementById('source').value,
        additionalInfo: '',
        comments: document.getElementById('comments').value.trim()
    };

    const selectedSource = document.getElementById('source').value;
    const additionalInput = document.getElementById(`additionalInput_${selectedSource}`);
    if (additionalInput) {
        formData.additionalInfo = additionalInput.value.trim() || '';
    }
    
    submissions.push(formData);
    
    displaySubmissions();
    
    form.reset();

    Object.keys(validationState).forEach(key => {
        validationState[key] = false;
    });

    document.querySelectorAll('.error').forEach(error => {
        error.textContent = '';
        error.classList.remove('show');
    });

    document.querySelectorAll('input, textarea, select').forEach(element => {
        element.classList.remove('valid', 'invalid');
    });
    
    document.getElementById('dynamicCheckbox').innerHTML = '';

    streetAddress2Counter.textContent = '0/50 characters used';
    streetAddress2Counter.style.color = '#666';

    updateSubmitButton();

    setTimeout(function() {
        document.getElementById('submissionsSection').scrollIntoView({ behavior: 'smooth' });
    }, 100);
});

function displaySubmissions() {
    const tableBody = document.getElementById('submissionsTableBody');
    const submissionsSection = document.getElementById('submissionsSection');
    
    tableBody.innerHTML = '';
    
    submissions.forEach((submission, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${submission.title}</td>
            <td>${submission.firstName}</td>
            <td>${submission.lastName}</td>
            <td>${submission.emailId}</td>
            <td>${submission.phoneNumber}</td>
            <td>${submission.zipcode}</td>
            <td>${submission.streetAddress2 || ''}</td>
            <td>${submission.source}</td>
            <td>${submission.additionalInfo || ''}</td>
            <td>${submission.comments}</td>
        `;
        tableBody.appendChild(row);
    });
    
    submissionsSection.style.display = 'block';
}

const aiAssistantBtn = document.getElementById('aiAssistantBtn');
const aiChatbot = document.getElementById('aiChatbot');
const closeChatbot = document.getElementById('closeChatbot');
const chatInput = document.getElementById('chatInput');
const sendChatBtn = document.getElementById('sendChatBtn');
const chatbotBody = document.getElementById('chatbotBody');

const faqDatabase = {
    'email': {
        keywords: ['email', 'mail', '@', 'northeastern'],
        answer: 'You must use your Northeastern email (example: student@northeastern.edu).'
    },
    'phone': {
        keywords: ['phone', 'number', 'telephone', 'contact', 'call', 'format'],
        answer: 'The phone number must be in the format (XXX) XXX-XXXX.'
    },
    'zipcode': {
        keywords: ['zip', 'zipcode', 'postal', 'code', 'digit'],
        answer: 'The zip code must be exactly 5 or 6 digits.'
    },
    'required': {
        keywords: ['required', 'mandatory', 'fields', 'necessary', 'needed'],
        answer: 'All fields are required except Street Address 2.'
    },
    'address2': {
        keywords: ['street address 2', 'address 2', 'apartment', 'suite', 'optional', 'address2'],
        answer: 'No, Street Address 2 is optional. If left blank, it will remain empty in the results table.'
    }
};

aiAssistantBtn.addEventListener('click', function() {
    aiChatbot.classList.add('active');
    chatInput.focus();
});

closeChatbot.addEventListener('click', function() {
    aiChatbot.classList.remove('active');
});

aiChatbot.addEventListener('click', function(e) {
    if (e.target === aiChatbot) {
        aiChatbot.classList.remove('active');
    }
});

sendChatBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const userMessage = chatInput.value.trim();
    if (userMessage === '') return;

    const userDiv = document.createElement('div');
    userDiv.className = 'user-message';
    userDiv.innerHTML = `<strong>You:</strong> ${userMessage}`;
    chatbotBody.appendChild(userDiv);

    chatInput.value = '';
    
    const botResponse = getBotResponse(userMessage);
    
    setTimeout(function() {
        const botDiv = document.createElement('div');
        botDiv.className = 'bot-message';
        botDiv.innerHTML = `<strong>Bot:</strong> ${botResponse}`;
        chatbotBody.appendChild(botDiv);

        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }, 500);

    chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('street address 2') || lowerMessage.includes('address 2') || lowerMessage.includes('address2')) {
        return faqDatabase.address2.answer;
    }

    for (const category in faqDatabase) {
        if (category === 'address2') continue;
        
        const faq = faqDatabase[category];
        for (const keyword of faq.keywords) {
            if (lowerMessage.includes(keyword)) {
                return faq.answer;
            }
        }
    }
    
    return "Sorry, I don't know that yet. Please check the instructions.";
}

setupValidation();
updateSubmitButton();

});
