import { Route } from "react-router-dom"
import LoginPage from "../Components/AuthPages/LoginPage"
import ForgotPassword from "../Components/AuthPages/ForgotPassword"
import ResetPassword from "../Components/AuthPages/ResetPassword"
import PublicRoute from "../Services/PublicRoute"

const AuthRoutes = () => {
    return (
        <Route Component={PublicRoute}>
            <Route path='/' element={<LoginPage />} />
            <Route path='/forgotPassword' element={<ForgotPassword />} />
            <Route path='/resetPassword' element={<ResetPassword />} />
        </Route>
    )
}

export default AuthRoutes