-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 22, 2023 at 01:21 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bluedill`
--

-- --------------------------------------------------------

--
-- Table structure for table `collaborators`
--

CREATE TABLE `collaborators` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `collab_code` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `date_joined` varchar(100) NOT NULL,
  `status` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `collaborators`
--

INSERT INTO `collaborators` (`id`, `user_id`, `collab_code`, `email`, `date_joined`, `status`) VALUES
(1, 3, 'CLB-84849384348', 'anybody@gmail.com', '5-11-2023 20:6:8', 0),
(2, 3, 'CLB-84849384349', 'anybody@gmail.com', '5-11-2023 21:8:7', 0),
(3, 3, 'CLB-84849384349', 'anybody1@gmail.com', '5-11-2023 21:8:42', 0),
(4, 3, 'CLB-84849384348', 'anybody1@gmail.com', '5-11-2023 21:8:42', 0);

-- --------------------------------------------------------

--
-- Table structure for table `monthly_plan_desc`
--

CREATE TABLE `monthly_plan_desc` (
  `id` int(11) NOT NULL,
  `plan_id` int(100) NOT NULL,
  `description` longtext NOT NULL,
  `date_created` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `monthly_plan_desc`
--

INSERT INTO `monthly_plan_desc` (`id`, `plan_id`, `description`, `date_created`) VALUES
(1, 1, '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `monthly_pricing_plan`
--

CREATE TABLE `monthly_pricing_plan` (
  `id` int(11) NOT NULL,
  `package_name` varchar(100) NOT NULL,
  `duration` varchar(100) NOT NULL,
  `amount` int(100) NOT NULL,
  `date_created` varchar(100) NOT NULL,
  `status` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `monthly_pricing_plan`
--

INSERT INTO `monthly_pricing_plan` (`id`, `package_name`, `duration`, `amount`, `date_created`, `status`) VALUES
(1, 'Medium & Large scale Business', '1 Year', 60000, '5-3-2023 12:12:46', 1);

-- --------------------------------------------------------

--
-- Table structure for table `plans`
--

CREATE TABLE `plans` (
  `id` int(11) NOT NULL,
  `plan_type` varchar(100) NOT NULL,
  `package_name` varchar(100) NOT NULL,
  `duration` varchar(100) NOT NULL,
  `amount` int(100) NOT NULL,
  `date_created` varchar(100) NOT NULL,
  `status` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `plans`
--

INSERT INTO `plans` (`id`, `plan_type`, `package_name`, `duration`, `amount`, `date_created`, `status`) VALUES
(1, 'Monthly', 'small scale business', '1 month', 77500, '', 0),
(2, 'Yearly', 'medium / large scale business', '1 year', 120000, '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `plans_desc`
--

CREATE TABLE `plans_desc` (
  `id` int(11) NOT NULL,
  `plan_id` int(11) NOT NULL,
  `description` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `plans_desc`
--

INSERT INTO `plans_desc` (`id`, `plan_id`, `description`) VALUES
(1, 1, '[\"desc 1\",\"desc 2\",\"desc 3\"]'),
(2, 2, '[\"desc 1\",\"desc 2\",\"desc 3\"]');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `status` varchar(100) NOT NULL,
  `comment` varchar(100) NOT NULL,
  `document_id` varchar(100) NOT NULL,
  `auto_resend_doc` int(100) NOT NULL,
  `delivery_date` varchar(100) NOT NULL,
  `delivery_time` varchar(100) NOT NULL,
  `document_revision_number` varchar(100) NOT NULL,
  `contract_start` varchar(100) NOT NULL,
  `contract_end` varchar(100) NOT NULL,
  `contract_type` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `co_signed` varchar(100) NOT NULL,
  `recipient` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `status`, `comment`, `document_id`, `auto_resend_doc`, `delivery_date`, `delivery_time`, `document_revision_number`, `contract_start`, `contract_end`, `contract_type`, `name`, `co_signed`, `recipient`) VALUES
(1, '[\"Approved\",\"Not approved\",\"Pedning\"]', 'anyComments', 'CS167HK', 1, '03/09/20203', '4:03pm', '[\"A1\",\"B1\",\"B2\",\"C1\",\"C2\"]', '03/06/2023', '03/06/2023', 'Building Contract', 'Country shopping Mall', 'bluedill inc', '[\"firstUser@gmail.com\"]');

-- --------------------------------------------------------

--
-- Table structure for table `subcriptions`
--

CREATE TABLE `subcriptions` (
  `id` int(11) NOT NULL,
  `user_id` int(100) NOT NULL,
  `plan` varchar(100) NOT NULL,
  `date_purchased` varchar(100) NOT NULL,
  `start_date` varchar(100) NOT NULL,
  `end_date` varchar(100) NOT NULL,
  `updated_at` varchar(100) NOT NULL,
  `method` varchar(100) NOT NULL,
  `status` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `templates`
--

CREATE TABLE `templates` (
  `id` int(11) NOT NULL,
  `template_name` varchar(100) NOT NULL,
  `file_name` varchar(100) NOT NULL,
  `template_id` varchar(100) NOT NULL,
  `date_uploaded` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `templates`
--

INSERT INTO `templates` (`id`, `template_name`, `file_name`, `template_id`, `date_uploaded`) VALUES
(1, 'any name', 'undefined', 'SPC-ID-06565542434806901', '1685701270601'),
(2, 'any name', 'TF-1685747305762-SN.jpeg', 'SPC-ID-003681806019947853', '1685747305769');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `company` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `created_on` varchar(100) NOT NULL,
  `plan` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `company`, `password`, `created_on`, `plan`) VALUES
(1, 'Brad', 'some@gmail.com', 'undefined', '1234', '5-2-2023 11:16:24', 'free'),
(2, 'Brad', 'name@gmail.com', 'company@company', '1234', '5-2-2023 11:17:51', 'free');

-- --------------------------------------------------------

--
-- Table structure for table `yearly_plan_desc`
--

CREATE TABLE `yearly_plan_desc` (
  `id` int(11) NOT NULL,
  `plan_id` int(11) NOT NULL,
  `description` longtext NOT NULL,
  `date_created` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `yearly_pricing_plan`
--

CREATE TABLE `yearly_pricing_plan` (
  `id` int(11) NOT NULL,
  `package_name` varchar(100) NOT NULL,
  `duration` varchar(100) NOT NULL,
  `amount` varchar(100) NOT NULL,
  `date_created` varchar(100) NOT NULL,
  `status` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `yearly_pricing_plan`
--

INSERT INTO `yearly_pricing_plan` (`id`, `package_name`, `duration`, `amount`, `date_created`, `status`) VALUES
(1, 'small scale business', '1 Month', '75500', '5-3-2023 13:5:20', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `collaborators`
--
ALTER TABLE `collaborators`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `monthly_plan_desc`
--
ALTER TABLE `monthly_plan_desc`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `monthly_pricing_plan`
--
ALTER TABLE `monthly_pricing_plan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `plans`
--
ALTER TABLE `plans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `plans_desc`
--
ALTER TABLE `plans_desc`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subcriptions`
--
ALTER TABLE `subcriptions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `templates`
--
ALTER TABLE `templates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `yearly_plan_desc`
--
ALTER TABLE `yearly_plan_desc`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `yearly_pricing_plan`
--
ALTER TABLE `yearly_pricing_plan`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `collaborators`
--
ALTER TABLE `collaborators`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `monthly_plan_desc`
--
ALTER TABLE `monthly_plan_desc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `monthly_pricing_plan`
--
ALTER TABLE `monthly_pricing_plan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `plans`
--
ALTER TABLE `plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `plans_desc`
--
ALTER TABLE `plans_desc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `subcriptions`
--
ALTER TABLE `subcriptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `templates`
--
ALTER TABLE `templates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `yearly_plan_desc`
--
ALTER TABLE `yearly_plan_desc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `yearly_pricing_plan`
--
ALTER TABLE `yearly_pricing_plan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
