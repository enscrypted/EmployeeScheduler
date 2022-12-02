const express = require('express');
const router = express.Router();

// GET login page.
router.get('/', function(req, res, next) {
  if(req.session.isLoggedIn != true) {
    res.render('login');
  }

  if(req.session.permissionLevel === 'admin') {
    res.redirect('admin')
  }
  // do nothing for current implementation
  // should either redirect to admin or user if logged in
});

// Log out
router.get("/logout", function(req, res){
  if(req.session) {
    req.session.destroy(error => { // delete session file
      if(error) {
        res.status(400).send('Unable to log out');
        console.log('log out error'); // logging
      } else {
        res.redirect("/");
      }
    });
  } else {
    res.end();
  }
});

module.exports = router;
