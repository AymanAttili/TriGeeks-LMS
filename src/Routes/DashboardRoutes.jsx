import { Route } from "react-router-dom"
import DashboardLayoutWrapper from "../Components/Dashboard/Helpers/DashboardLayoutWrapper"
import Dashboard from "../Components/Dashboard/DashboardPages/Dashboard";
import MyCourses from "../Components/Dashboard/DashboardPages/MyCourses";
import PrivateRoute from "../Services/PrivateRoute"
const DashboardRoutes = () => {
    return (
        <Route Component={PrivateRoute}>
            <Route Component={DashboardLayoutWrapper} >
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/my-courses' element={<MyCourses />} />
                <Route path='/favourite-courses' element={<h1>favourite-courses</h1>} />
                <Route path='/explore-courses' element={<h1>explore-courses</h1>} />
                <Route path='/chats' element={<h1>chats</h1>} />
                <Route path='/settings' element={<h1>settings</h1>} />
            </Route>
        </Route>
    )
}

export default DashboardRoutes