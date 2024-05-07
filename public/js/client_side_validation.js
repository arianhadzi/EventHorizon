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
let registerError = document.getElementById('signup-error-form');
let loginError = document.getElementById('signin-error-form');

if (registerForm) {
    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let errorMessages = [];
        registerError.innerHTML = '';
        registerError.hidden = true;

        if (!validation.validateName(firstName)) {
            errorMessages.push('First name needs value.');
        }

    })
}

