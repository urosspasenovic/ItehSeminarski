import axios from 'axios'
export const SERVER_URL = 'https://localhost:4000';
export function setFormState<T>(setState: (val: T) => void) {
    return function (e: any) {
        const value = e.currentTarget.value;
        setState(value);
    }
}

export async function ucitajFajl(naziv: string) {

    const data = (await axios.get(SERVER_URL + '/fajl/' + naziv, {
        responseType: 'blob',

    })).data;
    const file = new Blob([data], {
        type: "application/pdf"
    });
    const fileURL = URL.createObjectURL(file);
    //Open the URL on new Window
    window.open(fileURL);
}
