import axiosAPI from "../API/axiosAPI";

export async function startQuiz(quizId: string){
    return await axiosAPI.post(`exams/${quizId}/user/current-session/start`)
}

export async function checkStartedQuiz(quizId: string){
    return await axiosAPI.get(`exams/${quizId}/user/current-session/is-started`)
}

export async function getQuizSession(quizId: string){
    return await axiosAPI.get(`exams/${quizId}/user/current-session`).catch((err) => {if(err.message.status===409)
        return{data:{
            ended: true,
            questions:[{}],
            checkpointQuestionId:0,
            startDateUtc:"2025-01-07T20:15:59.567631"
            ,
            durationMinutes:1
        }
    }
    }
    )
}

export async function getQuestion(quizId: string, questionId: string){
    if(!questionId)
        return {data: {}}
    return await axiosAPI.get(`exams/${quizId}/user/current-session/questions/${questionId}`)
}

export async function answerQuestion(quizId: string, questionId: string, answer: number){
    return await axiosAPI.put(`exams/${quizId}/user/current-session/questions/${questionId}/answer`,{
        answer
    } )
}

export async function finishQuiz(quizId: string){
    return await axiosAPI.post(`exams/${quizId}/user/current-session/finish`)
}
