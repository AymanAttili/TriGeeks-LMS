import { jwtDecode } from "jwt-decode";

export const convertToJson = (token) => {
    const decoded = jwtDecode(token);

    const newToken = {};
    Object.keys(decoded).forEach((key) => {
        let newKey = key.split('/').slice(-1)
        if (newKey[0] === 'emailaddress')
            newKey[0] = 'email';
        if (newKey[0] === 'nameidentifier')
            newKey[0] = 'id'
        console.log(newKey)
        newToken[newKey] = decoded[key];
    });
    return newToken;
}