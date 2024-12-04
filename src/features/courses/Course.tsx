import { useParams } from "react-router-dom"
import { useCourse } from "./useCourse";

function Course() {
    const { courseId } = useParams();
    const { course } = useCourse(courseId);
    return (
        <div>Course</div>
    )
}

export default Course
