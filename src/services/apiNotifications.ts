let data = [
    { id: 1, title: "Introduction to Programming", courseName: "Computer Science 101", read: 1, date: "2024-12-01T00:00:00Z", link: "101" },
    { id: 2, title: "Data Structures Basics", courseName: "Algorithms 201", read: 0, date: "2024-12-02T00:00:00Z", link: "201" },
    { id: 3, title: "Understanding Databases", courseName: "Database Management", read: 1, date: "2024-12-03T00:00:00Z", link: "301" },
    { id: 4, title: "Web Development Overview", courseName: "Web Design 101", read: 0, date: "2024-12-04T00:00:00Z", link: "401" },
    { id: 5, title: "Networking Essentials", courseName: "Networking Basics", read: 1, date: "2024-12-05T00:00:00Z", link: "501" },
];

export async function getNotifications(){
    return data
}

export async function getNotification(){
    return data[0]
}

export async function changeNotificationStatus(ids: string[], status: number){
    data.filter((val) => val.link == ids[0])[0].read = status
}