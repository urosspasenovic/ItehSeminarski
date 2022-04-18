
import React from 'react'
import { Form } from 'semantic-ui-react'
import { Predmet } from '../model'
interface Props {
    predmet: Predmet
}
export default function PredmetOpis(props: Props) {
    return (
        <Form>
            <Form.Input label='Naziv' value={props.predmet.naziv} />
            <Form.Input label='ESPB' value={props.predmet.espb} />
            <Form.Input label='Semestar' value={props.predmet.semestar} />
            <Form.TextArea label='Opis'>
                {props.predmet.opis}
            </Form.TextArea>
        </Form>
    )
}
