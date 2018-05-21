const getIndex = (req, res) => res.render('app', {});
const getNotFound = (req, res) => res.render('notFound', { url: req.url, host: req.headers.host });

module.exports = {
  getIndex,
  getNotFound,
};
