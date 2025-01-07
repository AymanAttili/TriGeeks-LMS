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

export const trimFormInputStart = (e, setValue) => {
    const trimmedValue = e.target.value.trimStart();
    setValue(e.target.name, trimmedValue, { shouldValidate: true });
};

export const cleanFormData = (data) => {
    Object.keys(data).forEach((key) => {
        if(typeof data[key] === 'string')
            data[key] = data[key].trim();
    }
)
    return data
}


export const toText = (html) => {
    return html.replace(/(<([^>]+)>)/ig, '');
}

export const convertDate = (val) => {
    if(!val)
        return;
    const date = new Date(val);

    // Format the date (Example: "MM/DD/YYYY HH:mm:ss")
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} -- ${date.getHours()}:${date.getMinutes()}`;
}