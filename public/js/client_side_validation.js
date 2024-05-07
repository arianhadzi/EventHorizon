//Client-side validation

let registerForm = document.getElementById('signup-form');
let loginForm = document.getElementById('signin-form');
let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let email = document.getElementById('email');
let username = document.getElementById('username');
let password = document.getElementById('password');
let confirmPassword = document.getElementById('confirmPassword');

if (registerForm) {
    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let errorMessages = [];

        if (!firstName.value) {
            errorMessages.push('First name is missing!');
        }
        if (!lastName.value) {
            errorMessages.push('Last name is missing!');
        }
        if (!email.value) {
            errorMessages.push('Email is missing!');
        }
        if (!username.value) {
            errorMessages.push('Username is missing!');
        }
        if (!password.value) {
            errorMessages.push('Password is missing!');
        }
        if (!confirmPassword.value) {
            errorMessages.push('ConfirmPassword is missing!');
        }

        firstName.value = firstName.value.trim();
        lastName.value = lastName.value.trim();
        email.value = email.value.trim();
        username.value = username.value.trim();
        password = password.value.trim();
        confirmPassword = confirmPassword.value.trim();

        if (firstName.value.length < 2 || firstName.value.length > 25 || /\d/.test(firstName.value)) {
            errorMessages.push('FirstName should be 2-25 characters long or contain numbers!');
        }
        if (lastName.value.length < 2 || lastName.value.length > 25 || /\d/.test(lastName.value)) {
            errorMessages.push('lastName should be 2-25 characters long or contain numbers!');
        }
        if (! /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value)) {
            errorMessages.push('email should be valid!');
        }
        if (username.value.length < 5 || username.value.length > 10 || /\d/.test(username.value)) {
            errorMessages.push('Username must be 5-10 characters long and cannot contain numbers!');
        }
        if (password.value.length < 8 || 
            !/[A-Z]/.test(password.value) || !/\d/.test(password.value) || !/[!@#$%^&*(),.?":{}|<>]/.test(password.value)) {
                errorMessages.push('Password must be at least 8 characters, include at least one uppercase letter, one number, and one special character!');
        }
        if (password.value !== confirmPassword.value) {
            errorMessages.push('Passwords do not match!');
        }
        if (errorMessages.length > 0) {
            let errorString = errorMessages.join('\n');
            alert(errorString);
        } else {
            registerForm.submit();
        }
    });
}

if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let errorMessages = [];

        if (!username.value) {
            errorMessages.push('Username is missing!');
        }
        if (!password.value) {
            errorMessages.push('Password is missing!');
        }

        username.value = username.value.trim();
        password.value = password.value.trim();

        if (username.value.length < 5 || username.value.length > 10 || /\d/.test(username.value)) {
            errorMessages.push('Username must be 5-10 characters long and cannot contain numbers!');
        }
        if (password.value.length < 8 || 
            !/[A-Z]/.test(password.value) || !/\d/.test(password.value) || !/[!@#$%^&*(),.?":{}|<>]/.test(password.value)) {
                errorMessages.push('Password must be at least 8 characters, include at least one uppercase letter, one number, and one special character!');
        }
        
        if (errorMessages.length > 0) {
            let errorString = errorMessages.join('\n');
            alert(errorString);
        } else {
            loginForm.submit();
        }
    });
}