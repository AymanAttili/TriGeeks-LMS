import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const API_URL = import.meta.env.VITE_API_URL


const convertToJson = (token) => {
    const decoded = jwtDecode(token);
    const newToken = {};
    Object.keys(decoded).forEach((key) => {
        let newKey = key.split('/').slice(-1)
        if (newKey[0] === 'emailaddress')
            newKey[0] = 'email';
        if (newKey[0] === 'nameidentifier')
            newKey[0] = 'id'
        console.log(newKey)

        newToken[newKey] = decoded[key]; // Example modification
    });

    console.log(newToken);

    return newToken;
}

const initialState = () => {
    var token = Cookies.get('authToken');
    let user = {};
    let isAuthenticated = false;

    if (token) {
        token = JSON.parse(token);
        token.accessToken = convertToJson(token.accessToken)
        isAuthenticated = true;
        user = token.accessToken;
    }

    return {
        user,
        // refreshToken: token?.refreshToken,
        isAuthenticated,
        status: 'idle',
        error: '',
    }
}



export const login = createAsyncThunk(
    'auth/login',
    async (credentials) => {
        try {
            const response = await fetch(`${API_URL}/identity/login`, {
                method: 'POST',
                body: JSON.stringify({
                    workId: credentials.workId, //TODO: change userId to workId in login page
                    password: credentials.password
                }),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            const data = await response.json();

            console.log(data)
            if (!response.ok) {
                let errorMessage = '';

                switch (response.status) {//TODO: checking the types of errors
                    case 400: {
                        errorMessage = data.title;
                        break
                    }
                    case 401: {
                        errorMessage = "Invalid credentials";
                        break;
                    }

                    default: errorMessage = "Server error, please check network and try again!"
                }

                throw new Error(errorMessage)
            }



            Cookies.set('authToken', JSON.stringify(data), { //TODO: checking if we have to tell the BE about the 'Remember me'
                expires: credentials.rememberUser ? 365 : 30 / 1440,
                secure: true,
                sameSite: 'Strict',
            });

            const user = convertToJson(data.accessToken)


            return { user }
        }
        catch (error) {
            throw new Error(error.message);
        }
    });

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.status = 'idle';
            state.refreshToken = '';
            Cookies.remove('authToken');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'idle';
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;