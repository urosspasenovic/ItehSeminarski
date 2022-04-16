import {MigrationInterface, QueryRunner} from "typeorm";

export class dodajEmailStudentu1622150543284 implements MigrationInterface {
    name = 'dodajEmailStudentu1622150543284'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `prijava` DROP FOREIGN KEY `FK_131a90f969fa10d5aa807599a19`");
        await queryRunner.query("ALTER TABLE `profesor` ADD `email` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `student` ADD `email` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `seminarski` DROP FOREIGN KEY `FK_1c6ce6a5ef847d0fc73fc0fa7a3`");
        await queryRunner.query("ALTER TABLE `seminarski` DROP FOREIGN KEY `FK_5eda3c0581bc110da61c175973d`");
        await queryRunner.query("ALTER TABLE `seminarski` CHANGE `mentorId` `mentorId` int NULL");
        await queryRunner.query("ALTER TABLE `seminarski` CHANGE `predmetId` `predmetId` int NULL");
        await queryRunner.query("ALTER TABLE `seminarski` ADD CONSTRAINT `FK_1c6ce6a5ef847d0fc73fc0fa7a3` FOREIGN KEY (`mentorId`) REFERENCES `profesor`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `seminarski` ADD CONSTRAINT `FK_5eda3c0581bc110da61c175973d` FOREIGN KEY (`predmetId`) REFERENCES `predmet`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `prijava` ADD CONSTRAINT `FK_a2217159547438cbb9041cfbf1a` FOREIGN KEY (`seminarskiId`) REFERENCES `seminarski`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `prijava` DROP FOREIGN KEY `FK_a2217159547438cbb9041cfbf1a`");
        await queryRunner.query("ALTER TABLE `seminarski` DROP FOREIGN KEY `FK_5eda3c0581bc110da61c175973d`");
        await queryRunner.query("ALTER TABLE `seminarski` DROP FOREIGN KEY `FK_1c6ce6a5ef847d0fc73fc0fa7a3`");
        await queryRunner.query("ALTER TABLE `seminarski` CHANGE `predmetId` `predmetId` int NOT NULL");
        await queryRunner.query("ALTER TABLE `seminarski` CHANGE `mentorId` `mentorId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `seminarski` ADD CONSTRAINT `FK_5eda3c0581bc110da61c175973d` FOREIGN KEY (`predmetId`) REFERENCES `predmet`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `seminarski` ADD CONSTRAINT `FK_1c6ce6a5ef847d0fc73fc0fa7a3` FOREIGN KEY (`mentorId`) REFERENCES `profesor`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `student` DROP COLUMN `email`");
        await queryRunner.query("ALTER TABLE `profesor` DROP COLUMN `email`");
        await queryRunner.query("ALTER TABLE `prijava` ADD CONSTRAINT `FK_131a90f969fa10d5aa807599a19` FOREIGN KEY (`seminarskiId`) REFERENCES `seminarski`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
