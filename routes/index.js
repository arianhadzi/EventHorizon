import eventsRoutes from './events.js';
import usersRoutes from './users.js';

const constructorMethod = (app) => {
  app.use('/', usersRoutes);
  app.use('/events', eventsRoutes);
  app.use('/users', usersRoutes)

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

export default constructorMethod;