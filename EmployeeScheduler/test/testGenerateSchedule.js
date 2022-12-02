// Test data
const { Shift, Employee } = require("../routes/lib/obj.js");
const { generateSchedule, fillShift, findChildren,  } = require("../routes/lib/generateSchedule.js");

const andrew = new Employee(1, "cook", [9, 17, 9, 17, 9, 17, 9, 17, 9, 17, 9, 17, 9, 17], 8);
const jessica = new Employee(2, "cook", [9, 17, 9, 17, 9, 17, 9, 17, 9, 17, 9, 17, 9, 17], 40);
const abdullah = new Employee(3, "server", [9, 17, 9, 17, 9, 17, 9, 17, 9, 17, 9, 17, 9, 17], 40);
const joanne = new Employee(4, "server", [9, 17, 9, 17, 9, 17, 9, 17, 9, 17, 9, 17, 9, 17], 40);
const staffing = [andrew, abdullah, joanne, jessica];

const firstRequirements = {
    cook: 1,
    server: 0,
    manager: 0
};
const secondRequirements = {
    cook: 1,
    server: 1,
    manager: 0
};

const req1 = {
  cook: 1,
  server: 1,
  manager: 0
};

const req2 = {
  cook: 1,
  server: 0,
  manager: 0
};

const req3 = {
    cook: 1,
    server: 2,
    manager: 1
};

const req4 = {
    cook: 1,
    server: 1,
    manager: 1
};

const root = {
  shift: null,
  children: []
};

let firstShift = new Shift(1, 9, 17, firstRequirements, 1);
let secondShift = new Shift(2, 9, 17, firstRequirements, 1)
const ex1 = new Shift(1, 9, 17, secondRequirements, 1);
ex1.staffing = [1, 3, 2];
const ex2 = new Shift(2, 9, 17, secondRequirements, 1);
ex2.staffing = [1, 2]
expected = [ex1, ex2];
const shifts1 = [firstShift, secondShift];

function testFillShift() {
  originalShift1 = JSON.parse(JSON.stringify(firstShift));
  result = fillShift([andrew], firstShift, root);
  secondShift.staffing.push(andrew.eid);
  if(result.start === secondShift.start && result.end === secondShift.end && result.requirements.toString() === secondShift.requirements.toString()
    && result.staffing.toString() === secondShift.staffing.toString()&& result.day === secondShift.day) {
      console.log("fillShift test passed!");
    } else {
      console.log("fillShift test failed.")
      console.log(result);
      console.log(secondShift);
    }
    firstShift = originalShift1;
    secondShift.staffing.pop();
}

function testFindChildren() {
  const shifts = [firstShift, secondShift];
  findChildren(root, staffing, shifts, firstShift, 0);
  // Tree should have depth = 2
  if(root.children.length > 0 && root.children[0].children.length > 0 && root.children[0].children[0].children.length === 0) {
    console.log("findChildren test passed!");
  } else {
    console.log("findChildren test failed.");
    console.log(root.children.length);
    console.log(root.children[0].children.length);
    console.log(root.children[0].children[0].children.length);
  }
}

function testGenerateSchedule(shifts, staffing, expected) {
  let result = generateSchedule(shifts, staffing);
  if(result && expected) {
    if (result.toString() === expected.toString()) {
      console.log("generateSchedule test passed!");
    } else {
      console.log("generateSchedule test failed.")
    }
  } else {
    if(result == expected) {
      console.log("generateSchedule test passed!");
    } else {
      console.log("generateSchedule test failed.")
    }
  }

}

function test3() {
  const shift1 = new Shift(1, 9, 17, req1, 1);
  const shift2 = new Shift(2, 15, 22, req2, 1);
  const shift3 = new Shift(3, 9, 17, req1, 2);
  const shift4 = new Shift(4, 15, 22, req2, 2);
  const shifts = [shift1, shift2, shift3, shift4];
  const tom = new Employee(1, "cook", [9, 17, 9, 17, 9, 17, 9, 17, 9, 17, 9, 17, 9, 17], 40);
  const joe = new Employee(2, "cook", [10, 23, 10, 23, 10, 23, 10, 23, 10, 23, 10, 23, 10, 23], 40);
  const richard = new Employee(3, "server", [10, 23, 10, 23, 10, 23, 10, 23, 10, 23, 10, 23, 10, 23], 40);
  const harry = new Employee(4, "server", [9, 17, 9, 17, 9, 17, 9, 17, 9, 17, 9, 17, 9, 17], 40);
  const employees = [tom, joe, richard, harry];

  let sched = generateSchedule(shifts, employees);

  console.assert(sched.length === 4, "Schedule List Length Test Failed");
  console.assert(sched[0].shift.sid === 1, "Shift 1 Index 0 Test Failed (Out of Expected Order)");
  console.assert(sched[0].shift.staffing[0] === tom.eid, "Shift 1 Employee 1 Test failed");
  console.assert(sched[0].shift.staffing[1] === harry.eid, "Shift 1 Employee 2 Test failed");

  console.assert(sched[1].shift.sid === 2, "Shift 2 Index 1 Test Failed (Out of Expected Order)");
  console.assert(sched[1].shift.staffing[0] === joe.eid), "Shift 2 Employee 1 Test failed";

  console.assert(sched[2].shift.sid === 3, "Shift 3 Index 2 Test Failed (Out of Expected Order)");
  console.assert(sched[2].shift.staffing[0] === tom.eid, "Shift 3 Employee 1 Test failed");
  console.assert(sched[2].shift.staffing[1] === harry.eid, "Shift 3 Employee 2 Test failed");

  console.assert(sched[3].shift.sid === 4, "Shift 4 Index 3 Test Failed (Out of Expected Order)");
  console.assert(sched[3].shift.staffing[0] === joe.eid, "Shift 4 Employee 1 Test failed");

  console.log("Test 3 (Multiple Shifts Multiple Days Valid) Passed");
}

function test4() {
  const shift1 = new Shift(1, 9, 17, req1, 1);
  const shift2 = new Shift(2, 15, 22, req2, 1);
  const shift3 = new Shift(3, 9, 17, req1, 2);
  const shift4 = new Shift(4, 15, 22, req2, 2);
  const shifts = [shift1, shift2, shift3, shift4];
  const tom = new Employee(1, "cook", [9, 17, 9, 17, 9, 17, 9, 17, 9, 17, 9, 17, 9, 17], 40);
  const joe = new Employee(2, "cook", [9, 17, 9, 17, 9, 17, 9, 17, 9, 17, 9, 17, 9, 17], 40);
  const richard = new Employee(3, "server", [10, 23, 10, 23, 10, 23, 10, 23, 10, 23, 10, 23, 10, 23], 40);
  const harry = new Employee(4, "server", [9, 17, 9, 17, 9, 17, 9, 17, 9, 17, 9, 17, 9, 17], 40);
  const employees = [tom, joe, richard, harry];

  let sched = generateSchedule(shifts, employees);

  console.assert(!sched, "Invalid Schedule Test Failed");

  console.log("Test 4 (Multiple Shifts Multiple Days Invalid) Passed");
}

// testing generation with requirements needed for all employee type,
// multiple shifts, multiple day and expecting correct schedule
// also testing position requirement > 1
function test5() {
    const shift1 = new Shift(1, 9, 17, req1, 1);
    const shift2 = new Shift(2, 15, 22, req2, 1);
    const shift3 = new Shift(3, 9, 17, req1, 2);
    const shift4 = new Shift(4, 15, 22, req2, 2);
    const shift5 = new Shift(5, 9, 17, req3, 3);
    const shift6 = new Shift(6, 15, 22, req4, 3);
    const shifts = [shift1, shift2, shift3, shift4, shift5, shift6];
    const tom = new Employee(1, "cook", [9, 17, 9, 17, 9, 17, 9, 17, 9, 17, 9, 17, 9, 17], 40);
    const joe = new Employee(2, "cook", [10, 23, 10, 23, 10, 23, 10, 23, 10, 23, 10, 23, 10, 23], 40);
    const richard = new Employee(3, "server", [10, 23, 10, 23, 10, 23, 10, 23, 10, 23, 10, 23, 10, 23], 40);
    const harry = new Employee(4, "server", [9, 17, 9, 17, 9, 17, 9, 17, 9, 17, 9, 17, 9, 17], 40);
    const bob = new Employee(5, "server", [9, 17, 9, 17, 9, 17, 9, 17, 9, 17, 9, 17, 9, 17], 40);
    const karen = new Employee(6, "manager", [10, 23, 10, 23, 10, 23, 10, 23, 10, 23, 10, 23, 10, 23], 40);
    const susan = new Employee(7, "manager", [9, 17, 9, 17, 9, 17, 9, 17, 9, 17, 9, 17, 9, 17], 40);
    const employees = [tom, joe, richard, harry, bob, karen, susan];

    let sched = generateSchedule(shifts, employees);

    console.assert(sched.length === 6, "Schedule List Length Test Failed");
    console.assert(sched[0].shift.sid === 1, "Shift 1 Index 0 Test Failed (Out of Expected Order)");
    console.assert(sched[0].shift.staffing[0] === tom.eid, "Shift 1 Employee 1 Test failed");
    console.assert(sched[0].shift.staffing[1] === harry.eid, "Shift 1 Employee 2 Test failed");

    console.assert(sched[1].shift.sid === 2, "Shift 2 Index 1 Test Failed (Out of Expected Order)");
    console.assert(sched[1].shift.staffing[0] === joe.eid), "Shift 2 Employee 1 Test failed";

    console.assert(sched[2].shift.sid === 3, "Shift 3 Index 2 Test Failed (Out of Expected Order)");
    console.assert(sched[2].shift.staffing[0] === tom.eid, "Shift 3 Employee 1 Test failed");
    console.assert(sched[2].shift.staffing[1] === harry.eid, "Shift 3 Employee 2 Test failed");

    console.assert(sched[3].shift.sid === 4, "Shift 4 Index 3 Test Failed (Out of Expected Order)");
    console.assert(sched[3].shift.staffing[0] === joe.eid, "Shift 4 Employee 1 Test failed");

    console.assert(sched[4].shift.sid === 5, "Shift 5 Index 4 Test Failed (Out of Expected Order)");
    console.assert(sched[4].shift.staffing[0] === tom.eid, "Shift 5 Employee 3 Test failed");
    console.assert(sched[4].shift.staffing[1] === harry.eid, "Shift 5 Employee 3 Test failed");
    console.assert(sched[4].shift.staffing[2] === bob.eid, "Shift 5 Employee 3 Test failed");
    console.assert(sched[4].shift.staffing[3] === susan.eid, "Shift 5 Employee 4 Test failed");

    console.assert(sched[5].shift.sid === 6, "Shift 6 Index 5 Test Failed (Out of Expected Order)");
    console.assert(sched[5].shift.staffing[0] === joe.eid, "Shift 6 Employee 1 Test failed");
    console.assert(sched[5].shift.staffing[1] === richard.eid, "Shift 3 Employee 2 Test failed");
    console.assert(sched[5].shift.staffing[2] === karen.eid, "Shift 3 Employee 3 Test failed");

    console.log("Test 5 (All Positions Required Multiple Instance of Position Required Valid) Passed");
  }

// testing same constraints as test 5 but invalid schedule expected
function test6() {
    const shift1 = new Shift(1, 9, 17, req1, 1);
    const shift2 = new Shift(2, 15, 22, req2, 1);
    const shift3 = new Shift(3, 9, 17, req1, 2);
    const shift4 = new Shift(4, 15, 22, req2, 2);
    const shift5 = new Shift(5, 9, 17, req3, 3);
    const shift6 = new Shift(6, 15, 22, req4, 3);
    const shifts = [shift1, shift2, shift3, shift4, shift5, shift6];
    const tom = new Employee(1, "cook", [9, 17, 9, 17, 9, 17, 9, 17, 9, 17, 9, 17, 9, 17], 40);
    const joe = new Employee(2, "cook", [10, 23, 10, 23, 10, 23, 10, 23, 10, 23, 10, 23, 10, 23], 40);
    const richard = new Employee(3, "server", [10, 23, 10, 23, 10, 23, 10, 23, 10, 23, 10, 23, 10, 23], 40);
    const harry = new Employee(4, "server", [9, 17, 9, 17, 9, 17, 9, 17, 9, 17, 9, 17, 9, 17], 40);
    const bob = new Employee(5, "server", [9, 17, 9, 17, 9, 17, 9, 17, 9, 17, 9, 17, 9, 17], 40);
    const karen = new Employee(6, "manager", [9, 17, 9, 17, 9, 17, 9, 17, 9, 17, 9, 17, 9, 17], 40);
    const susan = new Employee(7, "manager", [9, 17, 9, 17, 9, 17, 9, 17, 9, 17, 9, 17, 9, 17], 40);
    const employees = [tom, joe, richard, harry, bob, karen, susan];

    let sched = generateSchedule(shifts, employees);

    console.assert(!sched, "Invalid Schedule Test Failed");

    console.log("Test 6 (All Positions Required Multiple Instance of Position Required Invalid) Passed");
  }

// Unit tests

// Test case 1: Simple arguments, 2 shifts, 4 employees, simple identical availabilities and requirements
testFillShift();
testFindChildren();
testGenerateSchedule(shifts1, staffing, expected);

// Test Case 2: Empty arguments
shifts2 = [];
staffing2 = [];
expected = undefined;
testGenerateSchedule(shifts2, staffing2);

// Test Case 3: Multiple overlapping shifts, multiple days, larger employee roster
test3();

// Test Case 4: Case 3 but no valid solution, expect no solution
test4();

// Test Case 5: Complicated schedule, need multiple of each employee role type on each shift over multiple days
test5();

// Test Case 6: Case 3 but no valid solution, expect no solution
test6();