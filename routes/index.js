import eventsRoutes from './events.js';
import usersRoutes from './users.js';

const constructorMethod = (app) => {
  app.use('/', usersRoutes) //homepage 
  app.use('/users', usersRoutes); //user related actions
  app.use('/events', eventsRoutes) //event related actions
  app.use('*', (req, res) => {
    res.sendStatus(404); 
  });
};

export default constructorMethod;