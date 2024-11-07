import React from 'react';
import { useUser } from "../../features/users/useUser"
import AdminDashboard from "./AdminDashboard"
import SubAdminDashboard from "./SubAdminDashboard"
import StaffDashboard from "./StaffDashboard"

function Dashboard() {
    const { user: { role } } = useUser()
    return (
        <>
            {
                role === 'Admin'
                    ? <AdminDashboard />
                    : role === 'SubAdmin'
                        ? <SubAdminDashboard />
                        : <StaffDashboard />
            }
        </>
    )
}

export default Dashboard