import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Form, Modal, Ref } from 'semantic-ui-react'
import { Prijava, Profesor } from '../model'
import { SERVER_URL, setFormState } from '../util'

interface Props {
    prijava?: Prijava,
    onSubmit?: (fd: FormData) => void,
    open: boolean,
    close: () => void,
    seminarskiId?: number

}

export default function PrijavaModal(props: Props) {

    const [profesori, setProfesori] = useState<Profesor[]>([])
    const [nazivTeme, setNazivTeme] = useState('');
    const fileRef = useRef<HTMLDivElement>(null); //referenca na html
    const [selProf, setSelProf] = useState<Profesor | undefined>(undefined)

    useEffect(() => {
        axios.get(SERVER_URL + '/profesor').then(res => {
            setProfesori(res.data);
        })
    }, [])
    useEffect(() => {
        setNazivTeme(props.prijava?.nazivTeme || '');
        if (props.prijava) {
            setSelProf(profesori.find(element => element.id === props.prijava?.mentor.id));

        }
    }, [props.prijava, profesori])
    return (
        <Modal open={props.open} onClose={props.close}>
            <Modal.Header>
                Prijava
            </Modal.Header>
            <Modal.Content>
                <Form encType="multipart/form-data" onSubmit={e => {
                    const data = new FormData();
                    const inputElement = fileRef.current?.lastChild?.lastChild as HTMLInputElement;

                    if (!inputElement.files) {
                        return;
                    }


                    data.append('file', inputElement.files[0]);


                    data.append('nazivTeme', nazivTeme);
                    data.append('mentor', selProf?.id + '');
                    data.append('seminarski', props.seminarskiId + '');
                    if (props.onSubmit)
                        props.onSubmit(data);

                }} >
                    <Form.Input value={nazivTeme} onChange={setFormState(setNazivTeme)} required label='Naziv teme' />
                    <Form.Dropdown required selection label='Mentor' value={selProf?.id} options={profesori.filter(element => {
                        return element.predaje.reduce((prev: boolean, val) => {
                            return prev || (val.seminarski.find(sem => sem.id === props.seminarskiId) !== undefined);
                        }, false)
                    }
                    ).map(element => {
                        return {
                            text: element.ime + ' ' + element.prezime,
                            value: element.id,
                            onClick: () => { setSelProf(element) }
                        }
                    })} />
                    <Ref innerRef={fileRef}>
                        <Form.Input required type='file' label='Fajl' />

                    </Ref>

                    <Form.Button>Prijavi</Form.Button>
                </Form>
            </Modal.Content>
        </Modal>
    )
}
