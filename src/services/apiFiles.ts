import axiosAPI from "../API/axiosAPI";

export async function addFile(file){
    const formData = new FormData();
    formData.append('file', file);
    return await axiosAPI.post('/files', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
}

export async function deleteFile(id){
    return await axiosAPI.delete(`files/${id}`)
}

