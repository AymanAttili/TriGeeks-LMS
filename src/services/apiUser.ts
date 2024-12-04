import { AxiosError } from "axios";
import axiosAPI from "../API/axiosAPI";
import { clearTokens, getAccessToken, getRefreshToken } from "../utils/handleTokens";
import { convertToJson } from "../utils/helpers";
import { refreshToken, revokeRefreshToken } from "./apiAuth";

export type User = {
    workId: string,
    firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    gender: 1 | 2,
    birthDate: Date | string,
    educationalLevel: 1 | 2 | 3 | 4,
    role: 2 | 3,
    majorId: number,
    departmentId: number
}

export async function getCurrentUser() {
    const accessToken = getAccessToken();

    if (!accessToken) {
        clearTokens();
        return null;
    }

    const response = await fetchUser()

    return response?.data;
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

    return await axiosAPI.patch('/user/profile-picture',
        [
            {
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

    // axiosAPI.delete(`/files/${oldPic}`) TODO: implementing delete file func

}


export async function changePassword(currentPassword: string, newPassword: string){
    return await axiosAPI.post('/identity/change-password', {
        currentPassword,
        newPassword
    },{
        headers: {
                'Content-Type': 'application/json-patch+json',
                }
    })
}

type searchPayload = {
    "filters"?: string,
    "sorts"?: string,
    "page": number,
    "pageSize": number
}

const initialPayload: searchPayload = {
    "page": 1,
    "pageSize": 8
}

export async function searchUsers(payload:searchPayload = initialPayload) {
    const response = await axiosAPI.post('users/search', payload)
    return response.data;
}

export async function addUser(payload: User){
    return await axiosAPI.post('identity/register', payload)
}

export async function editUser(id:number, payload: User){
    return await axiosAPI.put(`users/${id}`, payload,{
            headers: {
                    'Content-Type': 'application/json-patch+json',
                    }
        }
    )
}

export async function deleteUser(id: number){
    return await axiosAPI.delete(`users/${id}`)
}