import axiosAPI from "../API/axiosAPI";

type searchPaylod = {
    filters: string,
    sorts: string,
    page: number,
    pageSize: number
}

export async function getMajors(departmentId: number) {
    const payload: searchPaylod = {
        filters: '',
        sorts: '',
        page: 1,
        pageSize: 9999
    }
    const response = await searchMajors(departmentId,payload)

    return response.data.items
}
export async function searchMajors(departmentId: number,payload: searchPaylod){
    return await axiosAPI.post(`/departments/${departmentId}/majors/search`, payload)
}


export async function addMajor(departmentId:number, name: string){
    return await axiosAPI.post(`/departments/${departmentId}/majors`,{
        name
    });
}

export async function editMajor(departmentId:number, majorId:number, name: string){    
    return await axiosAPI.put(`/departments/${departmentId}/majors/${majorId}`,{
        name
    });
}

export async function deleteMajor(departmentId:number, majorId:number){
    return await axiosAPI.delete(`/departments/${departmentId}/majors/${majorId}`);
}