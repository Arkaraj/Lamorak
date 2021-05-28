import {MigrationInterface, QueryRunner} from "typeorm";

export class DBUpdate1622208390186 implements MigrationInterface {
    name = 'DBUpdate1622208390186'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `address` (`Addressid` varchar(36) NOT NULL, `city` text NOT NULL, `state` text NOT NULL, `Country` text NOT NULL, `location` text NOT NULL, `pincode` text NOT NULL, PRIMARY KEY (`Addressid`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `delivery__person` (`DPid` varchar(36) NOT NULL, `name` text NOT NULL, PRIMARY KEY (`DPid`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `ingredient` (`Ingid` varchar(36) NOT NULL, `name` text NOT NULL, PRIMARY KEY (`Ingid`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `restaurant` (`Rid` varchar(36) NOT NULL, `name` text NOT NULL, `tag` text NOT NULL, `available` tinyint NOT NULL DEFAULT 1, `addressAddressid` varchar(36) NULL, UNIQUE INDEX `REL_4642c5775e0de2541be48c84c8` (`addressAddressid`), PRIMARY KEY (`Rid`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `food` (`Fid` varchar(36) NOT NULL, `name` text NOT NULL, `description` text NOT NULL, `quantity` int NOT NULL DEFAULT '1', `price` float NOT NULL, `restaurantRid` varchar(36) NULL, PRIMARY KEY (`Fid`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user` (`uid` varchar(36) NOT NULL, `email` varchar(150) NOT NULL, `userName` text NOT NULL, `password` text NOT NULL, `balance` int NOT NULL DEFAULT '0', `addressAddressid` varchar(36) NULL, UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), UNIQUE INDEX `REL_703e68a3d29a874f160ac3797b` (`addressAddressid`), PRIMARY KEY (`uid`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `order` (`Oid` int NOT NULL AUTO_INCREMENT, `totalPrice` int NOT NULL DEFAULT '0', `type` enum ('COD', 'NET_BANKING') NOT NULL DEFAULT 'COD', `status` enum ('PLACED', 'PAYED', 'ON_TRANSPORT', 'DELIVERED', 'CANCELLED') NOT NULL DEFAULT 'PLACED', `uid` varchar(255) NOT NULL, `Rid` varchar(255) NOT NULL, `adminId` varchar(255) NOT NULL, `DPId` varchar(255) NOT NULL, PRIMARY KEY (`Oid`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `admin` (`Adminid` varchar(36) NOT NULL, `email` varchar(150) NOT NULL, `name` text NOT NULL, `addressAddressid` varchar(36) NULL, UNIQUE INDEX `IDX_de87485f6489f5d0995f584195` (`email`), UNIQUE INDEX `REL_d6c750b9aa7b055373e252ee7d` (`addressAddressid`), PRIMARY KEY (`Adminid`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `ingredient__fid_food` (`ingredientIngid` varchar(36) NOT NULL, `foodFid` varchar(36) NOT NULL, INDEX `IDX_db52a48b48b037bed2972d53f8` (`ingredientIngid`), INDEX `IDX_427839c73e871b5ce14e2286f3` (`foodFid`), PRIMARY KEY (`ingredientIngid`, `foodFid`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `food__ingredient_ingredient` (`foodFid` varchar(36) NOT NULL, `ingredientIngid` varchar(36) NOT NULL, INDEX `IDX_b1a45681a3250ac84834c6ad02` (`foodFid`), INDEX `IDX_369a7de09081f0d4d0c791847a` (`ingredientIngid`), PRIMARY KEY (`foodFid`, `ingredientIngid`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `Lamorak`.`restaurant` DROP FOREIGN KEY `FK_4642c5775e0de2541be48c84c8e`");
        await queryRunner.query("ALTER TABLE `Lamorak`.`user` DROP FOREIGN KEY `FK_703e68a3d29a874f160ac3797be`");
        await queryRunner.query("ALTER TABLE `Lamorak`.`admin` DROP FOREIGN KEY `FK_d6c750b9aa7b055373e252ee7d9`");
        await queryRunner.query("ALTER TABLE `Lamorak`.`order` DROP FOREIGN KEY `FK_20e7567ddbd5825ed737c02d75d`");
        await queryRunner.query("ALTER TABLE `Lamorak`.`ingredient__fid_food` DROP FOREIGN KEY `FK_db52a48b48b037bed2972d53f86`");
        await queryRunner.query("ALTER TABLE `Lamorak`.`food__ingredient_ingredient` DROP FOREIGN KEY `FK_369a7de09081f0d4d0c791847a3`");
        await queryRunner.query("ALTER TABLE `Lamorak`.`order` DROP FOREIGN KEY `FK_e078b2c868af143fdbc9ef86d6a`");
        await queryRunner.query("ALTER TABLE `Lamorak`.`ingredient__fid_food` DROP FOREIGN KEY `FK_427839c73e871b5ce14e2286f3c`");
        await queryRunner.query("ALTER TABLE `Lamorak`.`food__ingredient_ingredient` DROP FOREIGN KEY `FK_b1a45681a3250ac84834c6ad027`");
        await queryRunner.query("ALTER TABLE `Lamorak`.`order` DROP FOREIGN KEY `FK_a0f2cc435c1f58b4e6494e8abda`");
        await queryRunner.query("ALTER TABLE `Lamorak`.`order` DROP FOREIGN KEY `FK_e1e13450f9c5ff21e855254ac9a`");
        await queryRunner.query("ALTER TABLE `restaurant` ADD CONSTRAINT `FK_4642c5775e0de2541be48c84c8e` FOREIGN KEY (`addressAddressid`) REFERENCES `address`(`Addressid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `food` ADD CONSTRAINT `FK_35d14f4d6fd4c47ae086fad66f4` FOREIGN KEY (`restaurantRid`) REFERENCES `restaurant`(`Rid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_703e68a3d29a874f160ac3797be` FOREIGN KEY (`addressAddressid`) REFERENCES `address`(`Addressid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `order` ADD CONSTRAINT `FK_a0f2cc435c1f58b4e6494e8abda` FOREIGN KEY (`uid`) REFERENCES `user`(`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `order` ADD CONSTRAINT `FK_e1e13450f9c5ff21e855254ac9a` FOREIGN KEY (`adminId`) REFERENCES `admin`(`Adminid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `order` ADD CONSTRAINT `FK_e078b2c868af143fdbc9ef86d6a` FOREIGN KEY (`Rid`) REFERENCES `restaurant`(`Rid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `order` ADD CONSTRAINT `FK_20e7567ddbd5825ed737c02d75d` FOREIGN KEY (`DPId`) REFERENCES `delivery__person`(`DPid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `admin` ADD CONSTRAINT `FK_d6c750b9aa7b055373e252ee7d9` FOREIGN KEY (`addressAddressid`) REFERENCES `address`(`Addressid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `ingredient__fid_food` ADD CONSTRAINT `FK_db52a48b48b037bed2972d53f86` FOREIGN KEY (`ingredientIngid`) REFERENCES `ingredient`(`Ingid`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `ingredient__fid_food` ADD CONSTRAINT `FK_427839c73e871b5ce14e2286f3c` FOREIGN KEY (`foodFid`) REFERENCES `food`(`Fid`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `food__ingredient_ingredient` ADD CONSTRAINT `FK_b1a45681a3250ac84834c6ad027` FOREIGN KEY (`foodFid`) REFERENCES `food`(`Fid`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `food__ingredient_ingredient` ADD CONSTRAINT `FK_369a7de09081f0d4d0c791847a3` FOREIGN KEY (`ingredientIngid`) REFERENCES `ingredient`(`Ingid`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `food__ingredient_ingredient` DROP FOREIGN KEY `FK_369a7de09081f0d4d0c791847a3`");
        await queryRunner.query("ALTER TABLE `food__ingredient_ingredient` DROP FOREIGN KEY `FK_b1a45681a3250ac84834c6ad027`");
        await queryRunner.query("ALTER TABLE `ingredient__fid_food` DROP FOREIGN KEY `FK_427839c73e871b5ce14e2286f3c`");
        await queryRunner.query("ALTER TABLE `ingredient__fid_food` DROP FOREIGN KEY `FK_db52a48b48b037bed2972d53f86`");
        await queryRunner.query("ALTER TABLE `admin` DROP FOREIGN KEY `FK_d6c750b9aa7b055373e252ee7d9`");
        await queryRunner.query("ALTER TABLE `order` DROP FOREIGN KEY `FK_20e7567ddbd5825ed737c02d75d`");
        await queryRunner.query("ALTER TABLE `order` DROP FOREIGN KEY `FK_e078b2c868af143fdbc9ef86d6a`");
        await queryRunner.query("ALTER TABLE `order` DROP FOREIGN KEY `FK_e1e13450f9c5ff21e855254ac9a`");
        await queryRunner.query("ALTER TABLE `order` DROP FOREIGN KEY `FK_a0f2cc435c1f58b4e6494e8abda`");
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_703e68a3d29a874f160ac3797be`");
        await queryRunner.query("ALTER TABLE `food` DROP FOREIGN KEY `FK_35d14f4d6fd4c47ae086fad66f4`");
        await queryRunner.query("ALTER TABLE `restaurant` DROP FOREIGN KEY `FK_4642c5775e0de2541be48c84c8e`");
        await queryRunner.query("ALTER TABLE `Lamorak`.`order` ADD CONSTRAINT `FK_e1e13450f9c5ff21e855254ac9a` FOREIGN KEY (`adminId`) REFERENCES `admin`(`Adminid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Lamorak`.`order` ADD CONSTRAINT `FK_a0f2cc435c1f58b4e6494e8abda` FOREIGN KEY (`uid`) REFERENCES `user`(`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Lamorak`.`food__ingredient_ingredient` ADD CONSTRAINT `FK_b1a45681a3250ac84834c6ad027` FOREIGN KEY (`foodFid`) REFERENCES `food`(`Fid`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Lamorak`.`ingredient__fid_food` ADD CONSTRAINT `FK_427839c73e871b5ce14e2286f3c` FOREIGN KEY (`foodFid`) REFERENCES `food`(`Fid`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Lamorak`.`order` ADD CONSTRAINT `FK_e078b2c868af143fdbc9ef86d6a` FOREIGN KEY (`Rid`) REFERENCES `restaurant`(`Rid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Lamorak`.`food__ingredient_ingredient` ADD CONSTRAINT `FK_369a7de09081f0d4d0c791847a3` FOREIGN KEY (`ingredientIngid`) REFERENCES `ingredient`(`Ingid`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Lamorak`.`ingredient__fid_food` ADD CONSTRAINT `FK_db52a48b48b037bed2972d53f86` FOREIGN KEY (`ingredientIngid`) REFERENCES `ingredient`(`Ingid`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Lamorak`.`order` ADD CONSTRAINT `FK_20e7567ddbd5825ed737c02d75d` FOREIGN KEY (`DPId`) REFERENCES `delivery__person`(`DPid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Lamorak`.`admin` ADD CONSTRAINT `FK_d6c750b9aa7b055373e252ee7d9` FOREIGN KEY (`addressAddressid`) REFERENCES `address`(`Addressid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Lamorak`.`user` ADD CONSTRAINT `FK_703e68a3d29a874f160ac3797be` FOREIGN KEY (`addressAddressid`) REFERENCES `address`(`Addressid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `Lamorak`.`restaurant` ADD CONSTRAINT `FK_4642c5775e0de2541be48c84c8e` FOREIGN KEY (`addressAddressid`) REFERENCES `address`(`Addressid`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("DROP INDEX `IDX_369a7de09081f0d4d0c791847a` ON `food__ingredient_ingredient`");
        await queryRunner.query("DROP INDEX `IDX_b1a45681a3250ac84834c6ad02` ON `food__ingredient_ingredient`");
        await queryRunner.query("DROP TABLE `food__ingredient_ingredient`");
        await queryRunner.query("DROP INDEX `IDX_427839c73e871b5ce14e2286f3` ON `ingredient__fid_food`");
        await queryRunner.query("DROP INDEX `IDX_db52a48b48b037bed2972d53f8` ON `ingredient__fid_food`");
        await queryRunner.query("DROP TABLE `ingredient__fid_food`");
        await queryRunner.query("DROP INDEX `REL_d6c750b9aa7b055373e252ee7d` ON `admin`");
        await queryRunner.query("DROP INDEX `IDX_de87485f6489f5d0995f584195` ON `admin`");
        await queryRunner.query("DROP TABLE `admin`");
        await queryRunner.query("DROP TABLE `order`");
        await queryRunner.query("DROP INDEX `REL_703e68a3d29a874f160ac3797b` ON `user`");
        await queryRunner.query("DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
        await queryRunner.query("DROP TABLE `food`");
        await queryRunner.query("DROP INDEX `REL_4642c5775e0de2541be48c84c8` ON `restaurant`");
        await queryRunner.query("DROP TABLE `restaurant`");
        await queryRunner.query("DROP TABLE `ingredient`");
        await queryRunner.query("DROP TABLE `delivery__person`");
        await queryRunner.query("DROP TABLE `address`");
    }

}
