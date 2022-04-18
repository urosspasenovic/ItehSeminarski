import { Request, Response } from "express";
import *  as fs from 'fs';

export function getFile(req: Request, res: Response) {
    const { filename } = req.params;
    const file = fs.createReadStream("./file/" + filename);
    file.pipe(res);
}