//Client-side validation
import validation from '../../validation.js';

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

        

    })
}

