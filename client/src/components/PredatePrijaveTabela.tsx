

import React, { useState } from 'react'
import { Icon, Pagination, Table } from 'semantic-ui-react'
import { Prijava } from '../model'
import { SERVER_URL, ucitajFajl } from '../util'

interface Props {
    prijave: Prijava[],
    onRowClick: (prijava: Prijava) => void,
    active?: Prijava
}
export default function PredatePrijaveTabela(props: Props) {
    const [activePage, setActivePage] = useState(1)
    const totalPages = Math.ceil(props.prijave.length / 4);
    return (
        <Table selectable>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Naziv teme</Table.HeaderCell>
                    <Table.HeaderCell>Seminarski rad</Table.HeaderCell>
                    <Table.HeaderCell>Mentor</Table.HeaderCell>
                    <Table.HeaderCell>Rad</Table.HeaderCell>
                    <Table.HeaderCell>Broj poena</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    props.prijave.slice((activePage - 1) * 4, 4 * activePage).map(element => {
                        return (
                            <Table.Row active={props.active === element} onClick={() => {
                                props.onRowClick(element);
                            }}>
                                <Table.Cell>{element.nazivTeme}</Table.Cell>
                                <Table.Cell>{element.seminarski.naziv}</Table.Cell>
                                <Table.Cell>{element.mentor.ime + ' ' + element.mentor.prezime}</Table.Cell>
                                <Table.Cell  >
                                    <Icon link name='file pdf outline' size='big' onClick={() => {
                                        ucitajFajl(element.file);
                                    }} />
                                    <br />
                                    <a target="_blank" rel="noreferrer" href={SERVER_URL + '/fajl/' + element.file}>{element.file}</a>
                                </Table.Cell>
                                <Table.Cell>{element.status === 'ocenjena' ? element.brojPoena : 'Nije ocenjen'}</Table.Cell>
                            </Table.Row>
                        )
                    })
                }
            </Table.Body>
            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan='5'>
                        <Pagination totalPages={totalPages} activePage={activePage}
                            onPageChange={(event, data) => {
                                console.log(data);
                                if (typeof data.activePage === 'string') {

                                    setActivePage(parseInt(data.activePage))
                                } else {
                                    setActivePage(data.activePage || 1);
                                }
                            }} />
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table >
    )
}
