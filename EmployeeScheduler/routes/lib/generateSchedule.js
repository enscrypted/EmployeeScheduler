// Logic to generate a viable Schedule given a list of Shifts and a list of Employees
// Uses Recursive Backtracking to generate tree of all possible shift populations,
// pruning non-viable nodes as it goes. Once the last shift in the list has been filled successfully,
// a list of viable shifts is generated and passed back to controller

var _ = require('underscore');

// object definition for node on tree
class TreeNode {
  constructor(){
    this.shift = null;
    this.parent = null;
    this.children = [];
  }
};

// launcher function for algorithm, creates root node and populates children
function generateSchedule(shifts, employees) {
  if(!employees && !shifts) {
    return undefined;
  }

  // initialize tree
  let root = new TreeNode();

  // call function t0 recursively builds tree
  let solution = findChildren(root, employees, shifts, shifts[0], 0);

  // will contain list of filled shifts
  let schedule = [];

  // findChildren returns deepest shift in tree, traverse upwards through parents
  // and append to front of schedule
  if(solution) {
    while(solution.shift) {
      schedule.unshift(solution);
      solution = solution.parent;
    }

    // pass schedule back to controller
    return schedule;
  }

  // pass undefined to represent no valid solution
  return undefined;
}

// populates a shift object with given employee state
// returns undefined if any employee cannot work, as state
// is predefined to hold exact number of employees needed
function fillShift(state, shift) {

  // normalized equation for all shift time differences
  let shiftLen = (shift.end + 24 - shift.start) % 24;

  // validate employee availability and maxhrs left for all employee
  for (let employee of state) {

    // calculate constraints to make all valid options result in val > 0
    let maxTime = employee.maxhrs - shiftLen;
    let start = shift.start - employee.availability[2 * shift.day];
    let end = employee.availability[2 * shift.day + 1] - shift.end;

    // if shift wraps to next day, ensure employee's availability
    // starts at midnight
    //
    // stopgap measure, need better methodology for full release
    if(shift.end < shift.start) {
      end = 0 - employee.availability[2 * (shift.day + 1) % 14];
    }

    // make sure all values are within acceptable range and add employee
    // to shift
    let checkList = [maxTime, start, end];
    if(!checkList.every((val) => val >= 0)) {
      // if any employee fails shift is incomplete, return undefined
      return undefined;
    }
  
    shift.staffing.push(employee.eid);
  }

  // decrement maxhrs for all employees on shift only after shift confirmed valid
  state = state.map(function(e){
    e.maxhrs -= shiftLen;
  });
                                  
  // return completed shift object
  return shift;
}

// wrapper function to give getCombos and getShiftStates access to combos and temp arrays.
// could use global variables instead, but will present issue when made parallel
function comboWrapper(employees, n, i, funcSwitch, len = 0) {

  // "global" arrays for manipulation by wrapped functions
  let combos = [];
  let temp = [];

  // find all combinations of passed employee array with
  // n-number of people needed
  // employees: [Employee]
  // n: int, number of employees required
  // i: index, used for recursion
  // len: employeeList.length
  //
  // no logic implemented for case where not enough employees for requirements
  // need for full release
  function getCombos(employees, n, i, len) {
    // all requirements are met
    if(n === 0) {
      combos.push(temp.map(e => e));
      return combos;
    }

    // recursively build tree of all possible combinations
    for(let j = i; j < len; ++j) {
      temp.push(employees[j]);
      getCombos(employees, n - 1, j + 1, len);
      temp.pop();
    }

    // return value ignored during recursive calls, needed for original caller
    return combos;
  }

  // recursively iterate through each list of employee combinations and find
  // all unique combinations of those (1 employee_combination for each position)
  // employees: [Employee]
  // n: int, number of positions
  // i: [int], list of indexes for each position array, used during recursion
  function getShiftStates(employees, n, i) {
    // build combination (one item from each array)
    for(let employeeList of employees) {
      temp.push(employeeList[i[employees.indexOf(employeeList)]].map(s => s));
    }

    // save combination
    combos.push(temp.map(s => s));

    // reset array for next loop
    temp = [];

    // find left-most column with items not traversed
    let next = n - 1;
    while(next >= 0 && i[next] + 1 >= employees[next].length) {
      --next;
    }

    // if none found, no combinations remaining
    if(next < 0) {
      return combos;
    }

    // increment index if successful find
    i[next]++;

    // set index of all arrays to right of previously found item
    // to 0
    for(let j = next + 1; j < n; ++j) {
      i[j] = 0;
    }

    // recursive call
    getShiftStates(employees, n, i);

    // end state
    return combos;
  }

  // logic to route to correct function
  switch(funcSwitch) {
    case 0:
      return getCombos(employees, n, i , len);
    case 1:
      return getShiftStates(employees, n, i);
    default:
      console.log("comboWrapper: funcSwitch bad input");
  }

  // returns undefined if error
  return undefined;
}

// recursively build possible state tree using a backtracking implementation
// to prune unnecessary branches and return first viable solution
// will need to be modified in full release to pass list of all  viable solutions
// to preference calculator when requirement is implemented
function findChildren(node, employees, shifts, shift, depth) {
 
    // parse keys from requirements object into list to obtain position types
    let positions = Object.keys(shift.requirements);
   
    // 2d array containing list of employees separated by position title
    let employeesByPosition = [];

    // populate employeesByPosition
    for(let pos of positions) {
      employeesByPosition.push(employees.filter(res => res.position === pos));
    }

    // filter out any empty lists (if position not needed on shift)
    employeesByPosition = employeesByPosition.filter(res => res.length > 0);

    // 3d array containing lists of sets of possible employee combinations separated
    // by position title
    let shiftCombos = [];

    // populate shiftCombos by calling getCombos via comboWrapper
    for(let employeeList of employeesByPosition) {
    shiftCombos.push(comboWrapper(employeeList, shift.requirements[employeeList[0].position], 0,
                                  0, employeeList.length));
    }

    // declare and initialize array to hold all possible shift states
    // by calling getShiftStates through comboWrapper
    let indexList = new Array(shiftCombos.length).fill(0);
    let shiftStates = comboWrapper(shiftCombos, shiftCombos.length, indexList, 1);

    // if no states found, prune branch
    if(!shiftStates) {
      return undefined;
    }

    // shiftStates structured as [[[cook, cook], [manager]. [server]], [[cook, cook], [manager]. [server]]]
    // need to reduce separation to [[cook, cook, manager, server], [cook, cook....]]
    // this array stores reduced shiftStates
    let shiftStatesFlattened = [];

    // use underscore's flatten method and push each
    // flattened state to shiftStatesFlattened
    shiftStatesFlattened = shiftStates.map(state => _.flatten(state));

    // define solution tree
    let solution;

    // generate shift object for each calculated state
    for (let state of shiftStatesFlattened) {
      // initialize new node, record parent node, and call fillShift
      let newNode = new TreeNode();
      newNode.parent = node;
      newNode.shift = fillShift(state, JSON.parse(JSON.stringify(shift)));
      newNode.children = [];

      // check if state is valid
      if(newNode.shift) {
        node.children.push(newNode);
        // if parent node is 2nd to last and newNode works, solution found
        
        if(depth === shifts.length - 1) {
          return newNode;
        }
        
        // recursively search children of valid node
        // before generating sibling nodes
        solution = findChildren(newNode, employees, shifts, shifts[depth + 1], depth + 1);
      }
    }

    // if solution found, send to controller
    if(solution) {
      return solution;
    }

    // if no valid state return undefined
    return undefined; 

}

// Print tree
function printTree(head) {
  console.log(head.shift);
  // base case: no children, print node
  if(head.children.length != 0) {
    console.log("---");
    for (let child of head.children) {
        printTree(child);
    }
  }
}

// export to use for tests
module.exports = {generateSchedule, fillShift, findChildren};
