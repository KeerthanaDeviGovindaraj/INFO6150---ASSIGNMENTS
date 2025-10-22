const validUsers = [
    { email: 'john.doe@northeastern.edu', password: 'Password123' },
    { email: 'jane.smith@northeastern.edu', password: 'SecurePass1' },
    { email: 'admin@northeastern.edu', password: 'Admin12345' }
];

$(document).ready(function() {
    let emailValid = false;
    let passwordValid = false;

    $('#email').on('keyup blur', function() {
        const email = $(this).val().trim();
        const emailError = $('#emailError');
        
        if (email === '') {
            emailError.text('Please enter a valid Northeastern email').show();
            emailValid = false;
        } else if (!email.endsWith('@northeastern.edu')) {
            emailError.text('Please enter a valid Northeastern email').show();
            emailValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            emailError.text('Please enter a valid Northeastern email').show();
            emailValid = false;
        } else {
            emailError.hide();
            emailValid = true;
        }
        
        updateLoginButton();
    });

    $('#email').on('focus', function() {
        $('#emailError').hide();
    });

    $('#password').on('keyup blur', function() {
        const password = $(this).val();
        const passwordError = $('#passwordError');
        
        if (password === '') {
            passwordError.text('Password cannot be empty').show();
            passwordValid = false;
        } else if (password.length < 8) {
            passwordError.text('Password must be at least 8 characters').show();
            passwordValid = false;
        } else {
            passwordError.hide();
            passwordValid = true;
        }
        
        updateLoginButton();
    });

    $('#password').on('focus', function() {
        $('#passwordError').hide();
    });

    function updateLoginButton() {
        if (emailValid && passwordValid) {
            $('#loginBtn').prop('disabled', false);
        } else {
            $('#loginBtn').prop('disabled', true);
        }
    }

    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        
        const email = $('#email').val().trim();
        const password = $('#password').val();
        const rememberMe = $('#rememberMe').is(':checked');
        
        const user = validUsers.find(u => u.email === email && u.password === password);
        
        if (user) {
            const username = email.split('@')[0].replace('.', ' ').split(' ').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');
            
            const sessionData = {
                username: username,
                email: email,
                loginTimestamp: new Date().toISOString(),
                isLoggedIn: true
            };
            
            const storage = rememberMe ? localStorage : sessionStorage;
            storage.setItem('userSession', JSON.stringify(sessionData));
            
            $('#formError').hide();
            
    
            $('#successMessage').text('Login successful! Redirecting...').fadeIn(300);
            
         
            setTimeout(function() {
                window.location.href = 'calculator.html';
            }, 2000);
        } else {
          
            $('#formError').text('Invalid email or password').slideDown(300);
        }
    });
});