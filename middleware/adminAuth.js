const auth = require('./auth');

module.exports = function (req, res, next) {
  auth(req, res, async () => {
    const user = await User.findById(req.user.id).select('-password');
    if (user.isAdmin) {
      next();
    } else {
      res.status(403).send('Not Admin, authorization denied');
    }
  });
};
