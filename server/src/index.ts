import "reflect-metadata";
import { createConnection, getRepository } from "typeorm";
import * as express from "express";
import * as session from 'express-session'
import { Request, Response } from "express";
import { Routes } from "./routes";
import * as cors from 'cors'
import * as https from 'https'
import * as fs from 'fs'
import { Student } from "./entity/Student";
import { Profesor } from "./entity/Profesor";

createConnection().then(async connection => {
    const key = fs.readFileSync('./key.pem', 'utf8');
    const cert = fs.readFileSync('./cert.pem', 'utf8');
    // create express app
    const app = express();
    app.use(cors({
        credentials: true,//protiv xss napada

        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        origin: 'http://localhost:3000'

    }));
    app.use(express.json());
    app.use(session({
        secret: 'adsfgdhtydadsfsafsjtiuyi',
        resave: false,

        saveUninitialized: false,
        cookie: {
            sameSite: 'none',
            secure: true,
            maxAge: 1000 * 60 * 10,//10min
            httpOnly: true,
        }

    }))
    app.post('/login', async (req, res) => {
        const { email, password } = req.body;

        const studenti = await getUser(Student, email, password);
        if (studenti.length !== 1) {
            const profesori = await getUser(Profesor, email, password);
            if (profesori.length !== 1) {
                res.sendStatus(404);
            } else {
                (req.session as any).user = profesori[0];
                req.session.save();
                res.json(profesori[0]);
            }
        } else {
            (req.session as any).user = studenti[0];
            req.session.save();
            console.log(studenti[0]);
            res.json(studenti[0]);
        }

    })
    app.post('/logout', async (request: Request, response: Response) => {
        request.session.destroy((err) => {
            if (err)
                response.sendStatus(500);
        })
        response.sendStatus(204);
    })
    app.get('/check', async (req, res) => {
        const user = (req.session as any).user;
        if (!user) {
            res.sendStatus(401);
            return;
        }
        if (user.brojIndeksa) {
            (req.session as any).user = await getRepository(Student).findOne(user.id)
        } else {
            (req.session as any).user = await getRepository(Profesor).findOne(user.id)
        }
        req.session.save();
        res.json((req.session as any).user);
    })


    app.use((req, res, next) => {
        const user = (req.session as any).user;
        if (!user) {
            res.sendStatus(403);
        } else {
            next();
        }
    })

    Routes.forEach(route => {
        app[route.method](route.route, ...route.action);
    });

    // setup express app here
    // ...

    // start express server

    const server = https.createServer({
        key: key,
        cert: cert,
    }, app)
    server.listen(process.env.PORT || 4000, () => console.log('app is listening'))




}).catch(error => console.log(error));
async function getUser(table: typeof Student | typeof Profesor, email: string, password: string) {

    const repository = getRepository(table);
    return await repository.find({
        where: {
            email: email,
            sifra: password,

        }
    })
}