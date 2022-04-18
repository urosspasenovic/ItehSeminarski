import React from 'react'
import { Button, Table } from 'semantic-ui-react'
import { Predmet } from '../model'
interface Props {
    predmeti: Predmet[],
    onRowClick: (p: Predmet) => () => void
}
export default function PredmetTabela(props: Props) {
    return (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Naziv</Table.HeaderCell>
                    <Table.HeaderCell>ESPB</Table.HeaderCell>
                    <Table.HeaderCell>Semestar</Table.HeaderCell>
                    <Table.HeaderCell>Detalji</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    props.predmeti.map(element => {
                        return (
                            <Table.Row key={element.id}>
                                <Table.Cell>{element.naziv}</Table.Cell>
                                <Table.Cell>{element.espb}</Table.Cell>
                                <Table.Cell>{element.semestar}</Table.Cell>
                                <Table.Cell>
                                    <Button onClick={props.onRowClick(element)} positive>Detalji</Button>
                                </Table.Cell>

                            </Table.Row>
                        )
                    })
                }
            </Table.Body>
        </Table>
    )
}
