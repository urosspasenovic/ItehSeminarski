import React, { useEffect } from 'react'
import { useState } from 'react'
import { Form, Modal } from 'semantic-ui-react'
import { Seminarski } from '../model'
import { setFormState } from '../util'
interface Props {
    seminarski?: Seminarski
    onSubmit?: (seminarski: Partial<Seminarski>) => void,
    open: boolean,
    maks?: number
    close: () => void
}
export default function SeminarskiModal(props: Props) {


    const [maksBrojPoena, setMaksBrojPoena] = useState(0);
    const [naziv, setNaziv] = useState('')
    const [opis, setOpis] = useState('');

    useEffect(() => {
        setMaksBrojPoena(props.maks || 0);
        setNaziv(props.seminarski?.naziv || '');
        setOpis(props.seminarski?.opis || '');
    }, [props.seminarski])

    return (
        <Modal open={props.open} onClose={props.close} >
            <Modal.Header>{props.seminarski ? 'Izmeni' : 'Kreiraj novi'} seminarski rad</Modal.Header>
            <Modal.Content>
                <Form onSubmit={() => {
                    if (!props.onSubmit) {
                        return;
                    }
                    props.onSubmit({
                        maksBrojPoena,
                        naziv,
                        opis
                    })
                    props.close();
                }}>
                    <Form.Input label='Naziv' value={naziv} onChange={setFormState(setNaziv)} />
                    <Form.Input disabled={props.maks === 0} label='Maksimalan broj poena' min='0' max={props.maks ? props.maks + '' : '100'} type='number' value={maksBrojPoena} onChange={setFormState((val: string) => {
                        setMaksBrojPoena(parseInt(val));
                    })} />
                    <Form.TextArea label='Opis' value={opis} onChange={setFormState(setOpis)} />
                    <Form.Button disabled={props.maks === 0} fluid>Sacuvaj</Form.Button>
                </Form>
            </Modal.Content>
        </Modal>
    )
}
