import axiosAPI from "../API/axiosAPI";

export async function getDepartment(id: number) {
    const response = await axiosAPI.get(`/departments/${id}`);
    return response.data;
}

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
    })
}

export async function addDepartment(name: string){
    return await axiosAPI.post('/departments',{
        name
    });
}

export async function editDepartment(id:number, name: string){
    return await axiosAPI.put(`/departments/${id}`,{
        name
    });
}

export async function deleteDepartment(id: number){
    return await axiosAPI.delete(`/departments/${id}`);
}