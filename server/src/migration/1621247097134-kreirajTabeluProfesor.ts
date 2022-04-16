import {MigrationInterface, QueryRunner} from "typeorm";

export class kreirajTabeluProfesor1621247097134 implements MigrationInterface {
    name = 'kreirajTabeluProfesor1621247097134'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `profesor` (`id` int NOT NULL AUTO_INCREMENT, `ime` varchar(255) NOT NULL, `prezime` varchar(255) NOT NULL, `sifra` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `profesor`");
    }

}
