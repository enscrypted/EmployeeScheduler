-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 22, 2022 at 08:15 PM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `employee_schedule`
--

-- --------------------------------------------------------

--
-- Table structure for table `ava`
--

DROP TABLE IF EXISTS `ava`;
CREATE TABLE IF NOT EXISTS `ava` (
  `eid` int(11) NOT NULL,
  `time` json NOT NULL,
  KEY `eid_idx` (`eid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ava`
--

INSERT INTO `ava` (`eid`, `time`) VALUES
(17482935, '{\"0\": 0, \"1\": 23, \"2\": 0, \"3\": 23, \"4\": 0, \"5\": 23, \"6\": 0, \"7\": 23, \"8\": 0, \"9\": 23, \"10\": 0, \"11\": 23, \"12\": 0, \"13\": 23}'),
(12342987, '{\"0\": 0, \"1\": 23, \"2\": 0, \"3\": 23, \"4\": 0, \"5\": 23, \"6\": 0, \"7\": 23, \"8\": 0, \"9\": 23, \"10\": 0, \"11\": 23, \"12\": 0, \"13\": 23}'),
(17459283, '{\"0\": 0, \"1\": 23, \"2\": 0, \"3\": 23, \"4\": 0, \"5\": 23, \"6\": 0, \"7\": 23, \"8\": 0, \"9\": 23, \"10\": 0, \"11\": 23, \"12\": 0, \"13\": 23}'),
(17482938, '{\"0\": 0, \"1\": 23, \"2\": 0, \"3\": 23, \"4\": 0, \"5\": 23, \"6\": 0, \"7\": 23, \"8\": 0, \"9\": 23, \"10\": 0, \"11\": 23, \"12\": 0, \"13\": 23}'),
(17483920, '{\"0\": 0, \"1\": 23, \"2\": 0, \"3\": 23, \"4\": 0, \"5\": 23, \"6\": 0, \"7\": 23, \"8\": 0, \"9\": 23, \"10\": 0, \"11\": 23, \"12\": 0, \"13\": 23}'),
(17492283, '{\"0\": 0, \"1\": 23, \"2\": 0, \"3\": 23, \"4\": 0, \"5\": 23, \"6\": 0, \"7\": 23, \"8\": 0, \"9\": 23, \"10\": 0, \"11\": 23, \"12\": 0, \"13\": 23}'),
(23748905, '{\"0\": 0, \"1\": 23, \"2\": 0, \"3\": 23, \"4\": 0, \"5\": 23, \"6\": 0, \"7\": 23, \"8\": 0, \"9\": 23, \"10\": 0, \"11\": 23, \"12\": 0, \"13\": 23}'),
(25794832, '{\"0\": 0, \"1\": 23, \"2\": 0, \"3\": 23, \"4\": 0, \"5\": 23, \"6\": 0, \"7\": 23, \"8\": 0, \"9\": 23, \"10\": 0, \"11\": 23, \"12\": 0, \"13\": 23}'),
(26789143, '{\"0\": 0, \"1\": 23, \"2\": 0, \"3\": 23, \"4\": 0, \"5\": 23, \"6\": 0, \"7\": 23, \"8\": 0, \"9\": 23, \"10\": 0, \"11\": 23, \"12\": 0, \"13\": 23}'),
(27184923, '{\"0\": 0, \"1\": 23, \"2\": 0, \"3\": 23, \"4\": 0, \"5\": 23, \"6\": 0, \"7\": 23, \"8\": 0, \"9\": 23, \"10\": 0, \"11\": 23, \"12\": 0, \"13\": 23}'),
(27948357, '{\"0\": 0, \"1\": 23, \"2\": 0, \"3\": 23, \"4\": 0, \"5\": 23, \"6\": 0, \"7\": 23, \"8\": 0, \"9\": 23, \"10\": 0, \"11\": 23, \"12\": 0, \"13\": 23}'),
(40292813, '{\"0\": 0, \"1\": 23, \"2\": 0, \"3\": 23, \"4\": 0, \"5\": 23, \"6\": 0, \"7\": 23, \"8\": 0, \"9\": 23, \"10\": 0, \"11\": 23, \"12\": 0, \"13\": 23}'),
(57194823, '{\"0\": 0, \"1\": 23, \"2\": 0, \"3\": 23, \"4\": 0, \"5\": 23, \"6\": 0, \"7\": 23, \"8\": 0, \"9\": 23, \"10\": 0, \"11\": 23, \"12\": 0, \"13\": 23}'),
(57283492, '{\"0\": 0, \"1\": 23, \"2\": 0, \"3\": 23, \"4\": 0, \"5\": 23, \"6\": 0, \"7\": 23, \"8\": 0, \"9\": 23, \"10\": 0, \"11\": 23, \"12\": 0, \"13\": 23}'),
(59274013, '{\"0\": 0, \"1\": 23, \"2\": 0, \"3\": 23, \"4\": 0, \"5\": 23, \"6\": 0, \"7\": 23, \"8\": 0, \"9\": 23, \"10\": 0, \"11\": 23, \"12\": 0, \"13\": 23}'),
(59847234, '{\"0\": 0, \"1\": 23, \"2\": 0, \"3\": 23, \"4\": 0, \"5\": 23, \"6\": 0, \"7\": 23, \"8\": 0, \"9\": 23, \"10\": 0, \"11\": 23, \"12\": 0, \"13\": 23}'),
(71049283, '{\"0\": 0, \"1\": 23, \"2\": 0, \"3\": 23, \"4\": 0, \"5\": 23, \"6\": 0, \"7\": 23, \"8\": 0, \"9\": 23, \"10\": 0, \"11\": 23, \"12\": 0, \"13\": 23}'),
(74892834, '{\"0\": 0, \"1\": 23, \"2\": 0, \"3\": 23, \"4\": 0, \"5\": 23, \"6\": 0, \"7\": 23, \"8\": 0, \"9\": 23, \"10\": 0, \"11\": 23, \"12\": 0, \"13\": 23}'),
(82916743, '{\"0\": 0, \"1\": 23, \"2\": 0, \"3\": 23, \"4\": 0, \"5\": 23, \"6\": 0, \"7\": 23, \"8\": 0, \"9\": 23, \"10\": 0, \"11\": 23, \"12\": 0, \"13\": 23}'),
(98723471, '{\"0\": 0, \"1\": 23, \"2\": 0, \"3\": 23, \"4\": 0, \"5\": 23, \"6\": 0, \"7\": 23, \"8\": 0, \"9\": 23, \"10\": 0, \"11\": 23, \"12\": 0, \"13\": 23}');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
CREATE TABLE IF NOT EXISTS `employee` (
  `eid` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `epos` varchar(45) NOT NULL,
  PRIMARY KEY (`eid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`eid`, `name`, `epos`) VALUES
(12342987, 'Stephanie Richards', 'Dishwasher'),
(17459283, 'Narly Fart', 'Owner'),
(17482935, 'Yuan Zifeng', 'Cleanup'),
(17482938, 'Larva Gross', 'Manager'),
(17483920, 'Patty Spunk', 'Cleanup'),
(17492283, 'Oh Hithere', 'Cook'),
(23748905, 'Dorkus Stevenson', 'Dishwasher'),
(25794832, 'Thicky Widdit', 'Cook'),
(26789143, 'Gordon Gordon', 'Dishwasher'),
(27184923, 'Marshall Lambert', 'Manager'),
(27948357, 'Veronica Sheep', 'Cook'),
(40292813, 'Large Boi', 'Cook'),
(57194823, 'Smort Employee', 'Server'),
(57283492, 'Leg Whodat', 'Server'),
(59274013, 'David Tatum', 'Server'),
(59847234, 'Melvin Heckleberry', 'Cook'),
(71049283, 'Garry Gergitch', 'Server'),
(74892834, 'Nathan Andrews', 'Cook'),
(82916743, 'Martha Speaks', 'Server'),
(98723471, 'Tammy TamTam', 'Cook');

-- --------------------------------------------------------

--
-- Table structure for table `isscheduled`
--

DROP TABLE IF EXISTS `isscheduled`;
CREATE TABLE IF NOT EXISTS `isscheduled` (
  `eid` int(11) NOT NULL,
  `sid` int(11) NOT NULL,
  PRIMARY KEY (`eid`,`sid`),
  KEY `eid_idx` (`eid`),
  KEY `sid_idx` (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `isscheduled`
--

INSERT INTO `isscheduled` (`eid`, `sid`) VALUES
(12342987, 0),
(12342987, 1),
(12342987, 2),
(12342987, 3),
(12342987, 4),
(17459283, 1),
(17459283, 3),
(17459283, 5),
(17482935, 0),
(17482935, 1),
(17482935, 2),
(17482935, 3),
(17482935, 4),
(17482938, 0),
(17482938, 1),
(17482938, 2),
(17482938, 3),
(17482938, 4),
(17483920, 5),
(17492283, 0),
(17492283, 1),
(17492283, 2),
(17492283, 3),
(17492283, 4),
(23748905, 5),
(23748905, 6),
(25794832, 0),
(25794832, 1),
(25794832, 2),
(25794832, 3),
(25794832, 4),
(27184923, 5),
(27948357, 5),
(40292813, 5),
(57194823, 0),
(57194823, 1),
(57194823, 2),
(57194823, 3),
(57194823, 4),
(57283492, 0),
(57283492, 1),
(57283492, 2),
(57283492, 3),
(57283492, 4),
(59274013, 5),
(59847234, 6),
(71049283, 6),
(74892834, 6),
(82916743, 5),
(82916743, 6);

-- --------------------------------------------------------

--
-- Table structure for table `shift`
--

DROP TABLE IF EXISTS `shift`;
CREATE TABLE IF NOT EXISTS `shift` (
  `sid` int(11) NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `req` json DEFAULT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `shift`
--

INSERT INTO `shift` (`sid`, `start`, `end`, `req`) VALUES
(0, '2022-11-06 09:00:00', '2022-11-06 17:00:00', '{\"Cook\": 2, \"Server\": 2, \"Cleanup\": 1, \"Manager\": 1, \"Dishwasher\": 1}'),
(1, '2022-11-07 09:00:00', '2022-11-07 17:00:00', '{\"Cook\": 2, \"Owner\": 1, \"Server\": 2, \"Cleanup\": 1, \"Manager\": 1, \"Dishwasher\": 1}'),
(2, '2022-11-08 09:00:00', '2022-11-08 17:00:00', '{\"Cook\": 2, \"Server\": 2, \"Cleanup\": 1, \"Manager\": 1, \"Dishwasher\": 1}'),
(3, '2022-11-09 09:00:00', '2022-11-09 17:00:00', '{\"Cook\": 2, \"Owner\": 1, \"Server\": 2, \"Cleanup\": 1, \"Manager\": 1, \"Dishwasher\": 1}'),
(4, '2022-11-10 09:00:00', '2022-11-10 17:00:00', '{\"Cook\": 2, \"Server\": 2, \"Cleanup\": 1, \"Manager\": 1, \"Dishwasher\": 1}'),
(5, '2022-11-11 09:00:00', '2022-11-11 17:00:00', '{\"Cook\": 2, \"Owner\": 1, \"Server\": 2, \"Cleanup\": 1, \"Manager\": 1, \"Dishwasher\": 1}'),
(6, '2022-11-12 09:00:00', '2022-11-12 17:00:00', '{\"Cook\": 2, \"Server\": 2, \"Dishwasher\": 1}');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `uid` varchar(45) NOT NULL,
  `eid` int(11) NOT NULL,
  `upassword` varchar(120) NOT NULL,
  `salt` varchar(120) DEFAULT NULL,
  `uemail` varchar(45) NOT NULL,
  `permission` varchar(45) NOT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `uemail_UNIQUE` (`uemail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`uid`, `eid`, `upassword`, `salt`, `uemail`, `permission`) VALUES
('admin', 1, '$2b$10$3HL9RVlAJWlKvyMNbwcZGOFpsEVpaSiFex25P4p0eJGWKrYlSXXJC', '$2b$10$3HL9RVlAJWlKvyMNbwcZGO', 'admin@es.com', 'admin');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ava`
--
ALTER TABLE `ava`
  ADD CONSTRAINT `eid_ava` FOREIGN KEY (`eid`) REFERENCES `employee` (`eid`);

--
-- Constraints for table `isscheduled`
--
ALTER TABLE `isscheduled`
  ADD CONSTRAINT `eid_isschedule` FOREIGN KEY (`eid`) REFERENCES `employee` (`eid`),
  ADD CONSTRAINT `sid_isschedule` FOREIGN KEY (`sid`) REFERENCES `shift` (`sid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
