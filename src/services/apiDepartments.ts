import axiosAPI from "../API/axiosAPI";

export async function getDepartments() {
    const response = await axiosAPI.get('/departments');
    return response.data;
}