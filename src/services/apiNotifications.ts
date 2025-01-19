import axiosAPI from "../API/axiosAPI";


type getNotificationsPayload = {
    filters?: string,
    sorts?: string,
    page: number,
    pageSize: number
}

export async function getNotification(id: string){
    const payload:getNotificationsPayload = {
        filters: `id==${id}`,
        page: 1,
        pageSize: 1
    }    
    return await axiosAPI.post('user/notifications/search', payload)
}

export async function getNotifications(page: number){
    return await axiosAPI.post('user/notifications/search', {
        filters: "",
        sorts: "-CreatedAtUtc",
        page,
        pageSize: 6
    })
}

export async function getUnreadNotificationsCount(){
    return await axiosAPI.get('user/notifications/unread/count')
}

export async function readNotification(id: string){
    return await axiosAPI.patch(`user/notifications/${id}/is-read`);
}

export async function markAllNotificationsAsRead(){
    return await axiosAPI.patch('user/notifications/is-read')
}