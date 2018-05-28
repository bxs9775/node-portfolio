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
    console.dir(docs);
    return res.render('project', { project: docs });
  });

  // res.render('project', {});
};

const getList = (req, res) => {
  const featured = req.body.featured || null;
  const filters = {};

  return Project.ProjectModel.findProjects(featured, filters, (err, docs) => {
    if (err) {
      console.log(err);

      return res.status(400).json({ error: 'An error occured.' });
    }
    if (!docs) {
      return res.status(200).json({ error: 'No projects found with the selected criteria.' });
    }

    return res.status(200).json({ projects: docs });
  });
};

module.exports = {
  getProject,
  getList,
};
