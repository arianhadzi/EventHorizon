import {users} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb'
import validation from '../validation.js';


let exportedMethods = {
    async getAllUsers() {
        const userCollection = await users();
        const userList = await userCollection.find({}).toArray();
        return userList;
    },

}

export default exportedMethods;