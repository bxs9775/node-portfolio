const models = require('../models');

const { Project } = models;

const getProject = (request, response) => {
  const req = request;
  const res = response;

  const url = req.url.split('/');
  console.dir(url);
  const name = url[2];

  return Project.ProjectModel.findByName(name, (err, docs) => {
    if (err) {
      console.log(err);

      return res.status(400).json({ error: 'An error occured.' });
    }
    if (!docs) {
      const document = `the project "${name}"`;
      return res.render('notFound', { doc: document });
    }
    return res.render('project', { project: docs });
  });

  // res.render('project', {});
};

const getList = (req, res) => {
  /*
  Add more here later...
  */
  res.status(501).json({ error: 'This functionality has not yet been added.' });
};

module.exports = {
  getProject,
  getList,
};
