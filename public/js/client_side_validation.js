//Client-side validation
import validation from '../../validation.js';

document.getElementById('signup-form').addEventListener('submit', function(event) {
    try {
        const firstName = validation.validateName(document.getElementById('firstName').value);
        const lastName = validation.validateName(document.getElementById('lastName').value);
        const username = validation.validateUsername(document.getElementById('username').value);
        const email = validation.validateEmail(document.getElementById('email').value);
        const password = validation.validatePassword(document.getElementById('password').value);
        const confirmPassword = document.getElementById('confirmPassword').value;
        if (password !== confirmPassword) {
            throw new Error("Passwords do not match.");
        }

    } catch (error) {
        event.preventDefault(); 
        alert(error.message); 
    }
});

document.getElementById('signin-form').addEventListener('submit', function(event) {
    try {
        const username = validation.validateUsername(document.getElementById('username').value);
        const password = validation.validatePassword(document.getElementById('password').value);

    } catch (error) {
        event.preventDefault();
        alert(error.message);
    }
});