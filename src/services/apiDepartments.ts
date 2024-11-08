import axiosAPI from "../API/axiosAPI";

export async function getDepartments() {
    return await axiosAPI.get('/departments');
}