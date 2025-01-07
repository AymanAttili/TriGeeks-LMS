import { AxiosError } from "axios";
import axiosAPI from "../API/axiosAPI";
import { addFile } from "./apiFiles";

export async function getCourseParticipants(courseId: string,page:string,filter: number){
    let newFilter=''
    if(filter > 0){
        newFilter = `status==${filter}`
    }
    const payload = {
        filters: newFilter,
        sorts: "",
        page,
        pageSize: 10
    }
    return await axiosAPI.post(`/courses/${courseId}/participants`, payload)
}

export async function pokeUser(courseId: string, userId: string) {
    return await axiosAPI.post(`/courses/${courseId}/participants/${userId}/late-notifications`)

}


export async function getCourse(courseId: string){
    return await axiosAPI.get(`/courses/${courseId}`).catch((err) => new AxiosError(err))
}

export async function searchCourses(query){
    return await axiosAPI.post(`/courses/search`, query)
}

export async function checkCourseFinish(courseId: string){
    return await axiosAPI.get(`/courses/${courseId}/is-finished`)
}

export async function createCourse(payload){
    return await axiosAPI.post(`/courses`, payload);
}

export async function editCourse(courseId: string, payload){
    return await axiosAPI.put(`/courses/${courseId}`, payload);
}

export async function deleteCourse(courseId: string){
    return await axiosAPI.delete(`/courses/${courseId}`);
}

export async function assignStaffToCourse(courseId: string, assignments: number[]){
    return await axiosAPI.put(`/courses/${courseId}/assignments`, {assignments});
}
export async function getCourseAssigns(courseId: string){
    return await axiosAPI.get(`/courses/${courseId}/assignments`);
}


export async function startCourse(courseId: string){
    await axiosAPI.post(`/courses/${courseId}/start`);

    return {action: 'startCourse'}
}

export async function finishCourse(courseId: string){
    return await axiosAPI.post(`/courses/${courseId}/finish`);
}

export async function getCoursesOverview() {
    return await axiosAPI.get('/user/courses-status');
}

////////////////////////////////////////////////////////////////////////////////////////////
// Section
////////////////////////////////////////////////////////////////////////////////////////////

export async function addSection(courseId: string, payload){
    return await axiosAPI.post(`/courses/${courseId}/sections`, payload);
}

export async function getSection(courseId: string, sectionId: string){
    return await axiosAPI.get(`/courses/${courseId}/sections/${sectionId}`);
}

export async function editSection(courseId: string, sectionId: string, payload){
    return await axiosAPI.put(`/courses/${courseId}/sections/${sectionId}`, payload);
}

export async function deleteSection(courseId: string, sectionId: string){
    return await axiosAPI.delete(`/courses/${courseId}/sections/${sectionId}`);
}


////////////////////////////////////////////////////////////////////////////////////////////
// SectionPart
////////////////////////////////////////////////////////////////////////////////////////////

export async function addSectionPart(sectionId: string, payload){
    const { materialType, file, title, link, questions } = payload;
    
    let newPayload = {
        title,
        materialType
    }

    if(materialType === 'File'){
        const fileId : string =  (await addFile(file)).data.fileId
        newPayload = {
            ...newPayload,
            fileId
        }
    }

    else if(materialType === 'Link'){
        newPayload = {
            ...newPayload,
            link
        }
    }
    else if(materialType === 'Exam'){
        newPayload = {
            ...newPayload,
            questions
        }
    }

    else{
        return new AxiosError('Invalid Material Type')
    }

    return await axiosAPI.post(`/sections/${sectionId}/parts`, newPayload);
}

export async function addQuiz(sectionId: string, data){
    const { exam: {questions} } = data;

    let newQuestions = []
    await Promise.all(questions.map(async (question) => {
        let imageId = null;
        if(question.file)
            imageId  =  (await addFile(question.file)).data.fileId
        
        newQuestions.push({
            text: question.text,
            points: question.points,
            imageId,
            choices: question.choices
        })
    }))

    data.exam.questions = newQuestions
    

    return await axiosAPI.post(`/sections/${sectionId}/parts`, data);
}

export async function editQuiz(sectionId: string, sectionPartId: number, data){
    const { exam: {questions} } = data;

    let newQuestions = []
    await Promise.all(questions.map(async (question) => {
        let imageId = null;
        if(question.file)
            imageId  =  (await addFile(question.file)).data.fileId

        
        newQuestions.push({
            text: question.text,
            points: question.points,
            imageId,
            choices: question.choices,
            id: question.id
        })
    }))

    data.exam.questions = newQuestions    

    return await axiosAPI.put(`/sections/${sectionId}/parts/${sectionPartId}`, data);
}


export async function getSectionPart(sectionId: string, sectionPartId: string){
    return await axiosAPI.get(`/sections/${sectionId}/parts/${sectionPartId}`);
}

export async function getExamOverview(examId){
    return await axiosAPI.get(`/exams/${examId}`);
}


export async function editSectionPart(sectionId: string, sectionPartId: string, payload){
    const { materialType, file, title, link, questions } = payload;
    
    let newPayload = {
        title,
        materialType
    }

    if(materialType === 'File' && file){
        const fileId : string =  (await addFile(file)).data.fileId
        newPayload = {
            ...newPayload,
            fileId
        }
    }

    else if(materialType === 'Link'){
        newPayload = {
            ...newPayload,
            link
        }
    }
    else if(materialType === 'Exam'){
        newPayload = {
            ...newPayload,
            questions
        }
    }

    else{
        return new AxiosError('Invalid Material Type')
    }

    return await axiosAPI.put(`/sections/${sectionId}/parts/${sectionPartId}`, newPayload);
}

export async function deleteSectionPart(sectionId: string, sectionPartId: string){
    return await axiosAPI.delete(`/sections/${sectionId}/parts/${sectionPartId}`);
}

export async function toggleSectionPartStatus(sectionId: string, sectionPartId: string){
    await axiosAPI.patch(`/sections/${sectionId}/parts/${sectionPartId}/current-user/done`);

    return {action: 'toggleSectionPartStatus'}
}

export async function submitExam(sectionId: string, sectionPartId: string, payload){
    return await axiosAPI.put(`/sections/${sectionId}/parts/${sectionPartId}/current-user/status`, payload);
}
