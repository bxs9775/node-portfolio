const getProject = (req, res) => {
  /*
  Add more here later...
  */
  res.render('project', {});
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
