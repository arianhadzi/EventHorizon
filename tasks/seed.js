import { dbConnection, closeConnection } from "../config/mongoConnections.js";
import users from '../data/users.js';
import events from '../data/events.js';

const db = await dbConnection();

await users.registerUser(
    'Kate', 
    'Choi',
    'kachoi',
    'katechoi@gmail.com',
    'ez123456@!'
);

await users.loginUser(
    'kchoi',
    'ez123456@!',
);

await users.registerUser(
    'Mandy',
    'Smooth',
    'imsosmooth',
    'mandysmooth@hotmail.com',
    'isaiah6tyone@here'
);

await users.loginUser(
    'imsosmooth',
    'isaiah6tyone@here',
)

console.log('Done seeding database');
await closeConnection();