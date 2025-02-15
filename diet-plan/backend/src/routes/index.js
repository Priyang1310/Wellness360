import askRoute from './askRoute.js';

export default (app) => {
  app.use('/api', askRoute);
};