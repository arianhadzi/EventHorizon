import authRoutes from './auth.js';

const constructorMethod = (app) => {
  app.use('/', authRoutes);

  app.use('*', (req, res) => {
    res.status(404).send('Not Found'); 
  });
  
};

export default constructorMethod;