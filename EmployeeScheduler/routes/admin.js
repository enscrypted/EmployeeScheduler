const express = require('express');
const router = express.Router();
const db = require("../db.js");
const bodyParser = require('body-parser');
const { Shift, Employee, TreeNode} = require('./lib/obj.js');
const { generateSchedule } = require('./lib/generateSchedule.js');

router.use(bodyParser.urlencoded({ extended : true }));

// GET admin main page
router.get('/', function(req, res, next) {
  if(req.session.isLoggedIn == false) { // validating
    res.redirect('/');
  }

  if(req.session.permissionLevel !== "admin") { // validating
    res.redirect('/'); // in later implementation change this to another page
  }

  res.render('admin/home'); 
});


// get method just for testing purpose
// GET current schedule page
router.get('/currentSchedule', function(req, res, next) {
  if(req.session.isLoggedIn == false) { // validating
    res.redirect('/');
  }
  if(req.session.permissionLevel !== "admin") { // validating
    res.redirect('/'); // in later implementation change this to another page
  }

  console.log("REDIRECT WORKS");

  let query = "SELECT isscheduled.eid, name, epos, DATE_FORMAT(start, '%m/%d') as date, DATE_FORMAT(start, '%w') as day, DATE_FORMAT(start, '%H:%i') as start_time, DATE_FORMAT(end, '%H:%i') as end_time FROM employee, isscheduled, shift WHERE isscheduled.eid = employee.eid AND isscheduled.sid = shift.sid order by name;";

  db.query(query, function (error, results) {
    if(error) {
      console.log('query error');
      throw error;
    }

    let prevEid; // Prevent duplicate employees
    let i; // shifts index for each employee
    let employee_sched = []; // a list of employee and their shifts
    let shifts = []; // a list of shift for a employee
    let employee; // employee object

    results.forEach(element => {
      if (element.eid != prevEid){ // push the empolyee and it shifts sets when changing to an new employee
        pair = {
            "employee": employee,
            "shifts": shifts
        };
        employee_sched.push(pair);
        shifts = [];
        i = 0;
      }

      employee = { // other employee attributes can be added later as needed
        "eid": element.eid, // eid will not be needed in UI, this is just for maximize test data passing
        "name": element.name,
        "epos": element.epos
      };

      shifts[i] = {    
        "schedule": element.start_time + "<br>" + element.end_time,
        "day": parseInt(element.day) // INT
      };

      prevEid = element.eid;
      i++;
    });

    pair = {
      "employee": employee,
      "shifts": shifts
    };

    employee_sched.push(pair); // push last set to employee_sched
    employee_sched.shift(); // pop front, employee_sched[0] is a empty set

    // testing data passing with currentSchedule.ejs
    res.render("admin/currentSchedule", {data: employee_sched});
  });
});

// packages generated schedule into form readable by frontend
function packScheduleForDisplay(elist, sol) {
  
  // initialize variables to use in forEach
  let package = [];
  let employee;
  let pair;

  // For each employee, construct an employee object with information
  // needed from class, then pair with a list of all shifts
  // employee's eid is scheduled for
  elist.forEach(function(e) {
    employee = {
      "eid": e.eid,
      "name": e.name,
      "epos": e.position
    }
    

    // multiple functions used to parse array of shifts
    // .filter(...) -> return array of treeNodes with shift 
    //                 containing employee's eid
    // .map(...) -> returns array of objects with necessary information
    //              of each shift in previously returned array
    //
    // this new array is then assigned to a pair with associated employee
    pair = {
      "employee": employee,
      "shifts": sol.filter(s => s.shift.staffing.includes(e.eid))
      .map(function(sh) {
      return {
        sid: sh.shift.sid, 
        schedule: (sh.shift.start + "<br>" + sh.shift.end),
        day: sh.shift.day
      }})
    }

    // add pair to list to be sent back to controller
    package.push(pair);
  });

  return package;
}

// converts generated schedule into form readable saveSchedule
function packScheduleForSave(sol) {
  // initialize space for packaging
  let package = [];

  // loop through each node and create sid, eid pairs
  // (same format as isscheduled table)
  sol.forEach(element => {
    let sid = element.shift.sid;
    
    // loop through each eid in staffing list
    // and create pairs needed
    (element.shift.staffing).forEach(e => {
      let pair = {
        "sid": sid,
        "eid": e
      }

      package.push(pair);
    });
  });

  return package;
}


// GET: generate a new employee schedule base on employee availabilities
router.get('/generateSchedule', function(req, res, next) {
  if(req.session.isLoggedIn == false) { // validating
    res.redirect('/');
  }
  if(req.session.permissionLevel !== "admin") { // validating
    res.redirect('/'); // in later implementation change this to another page
  }

  let query = "SELECT sid, DATE_FORMAT(start, '%w') as day, DATE_FORMAT(start, '%H') as start_time, DATE_FORMAT(end, '%H') as end_time, req FROM shift;";
  let slist = [];
  let elist = [];

  db.query(query, function(error, results) {
    if(error) {
      console.log('query error'); // error logging
      throw error;
    }

    slist = results.map(e => new Shift(e.sid, parseInt(e.start_time), parseInt(e.end_time), JSON.parse(e.req), parseInt(e.day)));
    query = "SELECT ava.eid, epos, name, time FROM employee, ava WHERE ava.eid = employee.eid;";
  
    db.query(query, function(error, results) {
      if(error) {
        console.log('query error'); // error logging
        throw error;
      }

      // 40 max hours for each employee in current implementation but will need to be changed later
      elist = results.map(e => new Employee(e.eid, e.epos, Object.values(JSON.parse(e.time)), e.name, 40));

      // find solution from employee availabilities
      let sol = generateSchedule(slist, elist);

      // if no solution available reroute to main
      // will be different page in full release
      if (!sol) {
        res.redirect('/');
        return;
      }

      let displayList = packScheduleForDisplay(elist, sol); // repack the solution data for displaying to user

      let saveList = packScheduleForSave(sol); // repack the solution data for saving to database

      res.render('admin/generatedSchedule', {
        data: displayList,
        saveList: saveList
      });

    });
  });
});

router.post('/saveSchedule', function(req, res) {
  let val = req.body;

  // removes existing info from isScheduled
  let query = 'DELETE FROM isScheduled';
  db.query(query, function(err, result) {
    if(err) {
      console.log(err);
      throw err;
    }
    
    // initialize query string, build through iteration
    let q = 'INSERT INTO isscheduled(eid, sid) VALUES ';
    
    // for each employee, add a row for each shift contained in their
    // associated shift array
    (JSON.parse(val.saveList)).forEach(function(e) {
      console.log(e);
      q += ' (' + e.eid + ',' + e.sid + '),'; 
    });

    // erase last comma in string
    q = q.slice(0, -1);

    // add semicolon to complete sql statement
    q += ';';

    // insert new info into table
    db.query(q, function(error, result) {
      if(error) {
        console.log(error);
        throw error;
      }

    // redirect to currentSchedule, giving new data in process
    res.redirect('/admin/currentSchedule');
    });
  });
});


module.exports = router;
