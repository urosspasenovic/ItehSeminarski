import {MigrationInterface, QueryRunner} from "typeorm";

export class dodajSemestarPredmetu1621247689298 implements MigrationInterface {
    name = 'dodajSemestarPredmetu1621247689298'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `predmet` ADD `semestar` int NOT NULL");
        await queryRunner.query("ALTER TABLE `seminarski` DROP FOREIGN KEY `FK_1c6ce6a5ef847d0fc73fc0fa7a3`");
        await queryRunner.query("ALTER TABLE `seminarski` CHANGE `mentorId` `mentorId` int NULL");
        await queryRunner.query("ALTER TABLE `seminarski` ADD CONSTRAINT `FK_1c6ce6a5ef847d0fc73fc0fa7a3` FOREIGN KEY (`mentorId`) REFERENCES `profesor`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `seminarski` DROP FOREIGN KEY `FK_1c6ce6a5ef847d0fc73fc0fa7a3`");
        await queryRunner.query("ALTER TABLE `seminarski` CHANGE `mentorId` `mentorId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `seminarski` ADD CONSTRAINT `FK_1c6ce6a5ef847d0fc73fc0fa7a3` FOREIGN KEY (`mentorId`) REFERENCES `profesor`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `predmet` DROP COLUMN `semestar`");
    }

}
