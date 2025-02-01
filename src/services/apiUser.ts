import axiosAPI from "../API/axiosAPI";
import { clearTokens, getAccessToken } from "../utils/handleTokens";
import { convertToJson } from "../utils/helpers";
import { refreshToken } from "./apiAuth";
import { addFile } from "./apiFiles";

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

export async function updateProfilePicture(file){
    const fileId : string =  (await addFile(file)).data.fileId

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

export type searchPayload = {
    "filters"?: string,
    "sorts"?: string,
    "page": number,
    "pageSize": number,
    userStatus?:boolean
}

export async function searchUsers(payload:searchPayload) {
    payload = {
        ...payload,
        filters: `isActive==${payload.userStatus}, ${payload.filters ? payload.filters : ''}`
    }
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

export async function deactivateUser(id: number, status: boolean){
    return await axiosAPI.patch(`users/${id}/activation`, [
        {
            path: "IsActive",
            op: "replace",
            value: status
        }
    ])
}