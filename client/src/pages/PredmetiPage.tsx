import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import PredmetOpis from '../components/PredmetOpis';
import PredmetTabela from '../components/PredmetTabela';
import SeminarskiTabela from '../components/SeminarskiTabela';
import { Predmet } from '../model';

interface Props {
    predmeti: Predmet[],
}

export default function PredmetiPage(props: Props) {


    const [selPredmet, setSelPredmet] = useState<Predmet | undefined>(undefined);

    const onRowClick = (predmet: Predmet) => () => {
        setSelPredmet(predmet);
    }

    return (
        <Grid padded >
            <Grid.Row textAlign='center'>
                <Grid.Column textAlign='center' width='16' >
                    <h1>Predmeti</h1>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns='16'>
                <Grid.Column width='5'>
                    <PredmetTabela predmeti={props.predmeti} onRowClick={onRowClick} />
                </Grid.Column>
                {
                    selPredmet && (
                        <>
                            <Grid.Column width='5'>
                                <PredmetOpis predmet={selPredmet} />
                            </Grid.Column>
                            <Grid.Column width='6'>
                                <SeminarskiTabela radovi={selPredmet.seminarski} />
                            </Grid.Column>
                        </>
                    )
                }
            </Grid.Row>
        </Grid>
    )
}
