import { jwtDecode } from "jwt-decode";

export const convertToJson = (token) => {
    try {
        const decoded = jwtDecode(token);

        const newToken = {};
        Object.keys(decoded).forEach((key) => {
            let newKey = key.split('/').slice(-1)
            if (newKey[0] === 'emailaddress')
                newKey[0] = 'email';
            if (newKey[0] === 'nameidentifier')
                newKey[0] = 'id'
            newToken[newKey] = decoded[key];
        });

        return newToken;
    }
    catch {
        return {}
    }
}

export const convertDate = (val) => {
    const date = new Date(val);

    // Format the date (Example: "MM/DD/YYYY HH:mm:ss")
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}