import axiosAPI from "../API/axiosAPI";
import { clearTokens, getRefreshToken, updateTokens } from "../utils/handleTokens";

export async function login({ workId, password, rememberUser }) {
    const response = await axiosAPI.post(`/identity/login`, {
        workId,
        password
    })

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

export async function resetPasswordTokenValidation(workId: string, token: string){
    return await axiosAPI.post('identity/reset-password-token-validation', {
        workId,
        token
    })
}

export async function resetPassword(payload: ResetPasswordPayload) {
    return await axiosAPI.post(`/identity/reset-forgotten-password`, payload)
}

export async function forgotPassword(workId: string) {
    await axiosAPI.post(`/identity/forgot-password`, { workId })
    return workId;
}



export async function refreshToken() {
    const refreshToken = getRefreshToken();
    clearTokens();
    const response = await axiosAPI.post('/identity/refresh-token', {
        refreshToken,
    })
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;
    updateTokens(newAccessToken, newRefreshToken)
    axiosAPI.headers['Authorization'] = `Bearer ${newAccessToken}`;

    return response;
}


type ResetPasswordPayload = {
    workId: string,
    token: string,
    newPassword: string
}