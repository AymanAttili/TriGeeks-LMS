import axiosAPI from "../API/axiosAPI";
import { clearTokens, getAccessToken, getRefreshToken } from "../utils/handleTokens";
import { convertToJson } from "../utils/helpers";
import { refreshToken, revokeRefreshToken } from "./apiAuth";

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

    return await axiosAPI.get(`/users/${user.id}`)
}

export async function updateProfilePicture(file, oldPic){
    const formData = new FormData();
    formData.append('file', file);
    const response = await axiosAPI.post('/files', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })

    const fileId : string = response.data.fileId

    axiosAPI.patch('/user/profile-picture',
        [
            {
                operationType: "Add",
                path: "imageId",
                op: "replace",
                value: fileId
            }
        ],{
            headers: {
                    'Content-Type': 'application/json-patch+json',
                    }
        }
    )
    

    axiosAPI.delete(`/files/${oldPic}`)

}