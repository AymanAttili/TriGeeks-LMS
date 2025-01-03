import { Navigate } from "react-router-dom"

function SubAdminDashboard() {
    return (
        <Navigate replace to={'/courses'} />
    )
}

export default SubAdminDashboard