import {users} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb'
import validation from '../validation.js';

export const getAllUsers = async () => {
    const userCollection = await users();
    const userList = await userCollection.find({}).toArray();
    return userList;
}

//TODO: Add object id stuff
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
      username = validation.validateUsername(username);
      password = validation.validatePassword(password)
      role = validation.validateField(role, 4, 5, /^(admin|user)$/i, "Role must be 'admin' or 'user'.");
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

  export const loginUser = async (username, password) => {
    let user = undefined
    try{
      username = validateUsername(username);
      password = validatePassword(password);
  
      const userCollection = await users();
      user = await userCollection.findOne({username: username});
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
}

export default exportedMethods;

