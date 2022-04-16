import { MigrationInterface, QueryRunner } from "typeorm";

export class kreirajTabeluPrijava1621247954922 implements MigrationInterface {
    name = 'kreirajTabeluPrijava1621247954922'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `prijava` (`brojPoena` int NOT NULL, `nazivTeme` varchar(255) NOT NULL, `fajl` varchar(255) NOT NULL, `status` varchar(255) NOT NULL, `studentId` int NOT NULL, `seminarskiId` int NOT NULL,  PRIMARY KEY (`studentId`, `seminarskiId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `seminarski` DROP FOREIGN KEY `FK_1c6ce6a5ef847d0fc73fc0fa7a3`");
        await queryRunner.query("ALTER TABLE `seminarski` CHANGE `mentorId` `mentorId` int NULL");
        await queryRunner.query("ALTER TABLE `seminarski` ADD CONSTRAINT `FK_1c6ce6a5ef847d0fc73fc0fa7a3` FOREIGN KEY (`mentorId`) REFERENCES `profesor`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `prijava` ADD CONSTRAINT `FK_82ad3391439eac7900c6118a418` FOREIGN KEY (`studentId`) REFERENCES `student`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `prijava` ADD CONSTRAINT `FK_131a90f969fa10d5aa807599a19` FOREIGN KEY (`seminarskiId`) REFERENCES `seminarski`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `prijava` DROP FOREIGN KEY `FK_131a90f969fa10d5aa807599a19`");
        await queryRunner.query("ALTER TABLE `prijava` DROP FOREIGN KEY `FK_82ad3391439eac7900c6118a418`");
        await queryRunner.query("ALTER TABLE `seminarski` DROP FOREIGN KEY `FK_1c6ce6a5ef847d0fc73fc0fa7a3`");
        await queryRunner.query("ALTER TABLE `seminarski` CHANGE `mentorId` `mentorId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `seminarski` ADD CONSTRAINT `FK_1c6ce6a5ef847d0fc73fc0fa7a3` FOREIGN KEY (`mentorId`) REFERENCES `profesor`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("DROP TABLE `prijava`");
    }

}
