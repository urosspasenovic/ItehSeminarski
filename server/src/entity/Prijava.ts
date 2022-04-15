import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Profesor } from "./Profesor";
import { Seminarski } from "./Seminarski";
import { Student } from "./Student";

@Entity()
export class Prijava {


    @PrimaryColumn()
    studentId: number;

    @Column({ nullable: true })
    brojPoena: number;

    @ManyToOne(type => Student, { primary: true })
    @JoinColumn({ name: 'studentId' })
    student: Student;

    @ManyToOne(type => Seminarski, { eager: true, primary: true })
    seminarski: Seminarski

    @Column()
    nazivTeme: string

    @Column()
    file: string


    @ManyToOne(type => Profesor, { eager: true })
    mentor: Profesor;

    @Column()
    status: 'kreirana' | 'ocenjena'

}