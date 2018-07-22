const models = require('../models');

const { Project } = models;

const getProject = (request, response) => {
  const req = request;
  const res = response;

  const url = req.url.split('/');
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
  const featured = req.query.featured || null;
  const filters = {};

  if (req.query.languages) {
    filters.languages = req.query.languages;
  }
  if (req.query.skills) {
    filters.skills = req.query.skills;
  }

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

const getFilters = (req, res) => {
  const success = (result) => {
    const [languages, skills] = result;
    return res.status(200).json({ languages, skills });
  };
  const error = (err) => {
    console.dir(err);
    return res.status(400).json({ error: 'An error occured.' });
  };
  return Project.ProjectModel.getFilterValues(success, error);
};

module.exports = {
  getProject,
  getList,
  getFilters,
};
