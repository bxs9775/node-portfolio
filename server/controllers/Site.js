const getIndex = (req, res) => res.render('app', {});
const redirToIndex = (req, res) => res.redirect('/');
const getNotFound = (req, res) => {
  const doc = `the url "${req.headers.host}${req.url}"`;
  return res.render('notFound', { doc });
};

module.exports = {
  getIndex,
  redirToIndex,
  getNotFound,
};
