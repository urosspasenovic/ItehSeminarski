import React, { useEffect, useState } from 'react'
import { Button, Container, Image } from 'semantic-ui-react'
import axios from 'axios';
import Loading from '../components/Loading';
export default function RandomSlika() {
    const [imageSrc, setImageSrc] = useState('');
    const loadImage = () => {
        axios.get('https://picsum.photos/500/400', { withCredentials: false }).then(res => {
            console.log(res);
            setImageSrc(res.request.responseURL)
        })
    }
    useEffect(() => {
        loadImage();
    }, [])
    if (!imageSrc) {
        return <Loading />
    }
    return (
        <Container>
            <Image fluid src={imageSrc} />
            <br />
            <Button fluid onClick={loadImage} primary>Ucitaj novu</Button>
        </Container>
    )
}
