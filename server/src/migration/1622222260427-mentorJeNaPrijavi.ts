import {MigrationInterface, QueryRunner} from "typeorm";

export class mentorJeNaPrijavi1622222260427 implements MigrationInterface {
    name = 'mentorJeNaPrijavi1622222260427'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `seminarski` DROP FOREIGN KEY `FK_1c6ce6a5ef847d0fc73fc0fa7a3`");
        await queryRunner.query("ALTER TABLE `seminarski` DROP COLUMN `mentorId`");
        await queryRunner.query("ALTER TABLE `prijava` ADD `mentorId` int NULL");
        await queryRunner.query("ALTER TABLE `seminarski` DROP FOREIGN KEY `FK_5eda3c0581bc110da61c175973d`");
        await queryRunner.query("ALTER TABLE `seminarski` CHANGE `predmetId` `predmetId` int NULL");
        await queryRunner.query("ALTER TABLE `seminarski` ADD CONSTRAINT `FK_5eda3c0581bc110da61c175973d` FOREIGN KEY (`predmetId`) REFERENCES `predmet`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `prijava` ADD CONSTRAINT `FK_3f1c7fa3851a5e29bdfd767ca76` FOREIGN KEY (`mentorId`) REFERENCES `profesor`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `prijava` DROP FOREIGN KEY `FK_3f1c7fa3851a5e29bdfd767ca76`");
        await queryRunner.query("ALTER TABLE `seminarski` DROP FOREIGN KEY `FK_5eda3c0581bc110da61c175973d`");
        await queryRunner.query("ALTER TABLE `seminarski` CHANGE `predmetId` `predmetId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `seminarski` ADD CONSTRAINT `FK_5eda3c0581bc110da61c175973d` FOREIGN KEY (`predmetId`) REFERENCES `predmet`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `prijava` DROP COLUMN `mentorId`");
        await queryRunner.query("ALTER TABLE `seminarski` ADD `mentorId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `seminarski` ADD CONSTRAINT `FK_1c6ce6a5ef847d0fc73fc0fa7a3` FOREIGN KEY (`mentorId`) REFERENCES `profesor`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
