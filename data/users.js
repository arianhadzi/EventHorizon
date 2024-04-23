import {users} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb'
import validation from '../validation.js';

export const getAllUsers = async () => {
    const userCollection = await users();
    const userList = await userCollection.find({}).toArray();
    return userList;
}

export const registerUser = async (
    username,
    email,
    password,
    role
  ) => {
    let userCollection = undefined;
    try{
      userCollection = await users();
      const existingUser = await userCollection.findOne({ username: username });
      if (existingUser) {
        console.log('existing user')
          throw new Error('There is already an existing user with that username.');
      }
      email = validateEmail(email);
      lastName = validateName(lastName);
      username = validateUsername(username);
      password = validatePassword(password)
      role = validateField(role, 4, 5, /^(admin|user)$/i, "Role must be 'admin' or 'user'.");
    }catch(e){
      throw new Error(e)
    }
    const saltRounds = 16;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const insertResult = await userCollection.insertOne({
        email: email,
        username: username,
        password: hashedPassword,
        role: role
    });
    if (insertResult.insertedCount === 0) {
        throw new Error('User registration failed');
    }
    return { signupCompleted: true };
  };

  // Input validation functions 

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

  function validateEmail(email) {
    // TODO
    return null;
  }


export default exportedMethods;

