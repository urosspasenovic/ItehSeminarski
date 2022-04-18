import React from 'react'
import { Table } from 'semantic-ui-react'
import { Seminarski } from '../model'

interface Props {
    radovi: Seminarski[],
    onRowClick?: (rad: Seminarski) => void,
    active?: Seminarski
}

export default function SeminarskiTabela(props: Props) {
    return (
        <Table selectable>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Naziv seminarskog rada</Table.HeaderCell>
                    <Table.HeaderCell>Maksimalan broj poena</Table.HeaderCell>

                </Table.Row>
            </Table.Header>
            <Table.Body >
                {
                    props.radovi.map(element => {
                        return <Table.Row active={element === props.active} key={element.id} onClick={() => {
                            if (props.onRowClick)
                                props.onRowClick(element);
                        }}>
                            <Table.Cell>{element.naziv}</Table.Cell>
                            <Table.Cell>{element.maksBrojPoena}</Table.Cell>

                        </Table.Row>
                    })
                }
            </Table.Body>
        </Table>
    )
}
