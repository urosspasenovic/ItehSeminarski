

export interface Predmet {
    id: number,
    naziv: string,
    opis: string,
    espb: number,
    semestar: number,
    seminarski: Seminarski[]
}
export interface Profesor {
    id: number,
    ime: string,
    email: string,
    prezime: string,
    predaje: Predmet[]
}
export interface Student {
    id: number,
    ime: string,
    email: string,
    prezime: string,
    godinaUpisa: number,
    brojIndeksa: number,
    slusa: Predmet[],
    prijave: Prijava[]
}
export const isStudent = (val: any): val is Student => {
    return val.godinaUpisa && val.brojIndeksa;
}
export interface Seminarski {
    id: number,
    maksBrojPoena: number,
    naziv: string,
    opis: string
}
export interface Prijava {
    brojPoena: number,
    studentId: number,
    status: 'kreirana' | 'ocenjena',
    seminarski: Seminarski,
    nazivTeme: string,
    mentor: Profesor,
    file: string
}