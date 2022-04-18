import { Request, Response } from "express";
import { handleUpload, izmeniPrijavu, kreirajPrijavu, nadjiPrijavu, obrisiPrijavu, oceniPrijavu, vratiSvePrijave } from "./actions/PrijavaActions";
import { izmeniSeminarski, kreirajSeminarski, nadjiSeminarski, obrisiSeminarski, vratiSveSeminarske } from "./actions/SeminarskiActions";

import * as multer from 'multer';
import * as path from 'path';
import { getFile } from "./actions/FajlActions";
import { vratiProfesore } from "./actions/ProfesorActions";

const upload = multer({ dest: path.resolve('file/') })

export interface Route {
    method: 'get' | 'post' | 'patch' | 'delete',
    route: string,
    action: any[],

}
export const Routes: Route[] = [{
    method: 'get',
    route: '/prijava',
    action: [vratiSvePrijave]
}, {
    method: 'post',
    route: '/prijava',
    action: [upload.single('file'), handleUpload, kreirajPrijavu]
}, {
    method: 'patch',
    route: '/prijava/oceni',
    action: [oceniPrijavu]
}, {
    method: 'patch',
    route: '/prijava/:seminarski',
    action: [nadjiPrijavu, upload.single('file'), handleUpload, izmeniPrijavu]
}, {
    method: 'delete',
    route: '/prijava/:seminarski',
    action: [nadjiPrijavu, obrisiPrijavu]
}, {
    method: 'get',
    route: '/seminarski',
    action: [vratiSveSeminarske]
}, {
    method: 'post',
    route: '/seminarski',
    action: [kreirajSeminarski]
}, {
    method: 'patch',
    route: '/seminarski/:id',
    action: [nadjiSeminarski, izmeniSeminarski]
}, {
    method: 'delete',
    route: '/seminarski/:id',
    action: [nadjiSeminarski, obrisiSeminarski]
}, {
    method: 'get',
    route: '/fajl/:filename',
    action: [getFile]
}, {
    method: 'get',
    route: '/profesor',
    action: [vratiProfesore]
}

];