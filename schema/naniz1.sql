-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 09, 2020 at 06:35 AM
-- Server version: 5.7.31
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `naniz`
--

-- --------------------------------------------------------

--
-- Table structure for table `dispatched`
--

DROP TABLE IF EXISTS `dispatched`;
CREATE TABLE IF NOT EXISTS `dispatched` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Item_Name` varchar(60) NOT NULL,
  `Qty` varchar(20) NOT NULL,
  `date` datetime DEFAULT NULL,
  `FromKitchen` varchar(255) NOT NULL,
  `ToKitchen` varchar(255) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `Item_Name` (`Item_Name`)
) ENGINE=MyISAM AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dispatched`
--

-- INSERT INTO `dispatched` (`Id`, `Item_Name`, `Qty`, `date`, `FromKitchen`, `ToKitchen`) VALUES
-- (1, 'A', 1, '2020-11-05 20:08:31', 'g', 'g'),
-- (2, 'l', 2, '2020-11-05 20:08:31', 'h', 'h'),
-- (3, 'A', 1, '2020-11-05 20:09:43', 'g', 'g'),
-- (4, 'l', 2, '2020-11-05 20:09:43', 'h', 'h'),
-- (5, 'h', 4, '2020-11-05 20:10:56', 'f', 'f'),
-- (6, 'j', 5, '2020-11-05 20:10:56', 'g', 'g'),
-- (7, 'Aloo Kulcha', 12, '2020-11-05 20:12:16', 'ghjkl', 'ghjkl'),
-- (8, 'Mug Handi', 12, '2020-11-05 20:16:02', 'ugyuyg', 'fghjk'),
-- (9, 'A', 1, '2020-11-05 20:18:32', 'u', 'g'),
-- (10, 'l', 2, '2020-11-05 20:18:32', 'g', 'h'),
-- (11, 'A', 1, '2020-11-05 20:21:35', 'g', 'f'),
-- (12, 'l', 2, '2020-11-05 20:21:35', 'h', 'g'),
-- (13, 'Aloo Kulcha', 67, '2020-11-05 20:22:35', 'g', 'f'),
-- (14, 'Mug Handi', 56, '2020-11-05 20:22:35', 'v', 'g'),
-- (15, 'Aloo Kulcha', 12, '2020-11-05 20:25:41', 'ghjkl', 'ghjk'),
-- (16, 'Aloo Kulcha', 45678, '2020-11-05 20:26:35', '4', '4'),
-- (17, '5678', 5678, '2020-11-05 20:26:35', '5', '5'),
-- (18, '657856', 78, '2020-11-05 20:26:35', '6', '6'),
-- (19, 'Aloo Kulcha', 45678, '2020-11-05 20:27:25', 'mani', 'shankar'),
-- (20, 'Mug Handi', 56, '2020-11-05 20:33:56', 'cfgvhb', 'fcgvhbjnkmlc vbn'),
-- (21, 'Aloo Kulcha', 56, '2020-11-05 22:41:07', 'dxfcgvfdcgv', 'fcgvhbjncgfvhbjn'),
-- (22, 'Aloo Kulcha', 56, '2020-11-05 22:41:07', 'gfvhbjnk', 'ggghbj'),
-- (23, 'Aloo Kulcha', 90909, '2020-11-05 22:41:07', 'fcgvhjkghcdrytf', 'ythghvgv'),
-- (24, 'Aloo Kulcha', 12, '2020-11-05 22:41:59', 'ghjkl', 'jb'),
-- (25, 'Mug Handi', 11, '2020-11-05 22:41:59', 'hbhvgh', 'hvhgvhgvhv'),
-- (26, 'Aloo Kulcha', 1076, '2020-11-06 21:01:31', 'ghvbjnk', 'ghjkl'),
-- (27, 'Aloo Kulcha', 12, '2020-11-06 21:19:06', 'ghvbjnk', 'hbjknm'),
-- (28, 'Aloo Kulcha', 867867, '2020-11-06 21:19:06', 'ghvbjnk', 'rghjnk');

-- --------------------------------------------------------

--
-- Table structure for table `inventory_items`
--

DROP TABLE IF EXISTS `inventory_items`;
CREATE TABLE IF NOT EXISTS `inventory_items` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Main_Category` varchar(11) NOT NULL,
  `Sub_Category` varchar(11) NOT NULL,
  `Item_Name` varchar(60) NOT NULL,
  `Unit_Name` varchar(20) NOT NULL,
  `Main_Qty` int(11) NOT NULL,
  `Measurable_Unit` varchar(20) NOT NULL,
  `Sub_Units` int(11) DEFAULT NULL,
  `GST` varchar(3) NOT NULL,
  `Purchase_Price` int(11) NOT NULL,
  `Kitchen` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `Main_Category` (`Main_Category`),
  KEY `Sub_Category` (`Sub_Category`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `inventory_items`
--

-- INSERT INTO `inventory_items` (`Id`, `Main_Category`, `Sub_Category`, `Item_Name`, `Unit_Name`, `Main_Qty`, `Measurable_Unit`, `Sub_Units`, `GST`, `Purchase_Price`, `Kitchen`) VALUES
-- (1, 'Food', 'Bakery', 'BROWNIES', 'PCS', 1, 'PCS', 1, 'no', 43, 'ghvbjnk'),
-- (2, 'Food', 'Bakery', 'COOKIES (H&S)', 'PCS', 1, 'PCS', 1, 'no', 2, 'ghvbjnk'),
-- (3, 'Food', 'Bakery', 'SANDWICH BREAD', 'PCS', 1, 'PCS', 1, 'no', 6, 'ghvbjnk'),
-- (4, 'Food', 'Bakery', 'PIZZA BASE', 'PCS', 1, 'PCS', 1, 'no', 11, 'ghvbjnk'),
-- (5, 'Food', 'Bakery', 'Chocolate Chips Pastry', 'PCS', 1, 'PCS', 1, 'no', 60, 'ghvbjnk'),
-- (6, 'Food', 'Bakery', 'Oreo Biscuits', 'PCS', 1, 'PCS', 1, 'no', 2, 'ghvbjnk'),
-- (7, 'Food', 'Consumables', 'Wraps', 'PCS', 1, 'PCS', 1, 'no', 12, 'ghvbjnk'),
-- (8, 'Food', 'Consumables', 'KETHCHUP SACHETS', 'PCS', 1, 'PCS', 1, 'no', 1, 'ghvbjnk'),
-- (9, 'Food', 'Consumables', 'COFFEE BEANS', 'KG', 1, 'grms', 1000, 'no', 1, 'ghvbjnk'),
-- (10, 'Food', 'Consumables', 'SUGAR SACHETS (white)', 'PCS', 1, 'PCS', NULL, 'no', 1, 'ghvbjnk'),
-- (11, 'Food', 'Consumables', 'SUGAR SACHETS (Brown)', 'PCS', 1, 'PCS', NULL, 'no', 1, 'ghvbjnk'),
-- (12, 'Food', 'Consumables', 'SUGAR FREE', 'PCS', 1, 'PCS', NULL, 'no', 1, 'ghvbjnk'),
-- (13, 'Food', 'Consumables', 'LEMON ICE TEA POWDER', 'KG', 1, 'grms', 1000, 'no', 0, 'ghvbjnk'),
-- (14, 'Food', 'Consumables', 'SODA', 'LTR', 1, 'ML', 1000, 'no', 0, 'ghvbjnk'),
-- (15, 'Food', 'Consumables', 'SPRITE', 'LTR', 1, 'ML', 1000, 'no', 0, 'ghvbjnk'),
-- (16, 'Food', 'Consumables', 'ASSAM TEA BAG', 'PCS', 1, 'PCS', 1, 'no', 2, 'ghvbjnk'),
-- (17, 'Food', 'Consumables', 'DARJEELING TEA BAG', 'PCS', 1, 'PCS', 1, 'no', 3, 'ghvbjnk'),
-- (18, 'Food', 'Consumables', 'GREEN TEA', 'PCS', 1, 'PCS', 1, 'no', 5, 'ghvbjnk'),
-- (19, 'Food', 'Consumables', 'TULSI TEA', 'PCS', 1, 'PCS', 1, 'no', 5, 'ghvbjnk'),
-- (20, 'Food', 'Consumables', 'KAHWA TEA', 'PCS', 1, 'PCS', 1, 'no', 7, 'ghvbjnk');

-- --------------------------------------------------------

--
-- Table structure for table `production`
--

DROP TABLE IF EXISTS `production`;
CREATE TABLE IF NOT EXISTS `production` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Item_Name` varchar(60) NOT NULL,
  `Qty` varchar(20) NOT NULL,
  `Kitchen` varchar(255) NOT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `Item_Name` (`Item_Name`),
  KEY `Kitchen` (`Kitchen`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `production`
--

-- INSERT INTO `production` (`Id`, `Item_Name`, `Qty`, `Kitchen`, `date`) VALUES
-- (1, 'Aloo Kulcha', 10, '1', NULL),
-- (2, 'Aloo Kulcha', 12, 'ghvbjnk', NULL),
-- (3, 'Aloo Kulcha', 12, 'ghvbjnk', NULL),
-- (4, 'Aloo Kulcha', 5677, 'ghvbjnk', NULL),
-- (5, 'Aloo Kulcha', 678, 'ghvbjnk', NULL),
-- (6, 'Aloo Kulcha', 12, 'ghvbjnk', '2020-11-04 23:15:53'),
-- (7, 'Aloo Kulcha', 12, 'ghvbjnk', '2020-11-04 23:15:53'),
-- (8, 'A', 1, 'ghvbjnk', '2020-11-05 20:06:20'),
-- (9, 'l', 2, 'ghvbjnk', '2020-11-05 20:06:20'),
-- (10, 'Aloo Kulcha', 67, 'ghvbjnk', '2020-11-05 20:14:06'),
-- (11, 'Mug Handi', 56, 'ghvbjnk', '2020-11-05 20:14:06'),
-- (12, 'A', 7, 'ghvbjnk', '2020-11-05 20:16:27'),
-- (13, 'l', 6, 'ghvbjnk', '2020-11-05 20:16:27'),
-- (14, 'o', 5, 'ghvbjnk', '2020-11-05 20:16:27'),
-- (15, 'Aloo Kulcha', 12, 'ghvbjnk', '2020-11-05 20:33:24'),
-- (16, 'Aloo Kulcha', 12, 'ghvbjnk', '2020-11-05 20:33:24'),
-- (17, 'Mug Handi', 67890, 'ghvbjnk', '2020-11-05 20:33:24');

-- --------------------------------------------------------

--
-- Table structure for table `receipe`
--

DROP TABLE IF EXISTS `receipe`;
CREATE TABLE IF NOT EXISTS `receipe` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Product_Name` varchar(60) NOT NULL,
  `Item_Name` varchar(60) NOT NULL,
  `UOM` varchar(20) NOT NULL,
  `Req_Qty` float NOT NULL,
  `Watage` varchar(20) NOT NULL,
  `Yield` int(11) NOT NULL,
  `Yield_UOM` varchar(60) NOT NULL,
  `Type` varchar(20) NOT NULL,
  `Kitchen` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `Item_Name` (`Item_Name`),
  KEY `Type` (`Type`)
) ENGINE=MyISAM AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `receipe`
--

-- INSERT INTO `receipe` (`Id`, `Product_Name`, `Item_Name`, `UOM`, `Req_Qty`, `Watage`, `Yield`, `Yield_UOM`, `Type`, `Kitchen`) VALUES
-- (1, 'Aloo Kulcha', 'Kulcha Batter', 'Kg', 0.125, '0.01', 5, 'Pieces', 'Production', 'ghvbjnk'),
-- (2, 'Aloo Kulcha', 'Aloo', 'Kg', 0.05, '0.01', 5, 'Pieces', 'Normal', 'ghvbjnk'),
-- (3, 'Aloo Kulcha', 'Onion', 'Kg', 0.02, '0', 5, 'Pieces', 'Normal', 'ghvbjnk'),
-- (4, 'Aloo Kulcha', 'Kitchen King', 'Kg', 0.007, '0', 5, 'Pieces', 'Normal', 'ghvbjnk'),
-- (5, 'Aloo Kulcha', 'Kasturi Methi', 'Kg', 0.003, '0', 5, 'Pieces', 'Normal', 'ghvbjnk'),
-- (6, 'Aloo Kulcha', 'Green Chilly', 'Kg', 0.002, '0.02', 5, 'Pieces', 'Normal', 'ghvbjnk'),
-- (7, 'Aloo Kulcha', 'Corriander Leaf', 'Kg', 0.003, '0', 5, 'Pieces', 'Normal', 'ghvbjnk'),
-- (8, 'Aloo Kulcha', 'chat Masala', 'Kg', 0.002, '0', 5, 'Pieces', 'Normal', 'ghvbjnk'),
-- (9, 'Aloo Kulcha', 'Butter', 'Kg', 0.02, '0', 5, 'Pieces', 'Normal', 'ghvbjnk'),
-- (10, 'Aloo Kulcha', 'Chole', 'Kg', 0.25, '0', 5, 'Pieces', 'Production', 'ghvbjnk'),
-- (11, 'Aloo Kulcha', 'Red Chuttney', 'Kg', 0.08, '0', 5, 'Pieces', 'Production', 'ghvbjnk'),
-- (12, 'Mug Handi', 'Chicken', 'Port', 0.25, '0', 1, 'Kg', 'Normal', 'ghvbjnk'),
-- (13, 'Mug Handi', 'Chop Masala', 'Kg', 0.05, '0', 1, 'Kg', 'Production', 'ghvbjnk'),
-- (14, 'Mug Handi', 'Tomato Greavy', 'Kg', 0.1, '0', 1, 'Kg', 'Production', 'ghvbjnk'),
-- (15, 'Mug Handi', 'Veg Greavy', 'Kg', 0.1, '0', 1, 'Kg', 'Production', 'ghvbjnk'),
-- (16, 'Mug Handi', 'Kitchen King', 'Kg', 0.005, '0', 1, 'Kg', 'Normal', 'ghvbjnk'),
-- (17, 'Mug Handi', 'Degge Mirch', 'Kg', 0.005, '0', 1, 'Kg', 'Normal', 'ghvbjnk'),
-- (18, 'Mug Handi', 'Garam Masala', 'Kg', 0.005, '0', 1, 'Kg', 'Normal', 'ghvbjnk'),
-- (19, 'Mug Handi', 'Kasturi Methi', 'Kg', 0.002, '0', 1, 'Kg', 'Normal', 'ghvbjnk'),
-- (20, 'Mug Handi', 'Salt', 'Kg', 0.005, '0', 1, 'Kg', 'Normal', 'ghvbjnk'),
-- (21, 'Mug Handi', 'Ginger', 'Kg', 0.01, '0', 1, 'Kg', 'Normal', 'ghvbjnk'),
-- (22, 'Mug Handi', 'Garlic', 'Kg', 0.01, '0', 1, 'Kg', 'Normal', 'ghvbjnk'),
-- (23, 'Mug Handi', 'Green Chilly', 'Kg', 0.01, '0', 1, 'Kg', 'Normal', 'ghvbjnk'),
-- (24, 'Mug Handi', 'Butter', 'Kg', 0.02, '0', 1, 'Kg', 'Normal', 'ghvbjnk'),
-- (25, 'Mug Handi', 'Cream', 'Kg', 0.02, '0', 1, 'Kg', 'Normal', 'ghvbjnk'),
-- (26, 'Mug Handi', 'Corriander Powder', 'Kg', 0.005, '0', 1, 'Kg', 'Normal', 'ghvbjnk'),
-- (27, 'Mug Handi', 'Corriander Leaf', 'Kg', 0.002, '0', 1, 'Kg', 'Normal', 'ghvbjnk'),
-- (28, 'Mug Handi', 'Chicken Curry Masala', 'Kg', 0.005, '0', 1, 'Kg', 'Normal', 'ghvbjnk');

-- --------------------------------------------------------

--
-- Table structure for table `received`
--

DROP TABLE IF EXISTS `received`;
CREATE TABLE IF NOT EXISTS `received` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Item_Name` varchar(60) NOT NULL,
  `Qty` varchar(20) NOT NULL,
  `date` datetime DEFAULT NULL,
  `FromKitchen` varchar(255) NOT NULL,
  `ByKitchen` varchar(255) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `Item_Name` (`Item_Name`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `received`
--

-- INSERT INTO `received` (`Id`, `Item_Name`, `Qty`, `date`, `FromKitchen`, `ByKitchen`) VALUES
-- (1, 'Aloo Kulcha', 54, '2020-11-05 22:47:45', 'fgvhbj', 'gghvbjnk'),
-- (2, 'Aloo Kulcha', 567, '2020-11-06 21:45:21', 'jbjhbhj', 'ghvbjnk'),
-- (3, 'Aloo Kulcha', 7667, '2020-11-06 21:45:21', 'jbjhbhj', 'ghvbjnk');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(20) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `Address` varchar(50) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `production` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

-- INSERT INTO `users` (`Id`, `Name`, `Email`, `Password`, `production`) VALUES
-- (1, 'ghvbjnk', '2019284@iiitdmj.ac.in', '$2a$10$YDwdNJtthDcJlT/st0jwneScAaem5gPcFlTkKYmIyFadaugB4gu1y', NULL),
-- (2, 'jbjhbhj', '2019@iiitdmj.ac.in', '$2a$10$KZjHuXyHTI5yBXhvNvTMaeyJ6vZFVS6onfH8whXKvsrPmtdHJDGaS', NULL),
-- (3, 'jbjhbhj', '2019284jjhjh@iiitdmj.ac.in', '$2a$10$VOnhqcoN98lfcv3MIUM8/e4JHmztDDqtR8H5VVddE3U9bdeJ7WXsm', NULL),
-- (4, 'jbjhbhj', '201rghbjn9284@iiitdmj.ac.in', '$2a$10$kqkcpTR7sFUfKZ/d.mrh.uaiLiUu5sN3Jw1.4VpRtwnDzqm49rlOG', NULL),
-- (5, 'ghbjnm', 'ghjnkm@gmail.com', '$2a$10$Yy36JUkDfGlh8UrNrDLju.uHPgz/SYWuVQYEtzB03N3pT1T9wpXku', NULL),
-- (6, 'jbjhbhj', 'ghhbjnkmljnkm@gmail.com', '$2a$10$f9boqhGPqbLsNFa1ZqWxZ.RcLKaWFk4uFf7AjomqRcLm1Zgz/cTra', NULL),
-- (7, 'ghbjn', 'ghhbjghbnmnkmljnkm@gmail.com', '$2a$10$zpXAKPwBYaouo7wjLSTs7.IZT4p2.NE4FrgAA0DH.BZOw6GhOQ1MC', 1);
-- COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
