

# Automated Employee Scheduler

### Version 0.1.0

#### Prepared by Nathan Brannan, Ashton Carruthers, Ken Mills, Zifeng Yuan, Andrew Santa
##### Acknowledgement to [@kilgallin](https://www.github.com/kilgallin) for providing the necessary environment  for development

###### (click [here](#install) to skip to setup instructions)

## 1. Introduction

### 1.1 Purpose

*The purpose of the Automated Employee Scheduler is to simplify the scheduling process for companies. Automation will decrease the time cost that scheduling would otherwise result in, while also providing more accurate schedules. Standard functions for management are included as well, such as employee information lookup or modification, changing availability, setting preference hours, requesting leave, and clocking in and out. By taking into consideration an employee's preference as well as availability, an "optimal" schedule can be found by quantifying employees' satisfaction of the schedule via their selected preferences and searchiing for the personnel combination that has the highest satisfaction rate among all employees*

### 1.2 Product Scope

*The Automated Employee Scheduler will accurately determine an employee schedule, removing the necessity for man hours to be wasted. Automating schedule production allows for cut costs and redistribution of resources. With the inclusion of a full scheduling environment, a company would have an all in one solution for any scheduling need.*

## 2. Overall Description

### 2.1 Product Perspective

*The Automated Employee Scheduler is a new standalone product.*

### 2.2 Product Functions

- *Automate employee scheduling*

- *Give wide array of functionality to admin/scheduler*

### 2.3 User Classes and Characteristics

*The primary user class is business scheduling managers. Frequent, weekly use is expected, and a barebones understanding of scheduling constraints is assumed. The manager should be familiar with the process of schedule generation by hand, to properly manage schedule constraints. Employees’ use of this tool is expected to be less technically intense, but more frequent. Almost no assumptions are made about technical expertise. Most UX concerns are focused on the employee user class.*

### 2.4 Operating Environment

*The software is accessible from a website, running in any computer or mobile browser. The backend may run in either a Windows or Linux environment on the server.*

## 3. External Interface Requirements

### 3.1 User Interfaces

*The user interfaces focus on simplicity while still being functional. The employee-oriented interfaces will feature large, simple buttons. These menus should be usable on touch-screen and mobile displays and require almost no technical proficiency. Meanwhile, the administrative, manager-oriented menus will function best with a keyboard, meant to run on a desktop or laptop machine. These will require some ability to interpret the function of input boxes. Error messages will display in a popup window with red text, drawing attention.*

### 3.2 Hardware Interfaces

*The software is usable on computers, tablets, and mobile phones. Any hardware that can embed a web browser window should be able to run it.*

## 4. System Features

*This system provides self-check-in and self-setting availability and preference schedules for employees, and allows schedulers to automatically calculate the best schedule through employee settings.*

### 4.1 Employee Management

*This feature provides managers with an Identity and Access Management system to delegate privileges to employees. High priority.*

### 4.2 Automated employee scheduling

*Allows schedulers to automatically calculate the most suitable schedule based on employee availability and preference. High priority.*

### 4.3 Manual Entry

*Allows schedulers to make manual changes to generated schedules, employee availability, time-off requests, clock-in/out times, etc. High priority.*

### 4.4 Employee Permissions

*Allows employees to request availability change, request time-off, set shift preferences, and clock in/out. High priority.*

## 5. Other Nonfunctional Requirements

### 5.1 Performance Requirements

*The scheduler will function well at scale; some users may need to schedule hundreds of employees at once. Apart from generating a schedule with large numbers of employees, no other function should have a noticeable performance buffer.*

### 5.2 Security Requirements

*Both employee and manager access paths are secured by a log-in system.*

### 5.3 Business Rules

*Employee roles/titles are assumed to be discrete within an organization. Each employee has a specific job title. Time off requests or changes to availability are assessed by a manager; the scheduler system does not assess their validity.*

## <a name="install"></a>Installation

1. npm, node.js, MySQL are required
2. create a schema named employee_schedule in MySQL
3. import test/employee_schedule.sql data file to this schema (or use as a reference to format your own data)
    * if utf8mb4_0900_ai_ci error occurs, open the .sql in notepad and change  all utf8mb4_0900_ai_ci to utf8mb4_general_ci
4. go to db.js file change line 6 content to your MySQL server password
    * MySQL server default password should be empty
    * change "host", "user", "database", and "port" as needed
5. run "npm install" command to install all required modules
6. run "node ./bin/www" command to start running node.js server
    * can also run "npm run dev" to enter developer mode if nodemon is installed
