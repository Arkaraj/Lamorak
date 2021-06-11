import {MigrationInterface, QueryRunner} from "typeorm";

export class finalDB1623419280160 implements MigrationInterface {
    name = 'finalDB1623419280160'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `address` (`Addressid` varchar(36) NOT NULL, `city` text NOT NULL, `state` text NOT NULL, `Country` text NOT NULL, `location` text NOT NULL, `pincode` text NOT NULL, `phone` varchar(9) NULL, PRIMARY KEY (`Addressid`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `delivery__person` (`DPid` varchar(36) NOT NULL, `name` text NOT NULL, `available` tinyint NOT NULL DEFAULT 1, `addressAddressid` varchar(36) NULL, UNIQUE INDEX `REL_d65d42e963f8429d86825db38a` (`addressAddressid`), PRIMARY KEY (`DPid`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `ingredient` (`Ingid` varchar(36) NOT NULL, `name` text NOT NULL, PRIMARY KEY (`Ingid`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `food_ingredient` (`FoodId` varchar(255) NOT NULL, `IngredientId` varchar(255) NOT NULL, PRIMARY KEY (`FoodId`, `IngredientId`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `image` (`id` varchar(36) NOT NULL, `imagePath` text NOT NULL, `foodId` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user` (`uid` varchar(36) NOT NULL, `email` varchar(150) NOT NULL, `userName` text NOT NULL, `password` text NOT NULL, `balance` int NOT NULL DEFAULT '0', `addressAddressid` varchar(36) NULL, UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), UNIQUE INDEX `REL_703e68a3d29a874f160ac3797b` (`addressAddressid`), PRIMARY KEY (`uid`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `rating` (`userId` varchar(255) NOT NULL, `RestaurantId` varchar(255) NOT NULL, `rating` float NOT NULL DEFAULT '0', `review` text NULL, PRIMARY KEY (`userId`, `RestaurantId`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `restaurant` (`Rid` varchar(36) NOT NULL, `name` text NOT NULL, `tag` text NOT NULL, `available` tinyint NOT NULL DEFAULT 1, `discount` float NULL, `totalRating` float NOT NULL DEFAULT '0', `addressAddressid` varchar(36) NULL, UNIQUE INDEX `REL_4642c5775e0de2541be48c84c8` (`addressAddressid`), PRIMARY KEY (`Rid`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `food` (`Fid` varchar(36) NOT NULL, `name` text NOT NULL, `description` text NOT NULL, `quantity` int NOT NULL DEFAULT '1', `price` float NOT NULL, `available` tinyint NOT NULL DEFAULT 1, `restaurantId` varchar(255) NOT NULL, `userId` varchar(255) NULL, `orderOid` int NULL, PRIMARY KEY (`Fid`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `order` (`Oid` int NOT NULL AUTO_INCREMENT, `totalPrice` float NOT NULL DEFAULT '0', `type` enum ('COD', 'NET_BANKING') NOT NULL DEFAULT 'COD', `status` enum ('PLACED', 'PAYED', 'ON_TRANSPORT', 'DELIVERED', 'CANCELLED') NOT NULL DEFAULT 'PLACED', `uid` varchar(255) NOT NULL, `adminId` varchar(255) NOT NULL, `DPId` varchar(255) NOT NULL, PRIMARY KEY (`Oid`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `admin` (`Adminid` varchar(36) NOT NULL, `email` varchar(150) NOT NULL, `name` text NOT NULL, `addressAddressid` varchar(36) NULL, UNIQUE INDEX `IDX_de87485f6489f5d0995f584195` (`email`), UNIQUE INDEX `REL_d6c750b9aa7b055373e252ee7d` (`addressAddressid`), PRIMARY KEY (`Adminid`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `coupon` (`id` varchar(36) NOT NULL, `title` text NOT NULL, `value` float NOT NULL, `valid` tinyint NOT NULL DEFAULT 1, `count` int NOT NULL DEFAULT '0', UNIQUE INDEX `IDX_39ea66d350c76d330c7845df00` (`title`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `Lamorak`.`user` DROP FOREIGN KEY `FK_703e68a3d29a874f160ac3797be`");
        await queryRunner.query("ALTER TABLE `Lamorak`.`restaurant` DROP FOREIGN KEY `FK_4642c5775e0de2541be48c84c8e`");
        await queryRunner.query("ALTER TABLE `Lamorak`.`admin` DROP FOREIGN KEY `FK_d6c750b9aa7b055373e252ee7d9`");
        await queryRunner.query("ALTER TABLE `Lamorak`.`order` DROP FOREIGN KEY `FK_20e7567ddbd5825ed737c02d75d`");
        await queryRunner.query("ALTER TABLE `Lamorak`.`food_ingredient` DROP FOREIGN KEY `FK_b335b1a8e5221d9f0d79dae5f42`");
        await queryRunner.query("ALTER TABLE `Lamorak`.`rating` DROP FOREIGN KEY `ratingUser`");
        await queryRunner.query("ALTER TABLE `Lamorak`.`food` DROP FOREIGN KEY `FK_405e37729fbcf3e41b4d91bcd42`");
        await queryRunner.query("ALTER TABLE `Lamorak`.`order` DROP FOREIGN KEY `FK_a0f2cc435c1f58b4e6494e8abda`");
        await queryRunner.query("ALTER TABLE `Lamorak`.`rating` DROP FOREIGN KEY `ratingRestaurant`");
        await queryRunner.query("ALTER TABLE `Lamorak`.`food` DROP FOREIGN KEY `FK_35d14f4d6fd4c47ae086fad66f4`");
        await queryRunner.query("ALTER TABLE `Lamorak`.`food_ingredient` DROP FOREIGN KEY `FK_b2786654cafd09256c540749b9a`");
        await queryRunner.query("ALTER TABLE `Lamorak`.`image` DROP FOREIGN KEY `ImageForFood`");
        await queryRunner.query("ALTER TABLE `Lamorak`.`order` DROP FOREIGN KEY `FK_e1e13450f9c5ff21e855254ac9a`");
        await queryRunner.query("ALTER TABLE `delivery__person` ADD CONSTRAINT `FK_d65d42e963f8429d86825db38a1` FOREIGN KEY (`addressAddressid`) REFERENCES `address`(`Addressid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `food_ingredient` ADD CONSTRAINT `FK_b2786654cafd09256c540749b9a` FOREIGN KEY (`FoodId`) REFERENCES `food`(`Fid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `food_ingredient` ADD CONSTRAINT `FK_b335b1a8e5221d9f0d79dae5f42` FOREIGN KEY (`IngredientId`) REFERENCES `ingredient`(`Ingid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `image` ADD CONSTRAINT `FK_9dd0f874c4419189390ab2da55a` FOREIGN KEY (`foodId`) REFERENCES `food`(`Fid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_703e68a3d29a874f160ac3797be` FOREIGN KEY (`addressAddressid`) REFERENCES `address`(`Addressid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `rating` ADD CONSTRAINT `FK_a6c53dfc89ba3188b389ef29a62` FOREIGN KEY (`userId`) REFERENCES `user`(`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `rating` ADD CONSTRAINT `FK_99bc6c32c7a46ee3e0bab8da24d` FOREIGN KEY (`RestaurantId`) REFERENCES `restaurant`(`Rid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `restaurant` ADD CONSTRAINT `FK_4642c5775e0de2541be48c84c8e` FOREIGN KEY (`addressAddressid`) REFERENCES `address`(`Addressid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `food` ADD CONSTRAINT `FK_7c9492140866fe2a0867b381dcf` FOREIGN KEY (`restaurantId`) REFERENCES `restaurant`(`Rid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `food` ADD CONSTRAINT `FK_5ed8e55796b747240eff8d82b8a` FOREIGN KEY (`userId`) REFERENCES `user`(`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `food` ADD CONSTRAINT `FK_29886cb97b270fea6d0b1889514` FOREIGN KEY (`orderOid`) REFERENCES `order`(`Oid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `order` ADD CONSTRAINT `FK_a0f2cc435c1f58b4e6494e8abda` FOREIGN KEY (`uid`) REFERENCES `user`(`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `order` ADD CONSTRAINT `FK_e1e13450f9c5ff21e855254ac9a` FOREIGN KEY (`adminId`) REFERENCES `admin`(`Adminid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `order` ADD CONSTRAINT `FK_20e7567ddbd5825ed737c02d75d` FOREIGN KEY (`DPId`) REFERENCES `delivery__person`(`DPid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `admin` ADD CONSTRAINT `FK_d6c750b9aa7b055373e252ee7d9` FOREIGN KEY (`addressAddressid`) REFERENCES `address`(`Addressid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `admin` DROP FOREIGN KEY `FK_d6c750b9aa7b055373e252ee7d9`");
        await queryRunner.query("ALTER TABLE `order` DROP FOREIGN KEY `FK_20e7567ddbd5825ed737c02d75d`");
        await queryRunner.query("ALTER TABLE `order` DROP FOREIGN KEY `FK_e1e13450f9c5ff21e855254ac9a`");
        await queryRunner.query("ALTER TABLE `order` DROP FOREIGN KEY `FK_a0f2cc435c1f58b4e6494e8abda`");
        await queryRunner.query("ALTER TABLE `food` DROP FOREIGN KEY `FK_29886cb97b270fea6d0b1889514`");
        await queryRunner.query("ALTER TABLE `food` DROP FOREIGN KEY `FK_5ed8e55796b747240eff8d82b8a`");
        await queryRunner.query("ALTER TABLE `food` DROP FOREIGN KEY `FK_7c9492140866fe2a0867b381dcf`");
        await queryRunner.query("ALTER TABLE `restaurant` DROP FOREIGN KEY `FK_4642c5775e0de2541be48c84c8e`");
        await queryRunner.query("ALTER TABLE `rating` DROP FOREIGN KEY `FK_99bc6c32c7a46ee3e0bab8da24d`");
        await queryRunner.query("ALTER TABLE `rating` DROP FOREIGN KEY `FK_a6c53dfc89ba3188b389ef29a62`");
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_703e68a3d29a874f160ac3797be`");
        await queryRunner.query("ALTER TABLE `image` DROP FOREIGN KEY `FK_9dd0f874c4419189390ab2da55a`");
        await queryRunner.query("ALTER TABLE `food_ingredient` DROP FOREIGN KEY `FK_b335b1a8e5221d9f0d79dae5f42`");
        await queryRunner.query("ALTER TABLE `food_ingredient` DROP FOREIGN KEY `FK_b2786654cafd09256c540749b9a`");
        await queryRunner.query("ALTER TABLE `delivery__person` DROP FOREIGN KEY `FK_d65d42e963f8429d86825db38a1`");
        await queryRunner.query("ALTER TABLE `Lamorak`.`order` ADD CONSTRAINT `FK_e1e13450f9c5ff21e855254ac9a` FOREIGN KEY (`adminId`) REFERENCES `admin`(`Adminid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Lamorak`.`image` ADD CONSTRAINT `ImageForFood` FOREIGN KEY (`foodId`) REFERENCES `food`(`Fid`) ON DELETE RESTRICT ON UPDATE RESTRICT");
        await queryRunner.query("ALTER TABLE `Lamorak`.`food_ingredient` ADD CONSTRAINT `FK_b2786654cafd09256c540749b9a` FOREIGN KEY (`FoodId`) REFERENCES `food`(`Fid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Lamorak`.`food` ADD CONSTRAINT `FK_35d14f4d6fd4c47ae086fad66f4` FOREIGN KEY (`restaurantRid`) REFERENCES `restaurant`(`Rid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Lamorak`.`rating` ADD CONSTRAINT `ratingRestaurant` FOREIGN KEY (`RestaurantId`) REFERENCES `restaurant`(`Rid`) ON DELETE RESTRICT ON UPDATE RESTRICT");
        await queryRunner.query("ALTER TABLE `Lamorak`.`order` ADD CONSTRAINT `FK_a0f2cc435c1f58b4e6494e8abda` FOREIGN KEY (`uid`) REFERENCES `user`(`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Lamorak`.`food` ADD CONSTRAINT `FK_405e37729fbcf3e41b4d91bcd42` FOREIGN KEY (`userUid`) REFERENCES `user`(`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Lamorak`.`rating` ADD CONSTRAINT `ratingUser` FOREIGN KEY (`userId`) REFERENCES `user`(`uid`) ON DELETE RESTRICT ON UPDATE RESTRICT");
        await queryRunner.query("ALTER TABLE `Lamorak`.`food_ingredient` ADD CONSTRAINT `FK_b335b1a8e5221d9f0d79dae5f42` FOREIGN KEY (`IngredientId`) REFERENCES `ingredient`(`Ingid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Lamorak`.`order` ADD CONSTRAINT `FK_20e7567ddbd5825ed737c02d75d` FOREIGN KEY (`DPId`) REFERENCES `delivery__person`(`DPid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Lamorak`.`admin` ADD CONSTRAINT `FK_d6c750b9aa7b055373e252ee7d9` FOREIGN KEY (`addressAddressid`) REFERENCES `address`(`Addressid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Lamorak`.`restaurant` ADD CONSTRAINT `FK_4642c5775e0de2541be48c84c8e` FOREIGN KEY (`addressAddressid`) REFERENCES `address`(`Addressid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Lamorak`.`user` ADD CONSTRAINT `FK_703e68a3d29a874f160ac3797be` FOREIGN KEY (`addressAddressid`) REFERENCES `address`(`Addressid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("DROP INDEX `IDX_39ea66d350c76d330c7845df00` ON `coupon`");
        await queryRunner.query("DROP TABLE `coupon`");
        await queryRunner.query("DROP INDEX `REL_d6c750b9aa7b055373e252ee7d` ON `admin`");
        await queryRunner.query("DROP INDEX `IDX_de87485f6489f5d0995f584195` ON `admin`");
        await queryRunner.query("DROP TABLE `admin`");
        await queryRunner.query("DROP TABLE `order`");
        await queryRunner.query("DROP TABLE `food`");
        await queryRunner.query("DROP INDEX `REL_4642c5775e0de2541be48c84c8` ON `restaurant`");
        await queryRunner.query("DROP TABLE `restaurant`");
        await queryRunner.query("DROP TABLE `rating`");
        await queryRunner.query("DROP INDEX `REL_703e68a3d29a874f160ac3797b` ON `user`");
        await queryRunner.query("DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
        await queryRunner.query("DROP TABLE `image`");
        await queryRunner.query("DROP TABLE `food_ingredient`");
        await queryRunner.query("DROP TABLE `ingredient`");
        await queryRunner.query("DROP INDEX `REL_d65d42e963f8429d86825db38a` ON `delivery__person`");
        await queryRunner.query("DROP TABLE `delivery__person`");
        await queryRunner.query("DROP TABLE `address`");
    }

}
