//Client-side validation
import * as validation from '../../validation.js';

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    try {
        const firstName = validation.validateName(document.getElementById('firstName').value);
        const lastName = validation.validateName(document.getElementById('lastName').value);
        const username = validation.validateUsername(document.getElementById('username').value);
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