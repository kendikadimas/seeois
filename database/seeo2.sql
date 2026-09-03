-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for seeo
CREATE DATABASE IF NOT EXISTS `seeo` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `seeo`;

-- Dumping structure for table seeo.activities
CREATE TABLE IF NOT EXISTS `activities` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `image_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gallery` json DEFAULT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` date DEFAULT NULL,
  `is_published` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `activities_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.activities: ~0 rows (approximately)

-- Dumping structure for table seeo.attachment
CREATE TABLE IF NOT EXISTS `attachment` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `type` int NOT NULL DEFAULT '1',
  `is_pinned` tinyint(1) NOT NULL DEFAULT '0',
  `pinned_year` int DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `document` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.attachment: ~0 rows (approximately)

-- Dumping structure for table seeo.billboard
CREATE TABLE IF NOT EXISTS `billboard` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `type` int NOT NULL DEFAULT '1',
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `text` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.billboard: ~1 rows (approximately)
INSERT INTO `billboard` (`id`, `type`, `image`, `title`, `text`, `deleted_at`, `created_at`, `updated_at`) VALUES
	(25, 1, 'BB_1_image.webp', 'Tes', NULL, NULL, '2026-08-27 04:52:47', '2026-08-27 04:52:47');

-- Dumping structure for table seeo.blaterian_food_balance
CREATE TABLE IF NOT EXISTS `blaterian_food_balance` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `balance` int NOT NULL DEFAULT '0',
  `expense` int NOT NULL DEFAULT '0',
  `income` int NOT NULL DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.blaterian_food_balance: ~0 rows (approximately)

-- Dumping structure for table seeo.blaterian_good_balance
CREATE TABLE IF NOT EXISTS `blaterian_good_balance` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `balance` int NOT NULL DEFAULT '0',
  `expense` int NOT NULL DEFAULT '0',
  `income` int NOT NULL DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.blaterian_good_balance: ~0 rows (approximately)

-- Dumping structure for table seeo.budget_item
CREATE TABLE IF NOT EXISTS `budget_item` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `program_id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int NOT NULL,
  `qty` int NOT NULL,
  `unit` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_price` int NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.budget_item: ~0 rows (approximately)

-- Dumping structure for table seeo.cache
CREATE TABLE IF NOT EXISTS `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.cache: ~0 rows (approximately)

-- Dumping structure for table seeo.cache_locks
CREATE TABLE IF NOT EXISTS `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.cache_locks: ~0 rows (approximately)

-- Dumping structure for table seeo.cashier
CREATE TABLE IF NOT EXISTS `cashier` (
  `stand_id` int NOT NULL,
  `cashier_id` int NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.cashier: ~0 rows (approximately)

-- Dumping structure for table seeo.cash_in_item
CREATE TABLE IF NOT EXISTS `cash_in_item` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int NOT NULL,
  `financial_id` int DEFAULT NULL,
  `reciept` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `year_id` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cash_in_item_year_id_foreign` (`year_id`),
  CONSTRAINT `cash_in_item_year_id_foreign` FOREIGN KEY (`year_id`) REFERENCES `governance_years` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.cash_in_item: ~0 rows (approximately)

-- Dumping structure for table seeo.company_contents
CREATE TABLE IF NOT EXISTS `company_contents` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci,
  `image_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `company_contents_key_unique` (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.company_contents: ~0 rows (approximately)

-- Dumping structure for table seeo.contribution
CREATE TABLE IF NOT EXISTS `contribution` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` smallint NOT NULL,
  `months` smallint NOT NULL DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `year_id` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `contribution_year_id_foreign` (`year_id`),
  CONSTRAINT `contribution_year_id_foreign` FOREIGN KEY (`year_id`) REFERENCES `governance_years` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.contribution: ~0 rows (approximately)

-- Dumping structure for table seeo.contribution_configuration
CREATE TABLE IF NOT EXISTS `contribution_configuration` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `price` int DEFAULT NULL,
  `start` smallint DEFAULT NULL,
  `period` smallint DEFAULT NULL,
  `financial_id` smallint DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `year_id` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `contribution_configuration_year_id_foreign` (`year_id`),
  CONSTRAINT `contribution_configuration_year_id_foreign` FOREIGN KEY (`year_id`) REFERENCES `governance_years` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.contribution_configuration: ~1 rows (approximately)
INSERT INTO `contribution_configuration` (`id`, `price`, `start`, `period`, `financial_id`, `deleted_at`, `created_at`, `updated_at`, `year_id`) VALUES
	(7, 0, 4, 9, 0, NULL, '2026-08-27 04:51:56', '2026-08-27 04:51:56', NULL);

-- Dumping structure for table seeo.contribution_receipt
CREATE TABLE IF NOT EXISTS `contribution_receipt` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `contribution_id` smallint NOT NULL,
  `financial_id` smallint DEFAULT NULL,
  `months` smallint NOT NULL,
  `receipt` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.contribution_receipt: ~0 rows (approximately)

-- Dumping structure for table seeo.customer_feedback
CREATE TABLE IF NOT EXISTS `customer_feedback` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `rate` int NOT NULL,
  `message` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.customer_feedback: ~5 rows (approximately)
INSERT INTO `customer_feedback` (`id`, `customer_id`, `rate`, `message`, `deleted_at`, `created_at`, `updated_at`) VALUES
	(1, 2, 4, 'Worth-it for the price', NULL, '2026-07-15 07:29:20', '2026-07-15 07:29:20'),
	(2, 50, 5, 'Great food and service', NULL, '2026-07-15 07:29:20', '2026-07-15 07:29:20'),
	(3, 51, 5, 'I love the food', NULL, '2026-07-15 07:29:20', '2026-07-15 07:29:20');

-- Dumping structure for table seeo.customer_voucher
CREATE TABLE IF NOT EXISTS `customer_voucher` (
  `customer_id` bigint unsigned NOT NULL,
  `voucher_id` bigint unsigned NOT NULL,
  `use_date` date DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  UNIQUE KEY `customer_voucher_customer_id_voucher_id_unique` (`customer_id`,`voucher_id`),
  KEY `customer_voucher_voucher_id_foreign` (`voucher_id`),
  CONSTRAINT `customer_voucher_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `customer_voucher_voucher_id_foreign` FOREIGN KEY (`voucher_id`) REFERENCES `voucher` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.customer_voucher: ~0 rows (approximately)

-- Dumping structure for table seeo.department
CREATE TABLE IF NOT EXISTS `department` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `year_id` bigint unsigned DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `manager_id` int NOT NULL DEFAULT '0',
  `budget` int NOT NULL DEFAULT '0',
  `expense` int NOT NULL DEFAULT '0',
  `disbursement` int NOT NULL DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `department_year_id_foreign` (`year_id`),
  CONSTRAINT `department_year_id_foreign` FOREIGN KEY (`year_id`) REFERENCES `governance_years` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.department: ~0 rows (approximately)

-- Dumping structure for table seeo.disbursement_item
CREATE TABLE IF NOT EXISTS `disbursement_item` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `program_id` int NOT NULL,
  `letter_id` int NOT NULL,
  `financial_id` int NOT NULL,
  `price` int NOT NULL,
  `reciept` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.disbursement_item: ~0 rows (approximately)

-- Dumping structure for table seeo.disbursement_letter
CREATE TABLE IF NOT EXISTS `disbursement_letter` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `program_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `letter` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.disbursement_letter: ~0 rows (approximately)

-- Dumping structure for table seeo.event_registrations
CREATE TABLE IF NOT EXISTS `event_registrations` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `event_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `full_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `institution` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `job_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `event_id` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `event_registrations_event_id_foreign` (`event_id`),
  CONSTRAINT `event_registrations_event_id_foreign` FOREIGN KEY (`event_id`) REFERENCES `seminar_events` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.event_registrations: ~0 rows (approximately)

-- Dumping structure for table seeo.expense_item
CREATE TABLE IF NOT EXISTS `expense_item` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `program_id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int NOT NULL,
  `qty` int NOT NULL,
  `unit` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_price` int NOT NULL,
  `financial_id` int DEFAULT NULL,
  `reciept` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.expense_item: ~0 rows (approximately)

-- Dumping structure for table seeo.foods_expense
CREATE TABLE IF NOT EXISTS `foods_expense` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` int NOT NULL,
  `price` int NOT NULL DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.foods_expense: ~0 rows (approximately)

-- Dumping structure for table seeo.foods_income
CREATE TABLE IF NOT EXISTS `foods_income` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` int NOT NULL,
  `price` int NOT NULL DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.foods_income: ~0 rows (approximately)

-- Dumping structure for table seeo.foods_menu
CREATE TABLE IF NOT EXISTS `foods_menu` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `volume` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `volume_unit` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mass` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mass_unit` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` int NOT NULL,
  `sale` tinyint NOT NULL DEFAULT '0',
  `stock` tinyint NOT NULL DEFAULT '0',
  `stand_id` int NOT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_published` tinyint(1) NOT NULL DEFAULT '0',
  `published_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=218 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.foods_menu: ~0 rows (approximately)

-- Dumping structure for table seeo.foods_order
CREATE TABLE IF NOT EXISTS `foods_order` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `sales_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `menu_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.foods_order: ~1 rows (approximately)

-- Dumping structure for table seeo.food_tag
CREATE TABLE IF NOT EXISTS `food_tag` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `color` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.food_tag: ~0 rows (approximately)

-- Dumping structure for table seeo.general_contact
CREATE TABLE IF NOT EXISTS `general_contact` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `general_contact_title_unique` (`title`),
  UNIQUE KEY `general_contact_name_unique` (`name`),
  UNIQUE KEY `general_contact_phone_unique` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.general_contact: ~0 rows (approximately)

-- Dumping structure for table seeo.goods_capital
CREATE TABLE IF NOT EXISTS `goods_capital` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int NOT NULL,
  `qty` int NOT NULL,
  `unit` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_price` int NOT NULL,
  `operational_id` int DEFAULT NULL,
  `receipt` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.goods_capital: ~0 rows (approximately)

-- Dumping structure for table seeo.goods_expense
CREATE TABLE IF NOT EXISTS `goods_expense` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` int NOT NULL,
  `price` int NOT NULL DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.goods_expense: ~0 rows (approximately)

-- Dumping structure for table seeo.goods_income
CREATE TABLE IF NOT EXISTS `goods_income` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` int NOT NULL,
  `price` int NOT NULL DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.goods_income: ~0 rows (approximately)

-- Dumping structure for table seeo.goods_order
CREATE TABLE IF NOT EXISTS `goods_order` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `sales_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `variant_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `discount` int NOT NULL DEFAULT '0',
  `amount` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.goods_order: ~0 rows (approximately)

-- Dumping structure for table seeo.goods_product
CREATE TABLE IF NOT EXISTS `goods_product` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pic_id` int NOT NULL,
  `operational_id` int NOT NULL DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.goods_product: ~0 rows (approximately)

-- Dumping structure for table seeo.goods_sale
CREATE TABLE IF NOT EXISTS `goods_sale` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `transaction` int NOT NULL DEFAULT '0',
  `customer` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `operational_id` int DEFAULT NULL,
  `cashier_id` int DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.goods_sale: ~0 rows (approximately)

-- Dumping structure for table seeo.governance_years
CREATE TABLE IF NOT EXISTS `governance_years` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `year` smallint unsigned NOT NULL,
  `label` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '0',
  `activated_by` bigint unsigned DEFAULT NULL,
  `activated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `governance_years_year_unique` (`year`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.governance_years: ~0 rows (approximately)

-- Dumping structure for table seeo.internship_applications
CREATE TABLE IF NOT EXISTS `internship_applications` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `program_id` bigint unsigned DEFAULT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nim` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `krs_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `study_program` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `division_choice_1` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reason_choice_1` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `division_choice_2` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reason_choice_2` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `willing_to_be_placed_elsewhere` tinyint(1) NOT NULL,
  `internship_year` int DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `reviewed_by` bigint unsigned DEFAULT NULL,
  `reviewed_at` timestamp NULL DEFAULT NULL,
  `decision_note` text COLLATE utf8mb4_unicode_ci,
  `announcement_sent_at` timestamp NULL DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `internship_applications_nim_unique` (`nim`),
  UNIQUE KEY `internship_applications_email_unique` (`email`),
  KEY `internship_applications_program_id_foreign` (`program_id`),
  KEY `internship_applications_user_id_foreign` (`user_id`),
  KEY `internship_applications_reviewed_by_foreign` (`reviewed_by`),
  CONSTRAINT `internship_applications_program_id_foreign` FOREIGN KEY (`program_id`) REFERENCES `program` (`id`) ON DELETE SET NULL,
  CONSTRAINT `internship_applications_reviewed_by_foreign` FOREIGN KEY (`reviewed_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `internship_applications_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.internship_applications: ~0 rows (approximately)

-- Dumping structure for table seeo.internship_certificates
CREATE TABLE IF NOT EXISTS `internship_certificates` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `internship_application_id` bigint unsigned DEFAULT NULL,
  `generated_for_user_id` bigint unsigned DEFAULT NULL,
  `file` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('draft','published','revoked') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'published',
  `issued_by` bigint unsigned DEFAULT NULL,
  `issued_at` timestamp NULL DEFAULT NULL,
  `download_token` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `download_count` int unsigned NOT NULL DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `internship_certificates_internship_application_id_foreign` (`internship_application_id`),
  KEY `internship_certificates_generated_for_user_id_foreign` (`generated_for_user_id`),
  KEY `internship_certificates_issued_by_foreign` (`issued_by`),
  KEY `internship_certificates_download_token_index` (`download_token`),
  CONSTRAINT `internship_certificates_generated_for_user_id_foreign` FOREIGN KEY (`generated_for_user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `internship_certificates_internship_application_id_foreign` FOREIGN KEY (`internship_application_id`) REFERENCES `internship_applications` (`id`) ON DELETE CASCADE,
  CONSTRAINT `internship_certificates_issued_by_foreign` FOREIGN KEY (`issued_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.internship_certificates: ~0 rows (approximately)

-- Dumping structure for table seeo.jobs
CREATE TABLE IF NOT EXISTS `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.jobs: ~0 rows (approximately)

-- Dumping structure for table seeo.like
CREATE TABLE IF NOT EXISTS `like` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.like: ~0 rows (approximately)

-- Dumping structure for table seeo.logbook
CREATE TABLE IF NOT EXISTS `logbook` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `program_id` int NOT NULL,
  `user_id` int NOT NULL,
  `validated` smallint NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(2000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_time` datetime NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.logbook: ~0 rows (approximately)

-- Dumping structure for table seeo.menu_recipe_components
CREATE TABLE IF NOT EXISTS `menu_recipe_components` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `menu_id` bigint unsigned NOT NULL,
  `stand_expense_id` bigint unsigned DEFAULT NULL,
  `quantity_used` double NOT NULL,
  `unit_used` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` double NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `menu_recipe_components_menu_id_foreign` (`menu_id`),
  KEY `menu_recipe_components_stand_expense_id_foreign` (`stand_expense_id`),
  CONSTRAINT `menu_recipe_components_menu_id_foreign` FOREIGN KEY (`menu_id`) REFERENCES `foods_menu` (`id`) ON DELETE CASCADE,
  CONSTRAINT `menu_recipe_components_stand_expense_id_foreign` FOREIGN KEY (`stand_expense_id`) REFERENCES `stand_expense_item` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.menu_recipe_components: ~1 rows (approximately)

-- Dumping structure for table seeo.migrations
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.migrations: ~46 rows (approximately)
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
	(1, '0001_01_01_000000_create_users_table', 1),
	(2, '0001_01_01_000001_create_cache_table', 1),
	(3, '2024_03_16_132959_create_roles_table', 1),
	(4, '2024_03_25_102938_create_department_table', 1),
	(5, '2024_03_25_103015_create_program_table', 1),
	(6, '2024_03_25_103624_create_budget_item_table', 1),
	(7, '2024_03_27_230159_create_expense_item_table', 1),
	(8, '2024_03_27_230213_create_disbursement_item_table', 1),
	(9, '2024_04_06_102950_create_cash_in_item', 1),
	(10, '2024_05_16_160948_create_stand_table', 1),
	(11, '2024_05_16_161018_create_menu_item_table', 1),
	(12, '2024_05_18_162543_create_sales_table', 1),
	(13, '2024_05_20_102200_create_goods_capital', 1),
	(14, '2024_05_20_102200_create_stand_expense_item', 1),
	(15, '2024_07_31_001039_create_blaterian_balance_table', 1),
	(16, '2024_07_31_001039_create_blaterian_good_balance_table', 1),
	(17, '2024_07_31_001724_create_foods_income_table', 1),
	(18, '2024_07_31_001724_create_goods_income_table', 1),
	(19, '2024_07_31_001724_create_goods_sale_table', 1),
	(20, '2024_07_31_011533_create_foods_expense_table', 1),
	(21, '2024_07_31_011533_create_goods_expense_table', 1),
	(22, '2024_08_07_142334_create_contribution_table', 1),
	(23, '2024_08_08_233300_create_contribution_receipt_table', 1),
	(24, '2024_08_08_233551_create_contribution_configuration_table', 1),
	(25, '2024_09_08_202316_create_disbursement_letter_table', 1),
	(26, '2024_09_11_111808_create_food_order_table', 1),
	(27, '2024_09_11_111808_create_goods_order_table', 1),
	(28, '2024_09_14_152251_create_goods_item_image_table', 1),
	(29, '2024_09_14_152251_create_goods_product_table', 1),
	(30, '2024_09_28_152554_create_product_variant_table', 1),
	(31, '2024_10_21_134358_create_logbook_table', 1),
	(32, '2024_10_21_160504_create_program_staff_table', 1),
	(33, '2024_10_31_122130_create_payroll_balance_table', 1),
	(34, '2024_10_31_122138_create_payroll_level_table', 1),
	(35, '2024_11_08_135919_create_table_billboard', 1),
	(36, '2024_11_08_140902_create_table_attachment', 1),
	(37, '2024_11_08_141005_create_table_post', 1),
	(38, '2024_11_08_142750_create_like_table', 1),
	(39, '2025_04_26_063808_create_payment_method_table', 1),
	(40, '2025_05_02_073318_create_food_tag_table', 1),
	(41, '2025_05_02_073438_create_pivot_food_menu_tag_table', 1),
	(42, '2025_05_04_171810_create_customer_feedback_table', 1),
	(43, '2025_05_05_075948_create_production_staff_table', 1),
	(44, '2025_05_05_080027_create_cashier_table', 1),
	(45, '2025_05_26_132301_create_voucher_table', 1),
	(46, '2025_05_26_134734_create_customer_voucher_table', 1),
	(47, '2025_05_28_081206_create_general_contact_table', 1),
	(48, '2025_08_11_221509_create_event_registrations_table', 1),
	(49, '2025_08_11_223258_create_internship_applications_table', 1),
	(50, '2025_08_12_073925_add_krs_path_to_internship_applications_table', 1),
	(51, '2025_08_12_075245_add_email_to_internship_applications_table', 1),
	(52, '2025_11_01_232315_create_internship_certificates_table', 1),
	(53, '2025_11_02_000000_add_program_and_user_to_internship_applications_table', 1),
	(54, '2025_11_22_000001_create_menu_recipe_components_table', 1),
	(55, '2026_03_07_222015_create_structures_table', 1),
	(56, '2026_03_08_125938_create_activities_table', 1),
	(57, '2026_05_14_000001_create_company_contents_table', 1),
	(58, '2026_05_14_000002_add_pinned_fields_to_attachment_table', 1),
	(59, '2026_05_14_000003_add_birth_date_to_users_table', 1),
	(60, '2026_05_14_000004_add_review_fields_to_internship_applications_table', 1),
	(61, '2026_05_14_000005_add_publication_fields_to_foods_menu_table', 1),
	(62, '2026_05_14_000006_add_delivery_fields_to_sales_table', 1),
	(63, '2026_05_14_000007_create_event_registrations_table', 1),
	(64, '2026_05_14_193313_create_jobs_table', 1),
	(65, '2026_05_14_195123_create_governance_years_table', 1),
	(66, '2026_05_14_195129_add_year_id_to_core_tables', 1),
	(67, '2026_05_14_223104_add_year_id_to_finance_tables', 1),
	(68, '2026_05_15_152813_create_seminar_events_table', 1),
	(69, '2026_05_15_152855_add_event_id_to_event_registrations_table', 1),
	(70, '2026_05_15_161659_add_gallery_to_activities_table', 1),
	(71, '2026_05_16_144608_add_price_to_menu_recipe_components_table', 1),
	(72, '2026_05_16_165621_fix_sales_table_column_types', 1),
	(73, '2026_07_15_142547_add_image_to_foods_menu_table', 1),
	(74, '2026_08_27_000000_repair_missing_customer_voucher_table', 2);

-- Dumping structure for table seeo.password_reset_tokens
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.password_reset_tokens: ~0 rows (approximately)

-- Dumping structure for table seeo.payment_method
CREATE TABLE IF NOT EXISTS `payment_method` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.payment_method: ~0 rows (approximately)

-- Dumping structure for table seeo.payroll_balance
CREATE TABLE IF NOT EXISTS `payroll_balance` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `balance` int DEFAULT '0',
  `financial_id` int DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.payroll_balance: ~1 rows (approximately)
INSERT INTO `payroll_balance` (`id`, `balance`, `financial_id`, `deleted_at`, `created_at`, `updated_at`) VALUES
	(12, 0, 0, NULL, '2026-08-27 04:51:24', '2026-08-27 04:51:24');

-- Dumping structure for table seeo.payroll_level
CREATE TABLE IF NOT EXISTS `payroll_level` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `level` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `salary` int NOT NULL DEFAULT '0',
  `employee` int NOT NULL DEFAULT '0',
  `salary_idr` int NOT NULL DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.payroll_level: ~0 rows (approximately)

-- Dumping structure for table seeo.pivot_food_menu_tag
CREATE TABLE IF NOT EXISTS `pivot_food_menu_tag` (
  `menu_id` int NOT NULL,
  `food_tag_id` int NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.pivot_food_menu_tag: ~0 rows (approximately)

-- Dumping structure for table seeo.post
CREATE TABLE IF NOT EXISTS `post` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `text` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `anonymus` tinyint(1) NOT NULL DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.post: ~0 rows (approximately)

-- Dumping structure for table seeo.production_staff
CREATE TABLE IF NOT EXISTS `production_staff` (
  `stand_id` int NOT NULL,
  `staff_id` int NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.production_staff: ~0 rows (approximately)

-- Dumping structure for table seeo.product_image
CREATE TABLE IF NOT EXISTS `product_image` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_id` int NOT NULL DEFAULT '0',
  `note` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.product_image: ~0 rows (approximately)

-- Dumping structure for table seeo.product_variant
CREATE TABLE IF NOT EXISTS `product_variant` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int NOT NULL,
  `sale` int NOT NULL DEFAULT '0',
  `stock` int NOT NULL DEFAULT '0',
  `rate` double NOT NULL DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.product_variant: ~0 rows (approximately)

-- Dumping structure for table seeo.program
CREATE TABLE IF NOT EXISTS `program` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `year_id` bigint unsigned DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `department_id` int NOT NULL,
  `pic_id` int NOT NULL,
  `budget` int NOT NULL DEFAULT '0',
  `expense` int NOT NULL DEFAULT '0',
  `disbursement` int NOT NULL DEFAULT '0',
  `financial_id` int NOT NULL DEFAULT '0',
  `staff_lock` int NOT NULL DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `program_year_id_foreign` (`year_id`),
  CONSTRAINT `program_year_id_foreign` FOREIGN KEY (`year_id`) REFERENCES `governance_years` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=245 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.program: ~0 rows (approximately)

-- Dumping structure for table seeo.program_staff
CREATE TABLE IF NOT EXISTS `program_staff` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `program_id` int NOT NULL,
  `user_id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.program_staff: ~0 rows (approximately)

-- Dumping structure for table seeo.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.roles: ~0 rows (approximately)

-- Dumping structure for table seeo.sales
CREATE TABLE IF NOT EXISTS `sales` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `cashier_id` int unsigned NOT NULL DEFAULT '0',
  `stand_id` int unsigned NOT NULL,
  `discount` int NOT NULL DEFAULT '0',
  `transaction` int NOT NULL,
  `customer` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customer_id` int DEFAULT NULL,
  `receipt_income` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `voucher_id` int DEFAULT NULL,
  `order_type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `send_option` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_method_id` int DEFAULT NULL,
  `payment_price` int NOT NULL DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `delivered_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.sales: ~0 rows (approximately)

-- Dumping structure for table seeo.seminar_events
CREATE TABLE IF NOT EXISTS `seminar_events` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `wa_link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `seminar_events_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.seminar_events: ~0 rows (approximately)

-- Dumping structure for table seeo.sessions
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.sessions: ~8 rows (approximately)
INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
	('93UcgbATtGaWzQh4OImoSJGbCynoompK2r4XD1pp', NULL, '::1', 'Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiOUszVlVtVlFDWE1OYzFrUzFab29FZk5TaUxOdVFhcWhMTmFjNjBDTyI7czoyMjoiUEhQREVCVUdCQVJfU1RBQ0tfREFUQSI7YTowOnt9czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Qvc2Vlb2lzL3B1YmxpYy9sb2dpbiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1787831115),
	('Bu0A0sdZ0rW87BFUCovHBOYErTE66e9TDESNk6fc', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiQk5kSkhBN25adENNRnQzNllJTlZQbk5ZMmZORXY2SEFmRVRUdEpoTSI7czoyMjoiUEhQREVCVUdCQVJfU1RBQ0tfREFUQSI7YToxOntzOjI2OiIwMU0wMlNFTVZEWlQwRlI5TURLWFFHNDZFOSI7Tjt9czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzM6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9nb29nbGUvYXV0aCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6NToic3RhdGUiO3M6NDA6ImhBaEN3dWZwUzl1YW9DbjA2NFF4VlZRMGxaMGYwdjhvY0RmNjdYQ0IiO30=', 1786800198),
	('crO0x8paj83vs7kY5C5ztm2xtpnmyTifIK5rmoSQ', NULL, '::1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiY05PZk9uTzdzbkh6ZGRaMEpVR05rYjd4dEVEbXh6WDcwSTZMS29uVSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJuZXciO2E6MDp7fXM6Mzoib2xkIjthOjA6e319czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Qvc2Vlb2lzL3B1YmxpYy9sb2dpbiI7fXM6MjI6IlBIUERFQlVHQkFSX1NUQUNLX0RBVEEiO2E6MDp7fX0=', 1787830958),
	('HsR9IBZ7UIs6MNmIxCHzcx3JadwxZUd9CR0nikhP', NULL, '::1', 'curl/8.21.0', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiYnFsdEhKZFBzRUJ0bnU1SVBVOHdTQkJKWjgwSXhtNGlWMEtSb0Z0MiI7czo1OiJzdGF0ZSI7czo0MDoiSWYyaHNUbWNXYVQwUXJjWWk4M2pra2daSXlmcXJtM3dvR094Y2tUSCI7czoyMjoiUEhQREVCVUdCQVJfU1RBQ0tfREFUQSI7YToxOntzOjI2OiIwMU0xMUc2Rks1MjA4QVNURk1aR1JaMDJQMCI7Tjt9czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDI6Imh0dHA6Ly9sb2NhbGhvc3Qvc2Vlb2lzL3B1YmxpYy9nb29nbGUvYXV0aCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1787830681),
	('K9JeZOi3c57tKlvwULfSQFdl8dhufqqJhSYx8QIR', NULL, '::1', 'curl/8.21.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiM2ZCN3JRRlIzSjJCcHFJOGZyd01yZ3lOUVpyR0kzNGpFWVNWTE1ldyI7czoyMjoiUEhQREVCVUdCQVJfU1RBQ0tfREFUQSI7YTowOnt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1787830534),
	('kSVHt2Mc2X5rHCxXcG4yb2gofToE8lbyM2gdpzJJ', 2463, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36', 'YToxMDp7czo2OiJfdG9rZW4iO3M6NDA6IkZqZXJrcGd4bmw5Mk9DU1lDd09PMGE5Y2tDQTU1c3FKUTN1T1lqTVgiO3M6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjIxOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAiO31zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToyNDYzO3M6MTA6InVuZW1wbG95ZWUiO2E6Mzp7czo4OiJjYXRlZ29yeSI7czo0OiJuYW1lIjtzOjU6Im9yZGVyIjtzOjM6ImFzYyI7czo3OiJrZXl3b3JkIjtzOjA6IiI7fXM6ODoiZW1wbG95ZWUiO2E6Mzp7czo4OiJjYXRlZ29yeSI7czo0OiJuYW1lIjtzOjU6Im9yZGVyIjtzOjM6ImFzYyI7czo3OiJrZXl3b3JkIjtzOjA6IiI7fXM6NjoiY2FzaEluIjthOjI6e3M6ODoiY2F0ZWdvcnkiO3M6NToicHJpY2UiO3M6NToib3JkZXIiO3M6MzoiYXNjIjt9czo3OiJjYXNoT3V0IjthOjI6e3M6ODoiY2F0ZWdvcnkiO3M6MTI6ImRpc2J1cnNlbWVudCI7czo1OiJvcmRlciI7czozOiJhc2MiO31zOjEyOiJjb250cmlidXRpb24iO2E6Mzp7czo4OiJjYXRlZ29yeSI7czo0OiJuYW1lIjtzOjU6Im9yZGVyIjtzOjM6ImFzYyI7czo3OiJrZXl3b3JkIjtOO31zOjEwOiJzdHJ1Y3R1cmFsIjthOjM6e3M6ODoiY2F0ZWdvcnkiO3M6NDoibmFtZSI7czo1OiJvcmRlciI7czozOiJhc2MiO3M6Nzoia2V5d29yZCI7Tjt9fQ==', 1787832216),
	('qi6SFp6cZy8irWH2PMbz5vxfzMJbIwsI6tfgzvzh', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibTNUSDBYbFFZb0tMejdvYkVUWjBYekp3eG5MOVY3Zm1aZnhuUVdyUiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NTI6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9zdG9yYWdlL2ltYWdlcy9jb21wcm8vbG9nby5wbmciO319', 1784126223),
	('Z8r2xKgrfS1WleYxtnvSPtlViaoTczd8jHoRQ7zB', NULL, '::1', 'Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.26100.9168', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoienBNZks2YjQwalpVZVFlSTZzQTRXSkNqbDMyeWVSYmF4cUlMdjB5eSI7czoyMjoiUEhQREVCVUdCQVJfU1RBQ0tfREFUQSI7YTowOnt9czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Qvc2Vlb2lzL3B1YmxpYy9sb2dpbiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1787831115);

-- Dumping structure for table seeo.stand
CREATE TABLE IF NOT EXISTS `stand` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `year_id` bigint unsigned DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `place` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` date DEFAULT NULL,
  `pic_id` int NOT NULL,
  `expense` int DEFAULT NULL,
  `income` int DEFAULT NULL,
  `profit` int DEFAULT NULL,
  `balance` int DEFAULT NULL,
  `type` smallint DEFAULT NULL,
  `menu_lock` tinyint NOT NULL DEFAULT '0',
  `sale_validation` tinyint NOT NULL DEFAULT '0',
  `cashier_token` int DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `stand_year_id_foreign` (`year_id`),
  CONSTRAINT `stand_year_id_foreign` FOREIGN KEY (`year_id`) REFERENCES `governance_years` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=291 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.stand: ~0 rows (approximately)

-- Dumping structure for table seeo.stand_expense_item
CREATE TABLE IF NOT EXISTS `stand_expense_item` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int NOT NULL,
  `qty` int NOT NULL,
  `unit` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_price` int NOT NULL,
  `stand_id` int DEFAULT NULL,
  `operational_id` int DEFAULT NULL,
  `reciept` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.stand_expense_item: ~0 rows (approximately)

-- Dumping structure for table seeo.structures
CREATE TABLE IF NOT EXISTS `structures` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role_title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `department_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order_num` int NOT NULL DEFAULT '0',
  `is_executive` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.structures: ~0 rows (approximately)

-- Dumping structure for table seeo.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `year_id` bigint unsigned DEFAULT NULL,
  `id_google` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `point` int NOT NULL DEFAULT '0',
  `profile_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `roles_id` int DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  `level` int DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  UNIQUE KEY `users_phone_unique` (`phone`),
  KEY `users_year_id_foreign` (`year_id`),
  CONSTRAINT `users_year_id_foreign` FOREIGN KEY (`year_id`) REFERENCES `governance_years` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2854 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.users: ~1 rows (approximately)
INSERT INTO `users` (`id`, `year_id`, `id_google`, `name`, `email`, `phone`, `birth_date`, `email_verified_at`, `password`, `location`, `point`, `profile_image`, `roles_id`, `department_id`, `level`, `deleted_at`, `remember_token`, `created_at`, `updated_at`) VALUES
	(2463, NULL, '110533763190682122977', 'Aditya', 'adityadoang505@gmail.com', '085772224917', NULL, '2026-08-27 04:48:10', '$2y$12$3dNBn4A1lsKU0PhGmUDXuuHCJD0PBcSyX4gb..lm4pFktZwz7oaUq', NULL, 0, NULL, 99, NULL, NULL, NULL, NULL, '2026-08-27 04:48:10', '2026-08-27 04:51:02');

-- Dumping structure for table seeo.voucher
CREATE TABLE IF NOT EXISTS `voucher` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `point` int NOT NULL DEFAULT '0',
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_quota` int NOT NULL,
  `min_transaction` int NOT NULL DEFAULT '0',
  `discount_type` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `discount_price` int NOT NULL DEFAULT '0',
  `discount_percent` int NOT NULL DEFAULT '0',
  `discount_max_price` int NOT NULL DEFAULT '0',
  `operational_id` int NOT NULL DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table seeo.voucher: ~0 rows (approximately)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
