// object declarations to be used in all parts of app

// shift object containing all information needed for schedule generation
class Shift {
  constructor(sid, start, end, requirements, day) {
  this.sid = sid                          // int
  this.start = start;                     // int
  this.end = end;                         // int
  this.requirements = requirements;       // [requirements]
  this.staffing = [];                     // [int]
  this.day = day;                         // int
  }
};

// employee object containing all information needed for schedule generation
class Employee {
  constructor(eid, position, availability, name, maxhrs) {
  this.eid = eid;                         // int
  this.position = position;               // string
  this.availability = availability;       // [int] in format [startSun, endSun, startMon.....]
  this.name = name;
  this.maxhrs = maxhrs;                   // int
  }
};


module.exports = {
  Shift,
  Employee
};