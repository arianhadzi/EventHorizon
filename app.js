//Here is where you'll set up your server as shown in lecture code
import express from 'express';
const app = express();

import { dbConnection, closeConnection } from './config/mongoConnections.js';
import session from 'express-session';
import configRoutes from './routes/index.js';
import exphbs from 'express-handlebars';
import {fileURLToPath} from 'url';
import {dirname} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const staticDir = express.static(__dirname + '/public');

const handlebarsInstance = exphbs.create({
  defaultLayout: 'main',
  // Specify helpers which are only registered on this instance.
  helpers: {
    asJSON: (obj, spacing) => {
      if (typeof spacing === 'number')
        return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

      return new Handlebars.SafeString(JSON.stringify(obj));
    }
  },
  partialsDir: ['views/partials/']
});


app.use('/public', staticDir);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');

configRoutes(app);

// 1
app.use((req, res, next) => {
  const isAuthenticated = req.session.user ? true : false;
  const role = isAuthenticated ? req.session.user.role : 'Non-Authenticated User';
  console.log(`[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} (${role})`);
  if (req.originalUrl === '/') {
      if (!isAuthenticated) {
          return res.redirect('/login');
      } 
  }
  next();
});

// Login middleware
app.get('/login', (req, res, next) => {
  console.log('in login middleware')
  if (req.session.user) {
    return res.redirect('/user');
  }
  next(); 
}, (req, res) => {
      return res.render('login');
});

// Register middleware
app.get('/register', (req, res, next) => {
  if (req.session.user) {
      return res.redirect('/user');
  }
  next();
}, (req, res) => {
   return res.render('register');
});

// User profile middleware
app.get('/user', (req, res, next) => {
  if (!req.session.user) {
      return res.redirect('/login');
  }
  next();
}, (req, res) => {
  const user = req.session.user
  return res.render('user', {user: req.session.user, currentTime: req.session.currentTime});
});

//Logoout middleware
app.get('/logout', (req, res, next) => {
  if (!req.session.user) {
      return res.redirect('/login');
  }
  next();
}, (req, res) => {
  req.session.destroy((err) => {
      if (err) {
          return res.status(500).send('Failed to log out');
      }
      return res.redirect('/login');
  });
});

app.get('/create-event', (req, res, next) => {
  return res.render('create_event');
});

app.get('/search', (req, res, next) => {
  return res.render('search');
});


app.listen(3000, () => {
    console.log('Routes are running on http://localhost:3000');
})