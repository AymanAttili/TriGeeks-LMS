import axiosAPI from "../API/axiosAPI";

export async function startQuiz(quizId: number){
    return await axiosAPI.post(`exams/${quizId}/user/current-session/start`)
}

export async function checkStartedQuiz(quizId: number){
    return await axiosAPI.get(`exams/${quizId}/user/current-session/is-started`)
}

export async function getQuizSession(quizId: number){
    return await axiosAPI.get(`exams/${quizId}/user/current-session`)
}

export async function getQuestion(quizId: number, questionId: number){
    return await axiosAPI.get(`exams/${quizId}/user/current-session/questions/${questionId}`)
}

export async function answerQuestion(quizId: number, questionId: number, answer: number){
    return await axiosAPI.put(`exams/${quizId}/user/current-session/questions/${questionId}/answer`,{
        answer
    } )
}

export async function finishQuiz(quizId: number){
    return await axiosAPI.post(`exams/${quizId}/user/current-session/finish`)
}
