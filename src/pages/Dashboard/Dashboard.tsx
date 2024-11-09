import React from 'react';
import { useUser } from "../../features/users/useUser"
import AdminDashboard from "./AdminDashboard"
import SubAdminDashboard from "./SubAdminDashboard"
import StaffDashboard from "./StaffDashboard"
import { roleNames } from '../../Enums/roles';

function Dashboard() {
    let { user: { role } } = useUser()
    role = roleNames[role]
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