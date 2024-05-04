import {ObjectId} from 'mongodb';

const exportedMethods = {
  checkId(id, varName) {
    if (!id) throw `Error: You must provide a ${varName}`;
    if (typeof id !== 'string') throw `Error:${varName} must be a string`;
    id = id.trim();
    if (id.length === 0)
      throw `Error: ${varName} cannot be an empty string or just spaces`;
    if (!ObjectId.isValid(id)) throw `Error: ${varName} invalid object ID`;
    return id;
  },

  checkString(strVal, varName) {
    if (!strVal) throw `Error: You must supply a ${varName}!`;
    if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw `Error: ${varName} cannot be an empty string or string with just spaces`;
    if (!isNaN(strVal))
      throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
    return strVal;
  },

  checkStringArray(arr, varName) {
    //We will allow an empty array for this,
    //if it's not empty, we will make sure all tags are strings
    if (!arr || !Array.isArray(arr))
      throw `You must provide an array of ${varName}`;
    for (let i in arr) {
      if (typeof arr[i] !== 'string' || arr[i].trim().length === 0) {
        throw `One or more elements in ${varName} array is not a string or is an empty string`;
      }
      arr[i] = arr[i].trim();
    }

    return arr;
  },

  validateUsername(username) {
    if (!username || typeof username !== 'string' || username.trim().length < 5 || username.trim().length > 10 || /\d/.test(username.trim())) {
        throw new Error("Username must be 5-10 characters long and cannot contain numbers.");
    }
    return username.toLowerCase().trim();
  },

  validatePassword(password) {
    if (!password || typeof password !== 'string' || password.length < 8 || 
        !/[A-Z]/.test(password) || !/\d/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        throw new Error("Password must be at least 8 characters long, include at least one uppercase letter, one number, and one special character.");
    }
    return password;
  },

  validateField(field, minLength, maxLength, regex, errorMessage) {
    if (!field || typeof field !== 'string' || field.trim().length < minLength || field.trim().length > maxLength || (regex && !regex.test(field.trim()))) {
        throw new Error(errorMessage);
    }
    return field.trim();
  },

  validateEmail(email) {
    // TODO
    return null;
  },

  validateName(name) {
    if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 25 || /\d/.test(name.trim())) {
      throw 'Error: firstName or lastName must be 2-25 characters long and cannot contain numbers.';
    }  
    return name.trim();
  }

  
};

export default exportedMethods;