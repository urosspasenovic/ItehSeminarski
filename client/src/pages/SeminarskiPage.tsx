import React from 'react'
import { useState } from 'react'
import { Button, Dropdown, Grid } from 'semantic-ui-react'
import SeminarskiModal from '../components/SeminarskiModal'
import SeminarskiTabela from '../components/SeminarskiTabela'
import { Predmet, Profesor, Seminarski } from '../model'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, } from 'recharts'

interface Props {
    profesor: Profesor,
    obrisiSeminarski: (seminarski: Seminarski) => Promise<void>,
    izmeniSeminarski: (seminarski: Partial<Seminarski>, predmet: Predmet) => Promise<void>,
    kreirajSeminarski: (seminarski: Partial<Seminarski>, predmet: Predmet) => Promise<void>,

}

export default function SeminarskiPage(props: Props) {
    const [selectedPredmet, setSelectedPredmet] = useState(-1);
    const [activeSeminarski, setActiveSeminarski] = useState<Seminarski | undefined>(undefined);
    const [openModal, setOpenModal] = useState(false);
    const onRowClick = (sem: Seminarski) => {
        setActiveSeminarski(prev => {
            return prev === sem ? undefined : sem;
        })
    }
    const onSubmit = async (seminarski: Partial<Seminarski>) => {
        if (selectedPredmet === -1) {
            return;
        }
        if (activeSeminarski) {

            await props.izmeniSeminarski({ ...activeSeminarski, ...seminarski }, props.profesor.predaje[selectedPredmet]);
        } else {
            await props.kreirajSeminarski(seminarski, props.profesor.predaje[selectedPredmet]);
        }
        setActiveSeminarski(undefined);

    }
    const res = (selectedPredmet === -1) ? 100 : 100 - props.profesor.predaje[selectedPredmet].seminarski.reduce((prev, curr) => {
        return prev + curr.maksBrojPoena;
    }, 0);

    return (
        <Grid padded columns='16'>
            <SeminarskiModal
                close={() => { setOpenModal(false) }}
                open={openModal}
                onSubmit={onSubmit}
                maks={activeSeminarski ? activeSeminarski.maksBrojPoena + res : res}
                seminarski={activeSeminarski}
            />
            <Grid.Row centered>
                <Grid.Column width='10'>
                    <Dropdown selection value={selectedPredmet} fluid header='Izaberite predemet' options={props.profesor.predaje.map((element, index) => {
                        return {
                            text: element.naziv,
                            key: element.id,
                            value: index,
                            onClick: () => { setSelectedPredmet(index) }
                        }
                    })} />
                </Grid.Column>

            </Grid.Row>
            <Grid.Row>
                <Grid.Column width='7'>
                    {selectedPredmet > -1 && (
                        <>
                            <Button onClick={() => {
                                setOpenModal(true);
                            }}>{activeSeminarski ? 'Izmeni' : 'Kreiraj'}</Button>
                            {activeSeminarski && (
                                <Button negative onClick={() => {
                                    props.obrisiSeminarski(activeSeminarski).then(() => {
                                        setActiveSeminarski(undefined);
                                    })
                                }}>Obrisi</Button>
                            )}
                        </>
                    )}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width='5'>
                    {
                        selectedPredmet > -1 && (
                            <SeminarskiTabela radovi={props.profesor.predaje[selectedPredmet].seminarski} active={activeSeminarski} onRowClick={onRowClick} />
                        )
                    }
                </Grid.Column>
                <Grid.Column textAlign='center' width='11'>
                    <h3>Podaci o seminarskim radovima po predmetima</h3>
                    <BarChart

                        className='whiteBackground'

                        width={900}
                        height={500}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 15,
                        }}
                        data={props.profesor.predaje.map(element => {
                            const broj = element.seminarski.length;
                            const poeni = element.seminarski.reduce((prev, curr) => {
                                return prev + curr.maksBrojPoena;
                            }, 0);
                            return {
                                name: element.naziv,
                                count: broj,
                                total: poeni
                            }
                        })}
                    >
                        <CartesianGrid strokeDasharray="1 1" />
                        <XAxis dataKey="name" />

                        <YAxis />
                        <Tooltip />
                        <Legend />

                        <Bar name='Broj seminarskih radova' dataKey="count" fill="green" />
                        <Bar name='Maks broj poena' dataKey="total" fill="gray" />
                    </BarChart>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}
