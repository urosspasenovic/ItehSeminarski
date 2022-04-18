import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Prijava } from "../entity/Prijava";
import { Seminarski } from "../entity/Seminarski";



export async function vratiSveSeminarske(req: Request, res: Response) {

    const data = await getRepository(Seminarski).find();
    res.json(data);
}

export async function kreirajSeminarski(req: Request, res: Response) {
    const data = req.body as Partial<Seminarski>;
    const insertResult = await getRepository(Seminarski).insert({
        maksBrojPoena: data.maksBrojPoena,

        naziv: data.naziv,
        opis: data.opis,
        predmet: {
            id: data.predmet.id
        }
    });

    res.json({ ...data, id: insertResult.identifiers[0].id });
}

export async function izmeniSeminarski(req: Request, res: Response) {
    const seminarski = (req as any).seminarski as Seminarski;
    const data = req.body as Partial<Seminarski>;
    await getRepository(Seminarski).update(seminarski.id, {
        maksBrojPoena: data.maksBrojPoena,

        naziv: data.naziv,
        opis: data.opis,

    });
    res.sendStatus(204);
}
export async function obrisiSeminarski(req: Request, res: Response) {
    await getRepository(Seminarski).delete(req.params.id);
    res.sendStatus(204);

}
export async function nadjiSeminarski(req: Request, res: Response, next: any) {

    const id = parseInt((req.params as any).id);
    if (isNaN(id)) {
        res.sendStatus(400);
        return;
    }
    const seminarski = await getRepository(Seminarski).findOne(id);
    if (!seminarski) {
        res.sendStatus(404);
        return;
    }
    (req as any).seminarski = seminarski;
    next();

}
