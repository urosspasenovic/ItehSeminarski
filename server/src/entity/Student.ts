import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Predmet } from "./Predmet";
import { Prijava } from "./Prijava";


@Entity()
export class Student {


    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    ime: string;

    @Column()
    prezime: string;

    @Column()
    email: string;

    @Column()
    godinaUpisa: number;

    @Column()
    brojIndeksa: number;

    @Column({
        select: false
    })
    sifra: string

    @OneToMany(t => Prijava, p => p.student, { eager: true })
    prijave: Prijava[]


    @ManyToMany(type => Predmet, { eager: true })
    @JoinTable({ name: 'student_predmet' })
    slusa: Predmet[]
}