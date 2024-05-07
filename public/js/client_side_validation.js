//Client-side validation

import {validateName, validatePassword, validateEmail} from "../../validation.js";

let registerForm = document.getElementById('signup-form');
let loginForm = document.getElementById('signin-form');
let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let email = document.getElementById('email');
let username = document.getElementById('username');
let password = document.getElementById('password');

if (registerForm) {
    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let errorMessages = [];
        console.log(password.value);

        try {
            validateName(firstName.value, 'First name');
            validateName(lastName.value, 'Last name');
            validateEmail(email.value);
            validateUsername(username.value);
            validatePassword(password.value);
            console.log(password.value);
        } catch (error) {
            errorMessages.push(error.message);
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

        try {
            validateUsername(username.value);
            validatePassword(password.value);
        } catch (error) {
            errorMessages.push(error.message);
        }

        if (errorMessages.length > 0) {
            let errorString = errorMessages.join('\n');
            alert(errorString);
        } else {
            loginForm.submit();
        }
    });
}