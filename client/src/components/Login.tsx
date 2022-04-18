import React, { useState } from 'react';
import { Container, Form } from 'semantic-ui-react';
import { setFormState } from '../util';

interface Props {
    onSubmit: (val: { email: string, password: string }) => Promise<void>
}

export default function Login(props: Props) {

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('')
    const [error, setError] = useState('');
    return (
        <Container  >
            <Form onSubmit={() => {
                props.onSubmit({
                    email,
                    password
                }).catch(err => {
                    setError('Desila se greska');
                })
            }}>
                <Form.Input required value={email} onChange={setFormState(setEmail)} label='Email' />
                <Form.Input required value={password} onChange={setFormState(setPassword)} label='Sifra' type='password' />

                <Form.Button fluid error={error || undefined} >Login</Form.Button>
            </Form>
        </Container>
    )
}
