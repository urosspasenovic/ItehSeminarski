import { MigrationInterface, QueryRunner } from "typeorm";

export class kreirajTabeluSeminarski1621247621637 implements MigrationInterface {
    name = 'kreirajTabeluSeminarski1621247621637'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `seminarski` (`id` int NOT NULL AUTO_INCREMENT, `maksBrojPoena` int NOT NULL, `naziv` varchar(255) NOT NULL, `opis` varchar(255) NOT NULL, `mentorId` int NULL, `predmetId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `seminarski` ADD CONSTRAINT `FK_1c6ce6a5ef847d0fc73fc0fa7a3` FOREIGN KEY (`mentorId`) REFERENCES `profesor`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `seminarski` ADD CONSTRAINT `FK_5eda3c0581bc110da61c175973d` FOREIGN KEY (`predmetId`) REFERENCES `predmet`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `seminarski` DROP FOREIGN KEY `FK_5eda3c0581bc110da61c175973d`");
        await queryRunner.query("ALTER TABLE `seminarski` DROP FOREIGN KEY `FK_1c6ce6a5ef847d0fc73fc0fa7a3`");
        await queryRunner.query("DROP TABLE `seminarski`");
    }

}
