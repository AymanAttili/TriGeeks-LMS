import { useParams } from "react-router-dom"

function Department() {
    const { departmentId } = useParams();
    return (
        <div>Department: {departmentId}</div>
    )
}

export default Department