import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core";
import { addQuiz, addSection, addSectionPart, assignStaffToCourse, checkCourseFinish, createCourse, deleteCourse, deleteSection, deleteSectionPart, editCourse, editQuiz, editSection, editSectionPart, finishCourse, startCourse, submitExam, toggleSectionPartStatus } from "../../services/apiCourses";
import { useNavigate } from "react-router-dom";

type data = {
    payload: object,
    action: string
}

export function useDispatchCourse() {
    const queryClient = useQueryClient();
    const notifications = useNotifications();
    const navigate = useNavigate()

    const { mutateAsync: courseDispatch, isPending, data, error, isError, isSuccess, context } = useMutation({
        mutationFn: async ({payload, action}: data) => {
            switch(action){
                case 'add': return await createCourse(payload.data);
                case 'edit': return await editCourse(payload.courseId, payload.data);
                case 'delete': return await deleteCourse(payload.courseId);
                case 'checkCourseFinish': await checkCourseFinish(payload.courseId); break;
                case 'assignStaffToCourse': await assignStaffToCourse(payload.courseId, payload.assignments); break;
                case 'startCourse': await startCourse(payload.courseId); break;
                case 'finishCourse': await finishCourse(payload.courseId); break;
                case 'addSection': return await addSection(payload.courseId, payload.data); 
                case 'editSection': return await editSection(payload.courseId, payload.sectionId, payload.data);
                case 'deleteSection': return await deleteSection(payload.courseId, payload.sectionId);
                case 'addSectionPart': return await addSectionPart(payload.sectionId, payload.data);
                case 'addQuiz': return await addQuiz(payload.sectionId, payload.data);
                case 'editQuiz': return await editQuiz(payload.sectionId, payload.sectionPartId, payload.data);
                case 'editSectionPart': return await editSectionPart(payload.sectionId, payload.sectionPartId, payload.data);
                case 'deleteSectionPart': return await deleteSectionPart(payload.sectionId, payload.sectionPartId);
                case 'toggleSectionPartStatus': return await toggleSectionPartStatus(payload.sectionId, payload.sectionPartId);
                case 'submitExam': await submitExam(payload.sectionId, payload.sectionPartId, payload.data); break;
                default: throw new Error('Unknown action')
            }
        },
        onSuccess: (res) => {
            if(res?.action === 'startCourse')
                return ;
            notifications.show('Successful courses action', {
                severity: 'success',
                autoHideDuration: 3000,
            });

            queryClient.invalidateQueries({queryKey: ['course']}) // TODO: invalidate just the edited course by courseId
            queryClient.invalidateQueries({queryKey: ['courseAssignments']}) // TODO: invalidate just the edited course by courseId

            if(res) // for edit, add, delete operations
                queryClient.invalidateQueries({queryKey: ['courses']})

        },
        retry: false,
        onError: (err) => {     
            if(err.message.status === 400)
                navigate('/courses')
            notifications.show(err.message.response?.data?.title, {
                severity: 'error',
                autoHideDuration: 3000,
            });
        }
        
    });

    return { courseDispatch, isLoading: isPending, course: data, error, isError, isSuccess, context };
}
