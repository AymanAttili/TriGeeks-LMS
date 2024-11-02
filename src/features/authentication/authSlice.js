import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
// import axios from 'axios';


const initialState = () => {
    var token = Cookies.get('authToken');
    let user = {};
    let isAuthenticated = false;

    if (token) {
        token = JSON.parse(token);
        isAuthenticated = true;
        user = token;
    }


    return {
        user,
        isAuthenticated,
        status: 'idle',
        error: '',
    }
}

// initialState = {
//     user: {},
//     isAuthenticated: false,
//     status: 'idle',
//     error: '',
// }

export const login = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            // const response = await axios.post('/api/login', credentials);
            // return response.data;
            if (!(credentials.userId === 'userId') || !(credentials.password === 'password'))
                throw new Error('UserId or Password are wrong, try again!')
            const user = {
                name: 'Ayman Attili',
                image: 'https://avatars.githubusercontent.com/u/19550456',
                role: 'admin',
            }
            Cookies.set('authToken', JSON.stringify(user), {
                expires: credentials.rememberUser ? 365 : 30 / 1440,
                secure: true,
                sameSite: 'Strict',
            });
            return {
                user
            }
        }
        catch (error) {
            return rejectWithValue(error.response.data);
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
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;