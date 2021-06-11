-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 11, 2021 at 01:48 PM
-- Server version: 8.0.19
-- PHP Version: 7.1.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Lamorak`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `Addressid` varchar(36) NOT NULL,
  `city` text NOT NULL,
  `state` text NOT NULL,
  `Country` text NOT NULL,
  `location` text NOT NULL,
  `pincode` text NOT NULL,
  `phone` varchar(9) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`Addressid`, `city`, `state`, `Country`, `location`, `pincode`, `phone`) VALUES
('1f5a85be-b320-46c2-8f6e-07eb378c7e38', 'Vellore', 'Tamil Nadu', 'India', 'Some place where the admin lives', '63200x', NULL),
('479ab59d-4c0c-42bc-812e-7b22fc62a57f', 'Vellore', 'Tamil Nadu', 'India', 'VIT Vellore', '6320xx', NULL),
('80521ac4-e670-42ad-9de5-8232f5054359', 'Vellore', 'Tamil Nadu', 'India', 'Rjt Towers Apt No: 1006, Kf Annan Road', '632014', NULL),
('a1dd6072-d82c-47e8-8268-7f8e80ae332e', 'Vellore', 'Tamil Nadu', 'India', 'Some place which is not know to mankind', '63200x', NULL),
('c84164b6-4caf-46c0-a741-a2a98900d866', 'Vellore', 'Tamil Nadu', 'India', 'Some place where food is human meat... we mean great food', '63200x', NULL),
('f692aecb-8153-4767-89eb-7cd42ef08011', 'Vellore', 'Tamil Nadu', 'India', 'Rjt Towers Apt No: 1006, Kf Annan Road', '632014', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `Adminid` varchar(36) NOT NULL,
  `email` varchar(150) NOT NULL,
  `name` text NOT NULL,
  `addressAddressid` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`Adminid`, `email`, `name`, `addressAddressid`) VALUES
('d0722f96-ab7e-4f77-8d95-5695569aae83', 'admin@test.com', 'Admin1', '1f5a85be-b320-46c2-8f6e-07eb378c7e38');

-- --------------------------------------------------------

--
-- Table structure for table `coupon`
--

CREATE TABLE `coupon` (
  `id` varchar(36) NOT NULL,
  `title` text NOT NULL,
  `value` float NOT NULL,
  `valid` tinyint NOT NULL DEFAULT '1',
  `count` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `coupon`
--

INSERT INTO `coupon` (`id`, `title`, `value`, `valid`, `count`) VALUES
('3f973e79-efa1-4af7-a413-d4ddf6fa9c4b', 'Lamorak123', 25, 1, 0),
('ae880770-5255-4081-96bb-95b9d8fe8022', 'Lamorak77', 10, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `delivery__person`
--

CREATE TABLE `delivery__person` (
  `DPid` varchar(36) NOT NULL,
  `name` text NOT NULL,
  `available` tinyint NOT NULL DEFAULT '1',
  `addressAddressid` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `delivery__person`
--

INSERT INTO `delivery__person` (`DPid`, `name`, `available`, `addressAddressid`) VALUES
('90f03feb-17cd-4ad4-9893-b6e267236de2', 'Arkaraj Del boy', 1, '479ab59d-4c0c-42bc-812e-7b22fc62a57f');

-- --------------------------------------------------------

--
-- Table structure for table `food`
--

CREATE TABLE `food` (
  `Fid` varchar(36) NOT NULL,
  `name` text NOT NULL,
  `description` text NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `price` float NOT NULL,
  `available` tinyint NOT NULL DEFAULT '1',
  `restaurantRid` varchar(36) DEFAULT NULL,
  `userUid` varchar(36) DEFAULT NULL,
  `restaurantId` text NOT NULL,
  `userId` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `orderOid` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `food`
--

INSERT INTO `food` (`Fid`, `name`, `description`, `quantity`, `price`, `available`, `restaurantRid`, `userUid`, `restaurantId`, `userId`, `orderOid`) VALUES
('116a244d-308e-41a9-9537-97e3f654f4e3', 'Chicken 65', 'Its Chicken 65 what else do you need?', 1, 65, 1, NULL, NULL, '058e4de4-83a6-467a-8e74-a435c7371742', NULL, '2'),
('57fb766f-4fd9-44a7-8b19-8582f3720130', 'Chicken 85', 'Its Chicken 85?', 1, 85, 1, NULL, NULL, '058e4de4-83a6-467a-8e74-a435c7371742', NULL, '2'),
('861ec7be-c07b-4707-9eb2-39ea8aa25e2c', 'Biriyani', 'Its biriyani what else do you need...', 1, 165, 1, NULL, NULL, '614c196f-83af-4b1f-9625-45e0ceae0445', NULL, NULL),
('867f3949-7c7f-49c4-8326-2acb17a35c82', 'Meat Soup', 'A soup of human meats, ... i mean animal meats', 1, 165, 1, NULL, NULL, '614c196f-83af-4b1f-9625-45e0ceae0445', NULL, '3');

-- --------------------------------------------------------

--
-- Table structure for table `food_ingredient`
--

CREATE TABLE `food_ingredient` (
  `FoodId` varchar(255) NOT NULL,
  `IngredientId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `food_ingredient`
--

INSERT INTO `food_ingredient` (`FoodId`, `IngredientId`) VALUES
('116a244d-308e-41a9-9537-97e3f654f4e3', '2ebc3f84-4bdc-452d-93d6-de33c6dacae4'),
('57fb766f-4fd9-44a7-8b19-8582f3720130', '2ebc3f84-4bdc-452d-93d6-de33c6dacae4'),
('116a244d-308e-41a9-9537-97e3f654f4e3', '81e203d9-bff9-4dcf-9fa6-44e74f6b3fc2'),
('867f3949-7c7f-49c4-8326-2acb17a35c82', '95a03266-171b-4091-8056-05c6930c616e');

-- --------------------------------------------------------

--
-- Table structure for table `image`
--

CREATE TABLE `image` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `imagePath` text NOT NULL,
  `foodId` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `image`
--

INSERT INTO `image` (`id`, `imagePath`, `foodId`) VALUES
('78ecb9e8-d804-430d-92c5-7fbae3ef295c', '/uploads/dishes/1623419108721/16234191087211.jpeg', '861ec7be-c07b-4707-9eb2-39ea8aa25e2c'),
('d042f42b-c12f-4db7-9c4a-3b632d5db443', '/uploads/dishes/1623419108721/16234191087210.jpeg', '861ec7be-c07b-4707-9eb2-39ea8aa25e2c');

-- --------------------------------------------------------

--
-- Table structure for table `ingredient`
--

CREATE TABLE `ingredient` (
  `Ingid` varchar(36) NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ingredient`
--

INSERT INTO `ingredient` (`Ingid`, `name`) VALUES
('2ebc3f84-4bdc-452d-93d6-de33c6dacae4', 'Chicken'),
('81e203d9-bff9-4dcf-9fa6-44e74f6b3fc2', 'garlic'),
('95a03266-171b-4091-8056-05c6930c616e', 'meat');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int NOT NULL,
  `timestamp` bigint NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `Oid` int NOT NULL,
  `totalPrice` float NOT NULL DEFAULT '0',
  `type` enum('COD','NET_BANKING') NOT NULL DEFAULT 'COD',
  `status` enum('PLACED','PAYED','ON_TRANSPORT','DELIVERED','CANCELLED') NOT NULL DEFAULT 'PLACED',
  `uid` varchar(255) NOT NULL,
  `adminId` varchar(255) NOT NULL,
  `DPId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`Oid`, `totalPrice`, `type`, `status`, `uid`, `adminId`, `DPId`) VALUES
(1, 150, 'COD', 'DELIVERED', 'd07f6de9-47fa-4c68-9128-846e123c9dd9', 'd0722f96-ab7e-4f77-8d95-5695569aae83', '90f03feb-17cd-4ad4-9893-b6e267236de2'),
(2, 315, 'COD', 'DELIVERED', 'd07f6de9-47fa-4c68-9128-846e123c9dd9', 'd0722f96-ab7e-4f77-8d95-5695569aae83', '90f03feb-17cd-4ad4-9893-b6e267236de2'),
(3, 149, 'COD', 'DELIVERED', 'd07f6de9-47fa-4c68-9128-846e123c9dd9', 'd0722f96-ab7e-4f77-8d95-5695569aae83', '90f03feb-17cd-4ad4-9893-b6e267236de2');

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

CREATE TABLE `rating` (
  `userId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `RestaurantId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `rating` float NOT NULL DEFAULT '0',
  `review` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `rating`
--

INSERT INTO `rating` (`userId`, `RestaurantId`, `rating`, `review`) VALUES
('d07f6de9-47fa-4c68-9128-846e123c9dd9', '058e4de4-83a6-467a-8e74-a435c7371742', 4, NULL),
('d97729ba-5382-4c8f-b8fa-45ed818a8a30', '058e4de4-83a6-467a-8e74-a435c7371742', 3, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `restaurant`
--

CREATE TABLE `restaurant` (
  `Rid` varchar(36) NOT NULL,
  `name` text NOT NULL,
  `tag` text NOT NULL,
  `available` tinyint NOT NULL DEFAULT '1',
  `addressAddressid` varchar(36) DEFAULT NULL,
  `discount` float DEFAULT NULL,
  `totalRating` float NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `restaurant`
--

INSERT INTO `restaurant` (`Rid`, `name`, `tag`, `available`, `addressAddressid`, `discount`, `totalRating`) VALUES
('058e4de4-83a6-467a-8e74-a435c7371742', 'Test Restaurant1', 'This is for test purpose', 1, 'a1dd6072-d82c-47e8-8268-7f8e80ae332e', NULL, 3.5),
('614c196f-83af-4b1f-9625-45e0ceae0445', 'Test Restaurant2', 'This is for test purpose2 restaurant!', 1, 'c84164b6-4caf-46c0-a741-a2a98900d866', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `uid` varchar(36) NOT NULL,
  `email` varchar(150) NOT NULL,
  `userName` text NOT NULL,
  `password` text NOT NULL,
  `balance` int NOT NULL DEFAULT '0',
  `addressAddressid` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`uid`, `email`, `userName`, `password`, `balance`, `addressAddressid`) VALUES
('d07f6de9-47fa-4c68-9128-846e123c9dd9', 'a@test.com', 'Arkaraj', '$2b$10$NCIjVTvjmJWNT9kXF.g12O45cX7fWhCu6oc5DZu69WWI2jK.TQ//u', 0, 'f692aecb-8153-4767-89eb-7cd42ef08011'),
('d97729ba-5382-4c8f-b8fa-45ed818a8a30', 'ark@test.com', 'Arkaraj2', '$2b$10$9tNksetHZ0bxbtZ1kygFd.gwG.kHC1g9OQeP4aw2bnAiNZji7UBY2', 0, '80521ac4-e670-42ad-9de5-8232f5054359');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`Addressid`),
  ADD KEY `Addressid` (`Addressid`);

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`Adminid`),
  ADD UNIQUE KEY `IDX_de87485f6489f5d0995f584195` (`email`),
  ADD UNIQUE KEY `REL_d6c750b9aa7b055373e252ee7d` (`addressAddressid`);

--
-- Indexes for table `coupon`
--
ALTER TABLE `coupon`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `delivery__person`
--
ALTER TABLE `delivery__person`
  ADD PRIMARY KEY (`DPid`),
  ADD UNIQUE KEY `address` (`addressAddressid`) USING BTREE;

--
-- Indexes for table `food`
--
ALTER TABLE `food`
  ADD PRIMARY KEY (`Fid`),
  ADD KEY `FK_35d14f4d6fd4c47ae086fad66f4` (`restaurantRid`),
  ADD KEY `FK_405e37729fbcf3e41b4d91bcd42` (`userUid`);

--
-- Indexes for table `food_ingredient`
--
ALTER TABLE `food_ingredient`
  ADD PRIMARY KEY (`FoodId`,`IngredientId`),
  ADD KEY `FK_b335b1a8e5221d9f0d79dae5f42` (`IngredientId`);

--
-- Indexes for table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ImageForFood` (`foodId`);

--
-- Indexes for table `ingredient`
--
ALTER TABLE `ingredient`
  ADD PRIMARY KEY (`Ingid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`Oid`),
  ADD KEY `FK_a0f2cc435c1f58b4e6494e8abda` (`uid`),
  ADD KEY `FK_e1e13450f9c5ff21e855254ac9a` (`adminId`),
  ADD KEY `FK_20e7567ddbd5825ed737c02d75d` (`DPId`);

--
-- Indexes for table `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`userId`,`RestaurantId`),
  ADD UNIQUE KEY `userId` (`userId`),
  ADD KEY `ratingRestaurant` (`RestaurantId`);

--
-- Indexes for table `restaurant`
--
ALTER TABLE `restaurant`
  ADD PRIMARY KEY (`Rid`),
  ADD UNIQUE KEY `REL_4642c5775e0de2541be48c84c8` (`addressAddressid`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`),
  ADD UNIQUE KEY `REL_703e68a3d29a874f160ac3797b` (`addressAddressid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `Oid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `FK_d6c750b9aa7b055373e252ee7d9` FOREIGN KEY (`addressAddressid`) REFERENCES `address` (`Addressid`);

--
-- Constraints for table `delivery__person`
--
ALTER TABLE `delivery__person`
  ADD CONSTRAINT `address` FOREIGN KEY (`addressAddressid`) REFERENCES `address` (`Addressid`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `food`
--
ALTER TABLE `food`
  ADD CONSTRAINT `FK_35d14f4d6fd4c47ae086fad66f4` FOREIGN KEY (`restaurantRid`) REFERENCES `restaurant` (`Rid`),
  ADD CONSTRAINT `FK_405e37729fbcf3e41b4d91bcd42` FOREIGN KEY (`userUid`) REFERENCES `user` (`uid`);

--
-- Constraints for table `food_ingredient`
--
ALTER TABLE `food_ingredient`
  ADD CONSTRAINT `FK_b2786654cafd09256c540749b9a` FOREIGN KEY (`FoodId`) REFERENCES `food` (`Fid`),
  ADD CONSTRAINT `FK_b335b1a8e5221d9f0d79dae5f42` FOREIGN KEY (`IngredientId`) REFERENCES `ingredient` (`Ingid`);

--
-- Constraints for table `image`
--
ALTER TABLE `image`
  ADD CONSTRAINT `ImageForFood` FOREIGN KEY (`foodId`) REFERENCES `food` (`Fid`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `FK_20e7567ddbd5825ed737c02d75d` FOREIGN KEY (`DPId`) REFERENCES `delivery__person` (`DPid`),
  ADD CONSTRAINT `FK_a0f2cc435c1f58b4e6494e8abda` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`),
  ADD CONSTRAINT `FK_e1e13450f9c5ff21e855254ac9a` FOREIGN KEY (`adminId`) REFERENCES `admin` (`Adminid`);

--
-- Constraints for table `rating`
--
ALTER TABLE `rating`
  ADD CONSTRAINT `ratingRestaurant` FOREIGN KEY (`RestaurantId`) REFERENCES `restaurant` (`Rid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `ratingUser` FOREIGN KEY (`userId`) REFERENCES `user` (`uid`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `restaurant`
--
ALTER TABLE `restaurant`
  ADD CONSTRAINT `FK_4642c5775e0de2541be48c84c8e` FOREIGN KEY (`addressAddressid`) REFERENCES `address` (`Addressid`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_703e68a3d29a874f160ac3797be` FOREIGN KEY (`addressAddressid`) REFERENCES `address` (`Addressid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
