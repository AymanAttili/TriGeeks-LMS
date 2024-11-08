import axiosAPI from "../API/axiosAPI";
import { clearTokens, getAccessToken, getRefreshToken } from "../utils/handleTokens";
import { convertToJson } from "../utils/helpers";

export async function login({ workId, password, rememberUser }) {
    const response = await axiosAPI.post(`/identity/login`, {
        workId,
        password
    }).catch(() => { throw new Error('Invalid credentials') })

    const data = response.data
    return { data, rememberUser };
}

export async function revokeRefreshToken() {
    const refreshToken = getRefreshToken();
    const response = await axiosAPI.post(`/identity/revoke-refresh-token`, {
        refreshToken,
    })
    clearTokens();

    return response;
}

export async function resetPassword(workId, token, newPassword) {
    return await axiosAPI.post(`/identity/reset-forgotten-password`, {
        workId,
        token,
        newPassword
    })
}

export async function forgotPassword(workId) {
    return await axiosAPI.post(`/identity/forgot-password`, { workId })
}

export async function fetchUser() {
    const accessToken = getAccessToken();
    const user = convertToJson(accessToken)
    if (!user?.id || !user?.exp) {
        clearTokens();
        return null;
    }

    const expDate = new Date(user.exp * 1000);

    const currentDate = new Date();

    if (expDate < currentDate) {
        await refreshToken();
    }

    return await axiosAPI.get(`/identity/users/${user?.id}`)
}

export async function refreshToken() {
    const refreshToken = getRefreshToken();
    return await axiosAPI.post('/identity/refresh-token', {
        refreshToken,
    })
}

export async function getCurrentUser() {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    if (!accessToken) {
        if (refreshToken)
            revokeRefreshToken()
        return null;
    }

    const response = await fetchUser()

    return response.data;
}