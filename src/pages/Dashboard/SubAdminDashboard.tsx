import { Navigate } from "react-router-dom"

function SubAdminDashboard() {
    return (
        <Navigate replace to={'/my-courses'} />
    )
}

export default SubAdminDashboard