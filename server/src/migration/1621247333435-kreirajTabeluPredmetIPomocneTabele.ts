import {MigrationInterface, QueryRunner} from "typeorm";

export class kreirajTabeluPredmetIPomocneTabele1621247333435 implements MigrationInterface {
    name = 'kreirajTabeluPredmetIPomocneTabele1621247333435'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `predmet` (`id` int NOT NULL AUTO_INCREMENT, `naziv` varchar(255) NOT NULL, `opis` varchar(255) NOT NULL, `espb` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `profesor_predmet` (`profesorId` int NOT NULL, `predmetId` int NOT NULL, INDEX `IDX_f10f1eaedbb2deecf1ccf18852` (`profesorId`), INDEX `IDX_d66911194d6321abb2ffc5d2d7` (`predmetId`), PRIMARY KEY (`profesorId`, `predmetId`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `student_predmet` (`studentId` int NOT NULL, `predmetId` int NOT NULL, INDEX `IDX_cb232076331ef10e016292ac9f` (`studentId`), INDEX `IDX_84b9170e1ee332e4329bc3475e` (`predmetId`), PRIMARY KEY (`studentId`, `predmetId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `profesor_predmet` ADD CONSTRAINT `FK_f10f1eaedbb2deecf1ccf188521` FOREIGN KEY (`profesorId`) REFERENCES `profesor`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `profesor_predmet` ADD CONSTRAINT `FK_d66911194d6321abb2ffc5d2d75` FOREIGN KEY (`predmetId`) REFERENCES `predmet`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `student_predmet` ADD CONSTRAINT `FK_cb232076331ef10e016292ac9f8` FOREIGN KEY (`studentId`) REFERENCES `student`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `student_predmet` ADD CONSTRAINT `FK_84b9170e1ee332e4329bc3475e6` FOREIGN KEY (`predmetId`) REFERENCES `predmet`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `student_predmet` DROP FOREIGN KEY `FK_84b9170e1ee332e4329bc3475e6`");
        await queryRunner.query("ALTER TABLE `student_predmet` DROP FOREIGN KEY `FK_cb232076331ef10e016292ac9f8`");
        await queryRunner.query("ALTER TABLE `profesor_predmet` DROP FOREIGN KEY `FK_d66911194d6321abb2ffc5d2d75`");
        await queryRunner.query("ALTER TABLE `profesor_predmet` DROP FOREIGN KEY `FK_f10f1eaedbb2deecf1ccf188521`");
        await queryRunner.query("DROP INDEX `IDX_84b9170e1ee332e4329bc3475e` ON `student_predmet`");
        await queryRunner.query("DROP INDEX `IDX_cb232076331ef10e016292ac9f` ON `student_predmet`");
        await queryRunner.query("DROP TABLE `student_predmet`");
        await queryRunner.query("DROP INDEX `IDX_d66911194d6321abb2ffc5d2d7` ON `profesor_predmet`");
        await queryRunner.query("DROP INDEX `IDX_f10f1eaedbb2deecf1ccf18852` ON `profesor_predmet`");
        await queryRunner.query("DROP TABLE `profesor_predmet`");
        await queryRunner.query("DROP TABLE `predmet`");
    }

}
