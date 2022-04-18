

import axios from 'axios';
import React, { useState } from 'react'
import { Button, Grid } from 'semantic-ui-react'
import PredatePrijaveTabela from '../components/PredatePrijaveTabela'
import PrijavaModal from '../components/PrijavaModal';
import { Prijava } from '../model'
import { SERVER_URL } from '../util';

interface Props {
    prijave: Prijava[],
    obrisiPrijavu: (semId: number) => void,
    izmeniPrijavu: (data: Prijava) => void
}

export default function PredatePrijavePage(props: Props) {
    const [active, setActive] = useState<Prijava | undefined>(undefined);
    const [openModal, setOpenModal] = useState(false);
    const onRowClick = (prijava: Prijava) => {
        setActive(prev => {
            if (prev === prijava)
                return undefined;
            return prijava;
        })
    }
    const obrisiPrijavu = async () => {
        await axios.delete(SERVER_URL + '/prijava/' + active?.seminarski.id);
        props.obrisiPrijavu(active?.seminarski.id || 0);
        setActive(undefined);
    }
    const izmeniPrijavu = async (data: FormData) => {
        const res = (await axios.patch(SERVER_URL + '/prijava/' + active?.seminarski.id, data)).data;
        props.izmeniPrijavu(res);
    }
    return (
        <Grid padded columns='16'>
            <PrijavaModal seminarskiId={active?.seminarski.id} open={openModal} close={() => { setOpenModal(false) }} prijava={active} onSubmit={izmeniPrijavu} />
            <Grid.Row>
                <Grid.Column textAlign='center' width='13'>
                    <h2>Predate prijave</h2>
                </Grid.Column>
                <Grid.Column width='3'>
                    {
                        active?.status === 'kreirana' && (
                            <>
                                <Button onClick={() => {
                                    setOpenModal(true);
                                }}>Izmeni</Button>
                                <Button onClick={obrisiPrijavu}>Obrisi</Button>
                            </>
                        )
                    }
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width='16'>
                    <PredatePrijaveTabela onRowClick={onRowClick} prijave={props.prijave} active={active} />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}
