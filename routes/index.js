const passport = require("passport");

const router = require("express").Router();

router.use('/', require('./swagger'));

// router.get("/", (req, res) => {
//   //#swagger.tags=['Hello World']
//   res.send("Hello World");
// });

router.use('/bookings', require('./bookings'));

router.use('/clients', require('./clients'));

router.use('/hotels', require('./hotels'));

router.use('/staff', require('./staff'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
  req.logOut(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;
