import axios from 'axios'
import React, { useState } from 'react'
import { Button, Grid, Header } from 'semantic-ui-react'
import PrijavaModal from '../components/PrijavaModal'
import SeminarskiTabela from '../components/SeminarskiTabela'
import { Prijava, Seminarski } from '../model'
import { SERVER_URL } from '../util'


interface Props {
    seminarski: Seminarski[],
    prijavi: (prijava: Prijava) => void
}

export default function ObavezePage(props: Props) {

    const [selSeminarski, setSelSeminarski] = useState<Seminarski | undefined>(undefined)
    const [open, setOpen] = useState(false)

    const close = () => { setOpen(false) }

    const onRowClick = (sem: Seminarski) => {
        setSelSeminarski(prev => {
            if (prev === sem) {
                return undefined;
            }
            return sem;
        })
    }
    const kreirajPrijavu = async (data: FormData) => {
        const res = await axios.post(SERVER_URL + '/prijava', data);
        setSelSeminarski(undefined);
        props.prijavi(res.data);
    }
    if (props.seminarski.length === 0) {
        return (
            <Header textAlign='center'>
                <h1>Student je predao sve obaveze</h1>
            </Header>
        )
    }
    return (
        <Grid padded>
            <PrijavaModal open={(selSeminarski && open) || false} close={close} onSubmit={kreirajPrijavu} seminarskiId={selSeminarski?.id} />
            <Grid.Row columns='16'>
                <Grid.Column textAlign='center' width='13'>
                    <h2>Obaveze</h2>
                </Grid.Column>
                {
                    selSeminarski && (
                        <Grid.Column width='2'>
                            <Button fluid primary onClick={() => {
                                setOpen(true);
                            }} >Prijavi</Button>
                        </Grid.Column>
                    )
                }
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width='16'>
                    <SeminarskiTabela active={selSeminarski} onRowClick={onRowClick} radovi={props.seminarski} />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}
