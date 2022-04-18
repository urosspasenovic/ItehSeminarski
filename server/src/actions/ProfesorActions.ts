import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Profesor } from "../entity/Profesor";

export async function vratiProfesore(req: Request, res: Response) {

    const profesori = await getRepository(Profesor).find();
    res.json(profesori);
}