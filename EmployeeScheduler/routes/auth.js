const express = require('express');
const router = express.Router();
const db = require("../db.js");
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended : true }));

// POST and GET admin/main page.
router.post('/', function(req, res, next) {
  
  let val = req.body;
  let userName = val.userName;
  let userPassword = val.userPassword;
  
  // search for row in table with given username
  // user input automatically sanitized
  let query = 'Select * From user where uid=?';
  db.query(query, [userName], function(error, data) {
    if(error || data.length === 0) {
      console.log('login failed, no user found');
      res.end('login unsuccessfully, please return');
      return;
    }

    // hash inputted password and compare to hash in table
    // salt is saved in table (will be unique for each user and
    // generated upon registration/password set)
    data = data[0];
    bcrypt.hash(userPassword, data.salt, function(err, hash) {
      if(err) {
        console.log(err);
        throw error;
      }

      // compare user input to db value
      // redirect to homepage if valid
      if(hash === data.upassword) {
        console.log('user %s login successfully', userName); // logging
      
        // assignmnents to session
        req.session.isLoggedIn = true;
        // store user permission level to session file
        req.session.permissionLevel = data.permission;
        req.session.userName = data.uid; // store user user name to session file
    
        if(req.session.permissionLevel === "admin") {
          res.redirect('/admin');
        }
        else { // convert to switch if more permission levels added
          res.redirect('/user'); // abstract, direct to non-admin user view
        }
      }
      else {
        console.log('user %s login failed, no matched credential', userName);
        res.end('login unsuccessfully, please return');
      }
    });
  });
});

module.exports = router;