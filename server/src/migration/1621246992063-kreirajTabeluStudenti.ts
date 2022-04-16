import {MigrationInterface, QueryRunner} from "typeorm";

export class kreirajTabeluStudenti1621246992063 implements MigrationInterface {
    name = 'kreirajTabeluStudenti1621246992063'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `student` (`id` int NOT NULL AUTO_INCREMENT, `ime` varchar(255) NOT NULL, `prezime` varchar(255) NOT NULL, `godinaUpisa` int NOT NULL, `brojIndeksa` int NOT NULL, `sifra` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `student`");
    }

}
