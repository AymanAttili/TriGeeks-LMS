import { Add, Edit } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useDepartments } from "../departments/useDepartments";
import DepartmentMajorsCheckbox from "../../ui/course/DepartmentMajorsCheckbox";
import { useCourseAssignments } from "./useCourseAssignments";
import SpinnerLoader from "../../ui/SpinnerLoader";
import { useEffect, useState } from "react";
import { useDispatchCourse } from "./useDispatchCourse";

function AssignToCourseDialog({ payload, onClose, open }) {
    const { departments, isLoading: fetchingDepartments } = useDepartments();
    const { courseAssignments, isLoading: fetchAssignments } = useCourseAssignments(payload.courseId)
    const { courseDispatch, isLoading: dispatchingCourse } = useDispatchCourse();
    const [checkedList, setCheckedList] = useState([]);

    const handleCheck = (id, checked) => {
        setCheckedList((pre) => pre.filter((it) => it != id))

        if (checked)
            setCheckedList((pre) => {
                pre = pre.filter((it) => it != id)
                return [...pre, Number(id)]
            })
    }

    const isChecked = (id) => {
        return checkedList?.indexOf(id) !== -1
    }

    const handleAssignToCourse = async (e) => {
        e.preventDefault();
        await courseDispatch({
            action: 'assignStaffToCourse',
            payload: {
                courseId: payload.courseId, assignments: checkedList
            }
        }).then(() => onClose())
    }

    useEffect(() => {
        setCheckedList(courseAssignments)
    }, [courseAssignments])

    return (
        <Dialog component='form'
            onSubmit={handleAssignToCourse}
            fullWidth maxWidth={'xs'} open={open} onClose={() => onClose()}>
            <DialogTitle>
                Assign majors to course
            </DialogTitle>
            <DialogContent>
                {
                    (fetchAssignments || fetchingDepartments) ?
                        <SpinnerLoader />
                        :
                        departments?.map((department) => <DepartmentMajorsCheckbox key={department.id} department={department} isChecked={isChecked} check={handleCheck} disabled={fetchingDepartments || fetchAssignments || dispatchingCourse} />)
                }

            </DialogContent>
            <DialogActions>
                <Button color='error' variant='outlined'
                    disabled={fetchingDepartments || fetchAssignments || dispatchingCourse}
                    onClick={() => onClose()}>Cancel</Button>
                <LoadingButton type='submit' variant='outlined'
                    loading={dispatchingCourse} loadingPosition='end' disabled={fetchingDepartments || fetchAssignments || dispatchingCourse}
                    endIcon={<Add />} >
                    Assign
                </LoadingButton>
            </DialogActions>
        </Dialog >
    );

}

export default AssignToCourseDialog