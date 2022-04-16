import {MigrationInterface, QueryRunner} from "typeorm";

export class preimenujFajlNaFile1622494406313 implements MigrationInterface {
    name = 'preimenujFajlNaFile1622494406313'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `prijava` DROP COLUMN `fajl`");
        await queryRunner.query("ALTER TABLE `prijava` ADD `file` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `seminarski` DROP FOREIGN KEY `FK_5eda3c0581bc110da61c175973d`");
        await queryRunner.query("ALTER TABLE `seminarski` CHANGE `predmetId` `predmetId` int NULL");
        await queryRunner.query("ALTER TABLE `prijava` DROP FOREIGN KEY `FK_3f1c7fa3851a5e29bdfd767ca76`");
        await queryRunner.query("ALTER TABLE `prijava` CHANGE `brojPoena` `brojPoena` int NULL");
        await queryRunner.query("ALTER TABLE `prijava` CHANGE `mentorId` `mentorId` int NULL");
        await queryRunner.query("ALTER TABLE `seminarski` ADD CONSTRAINT `FK_5eda3c0581bc110da61c175973d` FOREIGN KEY (`predmetId`) REFERENCES `predmet`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `prijava` ADD CONSTRAINT `FK_3f1c7fa3851a5e29bdfd767ca76` FOREIGN KEY (`mentorId`) REFERENCES `profesor`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `prijava` DROP FOREIGN KEY `FK_3f1c7fa3851a5e29bdfd767ca76`");
        await queryRunner.query("ALTER TABLE `seminarski` DROP FOREIGN KEY `FK_5eda3c0581bc110da61c175973d`");
        await queryRunner.query("ALTER TABLE `prijava` CHANGE `mentorId` `mentorId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `prijava` CHANGE `brojPoena` `brojPoena` int NOT NULL");
        await queryRunner.query("ALTER TABLE `prijava` ADD CONSTRAINT `FK_3f1c7fa3851a5e29bdfd767ca76` FOREIGN KEY (`mentorId`) REFERENCES `profesor`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `seminarski` CHANGE `predmetId` `predmetId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `seminarski` ADD CONSTRAINT `FK_5eda3c0581bc110da61c175973d` FOREIGN KEY (`predmetId`) REFERENCES `predmet`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `prijava` DROP COLUMN `file`");
        await queryRunner.query("ALTER TABLE `prijava` ADD `fajl` varchar(255) NOT NULL");
    }

}
