import React, { useEffect } from 'react'
import { Form, Grid } from 'semantic-ui-react'
import { Prijava, Profesor } from '../model'
import axios from 'axios';
import { useState } from 'react';
import Loading from '../components/Loading';
import { SERVER_URL } from '../util';
import PredatePrijaveTabela from '../components/PredatePrijaveTabela';
interface Props {
    profesor: Profesor,

}

export default function OceniPrijavePage(props: Props) {
    const [loading, setLoading] = useState(false);
    const [prijave, setPrijave] = useState<Prijava[]>([]);
    const [active, setActive] = useState<Prijava | undefined>(undefined)
    const [ocena, setOcena] = useState(0);

    const flitrirane = prijave.filter(element => {
        return props.profesor.predaje.find(ispit => {
            return ispit.seminarski.find(sem => sem.id === element.seminarski.id);
        })

    })

    const onRowClick = (pr: Prijava) => {
        if (pr.status === 'ocenjena') {
            return;
        }
        setActive(prev => {
            return prev === pr ? undefined : pr;
        })
    }
    useEffect(() => {
        axios.get(SERVER_URL + '/prijava').then(val => {
            setPrijave(val.data);
        }).finally(() => {
            setLoading(false);
        })
    }, [])

    if (loading) {
        return (
            <Loading />
        )
    }
    const onSubmit = async () => {

        const res = await axios.patch(SERVER_URL + '/prijava/oceni', {
            seminarski: active?.seminarski.id,
            brojPoena: ocena,
            studentId: active?.studentId
        })
        setPrijave(prev => {
            return prev.map(element => {
                if (element === active) {
                    return {
                        ...element,
                        brojPoena: ocena,
                        status: 'ocenjena'
                    }
                }
                return element
            })
        })

        setOcena(0);
        setActive(undefined);
    }

    return (
        <Grid padded columns='16'>
            <Grid.Row textAlign='center'>
                <Grid.Column width='16'>
                    <h1>Ocenite radove</h1>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width='10'>
                    <PredatePrijaveTabela onRowClick={onRowClick} active={active} prijave={flitrirane} />
                </Grid.Column>
                <Grid.Column width='6'>
                    {
                        active && (
                            <Form onSubmit={onSubmit}>

                                <Form.Input required label='Broj poena' min='1' max={active.seminarski.maksBrojPoena || '100'} value={ocena} onChange={e => {
                                    const value = e.currentTarget.value;
                                    setOcena(parseInt(value));
                                }} />
                                <Form.Button disabled={ocena === 0} fluid>Oceni</Form.Button>
                            </Form>

                        )
                    }
                </Grid.Column>
            </Grid.Row>

        </Grid>
    )
}
