//Client-side validation

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    try {
        const firstName = validateName(document.getElementById('firstName').value);
        const lastName = validateName(document.getElementById('lastName').value);
        const username = validateUsername(document.getElementById('username').value);
        const password = validatePassword(document.getElementById('password').value);
        const confirmPassword = document.getElementById('confirmPassword').value;
        if (password !== confirmPassword) {
            throw new Error("Passwords do not match.");
        }

    } catch (error) {
        event.preventDefault(); 
        alert(error.message); 
    }
});

function validateUsername(username) {
    if (!username || typeof username !== 'string' || username.trim().length < 5 || username.trim().length > 10 || /\d/.test(username.trim())) {
        throw new Error("Username must be 5-10 characters long and cannot contain numbers.");
    }
    return username.toLowerCase().trim();
}

function validatePassword(password) {
    if (!password || typeof password !== 'string' || password.length < 8 || 
        !/[A-Z]/.test(password) || !/\d/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        throw new Error("Password must be at least 8 characters long, include at least one uppercase letter, one number, and one special character.");
    }
    return password;
}


function validateField(field, minLength, maxLength, regex, errorMessage) {
    if (!field || typeof field !== 'string' || field.trim().length < minLength || field.trim().length > maxLength || (regex && !regex.test(field.trim()))) {
        throw new Error(errorMessage);
    }
    return field.trim();
}
