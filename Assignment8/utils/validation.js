/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid, false otherwise
 */
//mail validation
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validate full name (only alphabetic characters and spaces)
 * @param {string} fullName - Full name to validate
 * @returns {boolean} - True if valid, false otherwise
 */
//name validation
const validateFullName = (fullName) => {
    const nameRegex = /^[A-Za-z\s]{2,}$/;
    return nameRegex.test(fullName);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} - { isValid: boolean, message: string }
 */
const validatePassword = (password) => {
    const minLength = 8;
    
    if (password.length < minLength) {
        return {
            isValid: false,
            message: `Password must be at least ${minLength} characters long`
        };
    }
    
    if (!/[A-Z]/.test(password)) {
        return {
            isValid: false,
            message: 'Password must contain at least one uppercase letter'
        };
    }
    
    if (!/[a-z]/.test(password)) {
        return {
            isValid: false,
            message: 'Password must contain at least one lowercase letter'
        };
    }
    
    if (!/\d/.test(password)) {
        return {
            isValid: false,
            message: 'Password must contain at least one digit'
        };
    }
    
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        return {
            isValid: false,
            message: 'Password must contain at least one special character (!@#$%^&*()_+-=[]{};\':"|,.<>/?)'
        };
    }
    
    return {
        isValid: true,
        message: 'Password is valid'
    };
};

/**
 * Validate image file format
 * @param {string} mimetype - File mimetype
 * @returns {boolean} - True if valid format, false otherwise
 */
const validateImageFormat = (mimetype) => {
    const allowedFormats = ['image/jpeg', 'image/png', 'image/gif'];
    return allowedFormats.includes(mimetype);
};

/**
 * Validate file extension
 * @param {string} filename - Name of the file
 * @returns {boolean} - True if valid extension, false otherwise
 */
const validateImageExtension = (filename) => {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const ext = filename.toLowerCase().substring(filename.lastIndexOf('.'));
    return allowedExtensions.includes(ext);
};

/**
 * Comprehensive user data validation for creation
 * @param {object} userData - User data object { fullName, email, password }
 * @returns {object} - { isValid: boolean, errors: array }
 */
const validateUserCreation = (userData) => {
    const errors = [];
    
    if (!userData.fullName || !userData.email || !userData.password) {
        errors.push('All fields (fullName, email, password) are required');
        return { isValid: false, errors };
    }
    
    if (!validateFullName(userData.fullName)) {
        errors.push('Full name must contain only alphabetic characters and spaces');
    }
    
    if (!validateEmail(userData.email)) {
        errors.push('Invalid email format');
    }
    
    const passwordValidation = validatePassword(userData.password);
    if (!passwordValidation.isValid) {
        errors.push(passwordValidation.message);
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
};

/**
 * Validate user data for update
 * @param {object} updateData - Data to update { fullName?, password? }
 * @returns {object} - { isValid: boolean, errors: array }
 */
const validateUserUpdate = (updateData) => {
    const errors = [];
    
    if (!updateData.fullName && !updateData.password) {
        errors.push('At least one field (fullName or password) must be provided for update');
        return { isValid: false, errors };
    }
    
    if (updateData.fullName && !validateFullName(updateData.fullName)) {
        errors.push('Full name must contain only alphabetic characters and spaces');
    }
    
    if (updateData.password) {
        const passwordValidation = validatePassword(updateData.password);
        if (!passwordValidation.isValid) {
            errors.push(passwordValidation.message);
        }
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
};

module.exports = {
    validateEmail,
    validateFullName,
    validatePassword,
    validateImageFormat,
    validateImageExtension,
    validateUserCreation,
    validateUserUpdate
};