import { convertToJson } from "../utils/helpers";
import Cookies from 'js-cookie';

const API_URL = import.meta.env.VITE_API_URL

export async function login({ workId, password, rememberUser }) {
    const response = await fetch(`${API_URL}/identity/login`, {
        method: 'POST',
        body: JSON.stringify({
            workId,
            password
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })

    if (!response.ok) throw new Error("Invalid credentials");

    const data = await response.json();

    return { data, rememberUser };
}

export async function resetPassword(workId, token, newPassword) {
    const response = await fetch(`${API_URL}/identity/reset-forgotten-password`, {
        method: 'POST',
        body: JSON.stringify({
            workId,
            token,
            newPassword
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })

    return response;
}

export async function forgotPassword(workId) {
    const response = await fetch(`${API_URL}/identity/forgot-password`, {
        method: 'POST',
        body: JSON.stringify({
            workId
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })

    return response;
}

export async function getCurrentUser() {
    const token = Cookies.get('accessToken');
    if (!token) return null;

    const user = convertToJson(token)

    return user;
}