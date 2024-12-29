import axiosAPI from "../API/axiosAPI";

let data = [
    { id: 1, title: "Introduction to Programming", courseName: "Computer Science 101", read: 1, date: "2024-12-01T00:00:00Z", link: "101" },
    { id: 2, title: "Data Structures Basics", courseName: "Algorithms 201", read: 0, date: "2024-12-02T00:00:00Z", link: "201" },
    { id: 3, title: "Understanding Databases", courseName: "Database Management", read: 1, date: "2024-12-03T00:00:00Z", link: "301" },
    { id: 4, title: "Web Development Overview", courseName: "Web Design 101", read: 0, date: "2024-12-04T00:00:00Z", link: "401" },
    { id: 5, title: "Networking Essentials", courseName: "Networking Basics", read: 1, date: "2024-12-05T00:00:00Z", link: "501" },
];

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
    return await getNotifications(payload)
}

export async function getNotifications(payload: getNotificationsPayload){
    return await axiosAPI.post('user/notifications', payload)
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