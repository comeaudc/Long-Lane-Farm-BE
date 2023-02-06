const auth = require('./auth');

module.exports = function (req, res, next) {
  auth(req, res, async () => {
    const user = await User.findById(req.user.id).select('-password');
console.log(user.isAdmin)
    if (user.isAdmin) {
      next();
    } else {
      res.status(403).send('Not Admin, authorization denied');
    }
  });
};
