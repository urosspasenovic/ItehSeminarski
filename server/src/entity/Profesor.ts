import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Predmet } from "./Predmet";

@Entity()
export class Profesor {

    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    ime: string;

    @Column()
    email: string;

    @Column()
    prezime: string;

    @Column({
        select: false
    })
    sifra: string


    @ManyToMany(type => Predmet, { eager: true })
    @JoinTable({ name: 'profesor_predmet' })
    predaje: Predmet[]
}