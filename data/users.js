import {users} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb'
import validation from '../validation.js';
import bcrypt from 'bcrypt';

//TODO: Add object id stuff
export const registerUser = async (
    firstName,
    lastName,
    username,
    email,
    password,
    role
  ) => {
    let userCollection = undefined;
    try{
      userCollection = await users();
      // Check if a user exists with the same username or email
      const existingUser = await userCollection.findOne({
        $or: [{ username: username }, { email: email }]
      });      
      
      if (existingUser) {
        console.log('existing user')
        throw new Error('There is already an existing user with that username or email.');
      }

      firstName = validation.validateName(firstName);
      lastName = validation.validateName(lastName);
      email = validation.validateEmail(email);
      username = validation.validateUsername(username);
      password = validation.validatePassword(password);

    } catch(e){
      throw new Error(`Error during user registeration: ${e.message}`);
    }

    const saltRounds = 16;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const insertResult = await userCollection.insertOne({
        firstName: firstName,
        lastName: lastName,
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


  
  export const loginUser = async (username, password) => {
    let user = undefined
    try{
      username = validation.validateUsername(username);
      password = validation.validatePassword(password);
  
      const userCollection = await users();

      user = await userCollection.findOne({username: username});
      if(!user){
        throw new Error('User not found.');
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch){
      throw new Error('Either the username or password is invalid')
      }

      return {
        email: user.email,
        username: user.username,
        role: user.role
      };
  
    }catch(e){
      throw new Error(e)
    }
};

const exportedMethods = {
  registerUser,
  loginUser
};

