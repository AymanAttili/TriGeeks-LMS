import axiosAPI from "../API/axiosAPI";

export async function getDepartments() {
    const response = await searchDepartments('', '', 1, 9999)

    return response.data.items
}

export async function searchDepartments(filters: string, sorts: string, page: number, pageSize: number){
    return await axiosAPI.post('/departments/search',{
        filters,
        sorts,
        page,
        pageSize
});
}