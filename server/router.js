const controllers = require('./controllers');

const router = (app) => {
  app.get('/', controllers.Site.getIndex);
  app.get('/projects', controllers.Project.getList);
  app.get('/project', controllers.Site.redirToIndex);
  app.get('/project/*', controllers.Project.getProject);
  app.get('/*', controllers.Site.getNotFound);
};

module.exports = router;
