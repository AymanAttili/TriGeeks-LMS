import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authentication/authSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export default store;