//Rutas

import { Route, Routes } from "react-router-dom";
import { LoginForm } from "../components/LoginForm.jsx";
import { RegisterForm } from "../components/RegisterForm.jsx";
import { Dashboard} from "../components/Dashboard.jsx";

export const AppRouter = () => {
    return (
        <Routes>

            <Route path="/" element={<LoginForm />} />

            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm/>}></Route>
            <Route path="/dashboard" element={<Dashboard/>}></Route>
        </Routes>
    )
}
