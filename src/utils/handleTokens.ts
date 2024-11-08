import Cookies from 'js-cookie';

export const clearTokens = () => {
    localStorage.clear('refreshToken');
    Cookies.remove('accessToken');
}

export const updateTokens = (accessToken, refreshToken, rememberUser = true) => {
    clearTokens();
    Cookies.set('accessToken', accessToken, {
        expires: rememberUser ? 30 : 60 / 1440, // 60 mins from BE
        secure: true,
        sameSite: 'Strict',
    });
    localStorage.setItem('refreshToken', refreshToken);
}
export const getAccessToken = () => {
    return Cookies.get('accessToken');
}

export const getRefreshToken = () => {
    return localStorage.getItem('refreshToken');
}

