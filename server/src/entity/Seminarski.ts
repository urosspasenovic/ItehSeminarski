import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Predmet } from "./Predmet";


@Entity()
export class Seminarski {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    maksBrojPoena: number;


    @Column()
    naziv: string;

    @Column()
    opis: string;





    @ManyToOne(type => Predmet, { eager: false })
    predmet: Predmet;
}