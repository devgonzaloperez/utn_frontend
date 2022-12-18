import { createHashRouter } from "react-router-dom";
import { RequireAuth } from "../components/RequireAuth/RequireAuth";
import { AdminPage } from "../pages/AdminPage/AdminPage";
import { HomePage } from "../pages/HomePage/HomePage";
import { LandingPage } from "../pages/LandingPage/LandingPage";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { NotFoundPage } from "../pages/NotFound/NotFoundPage";
import { RegisterPage } from "../pages/RegisterPage/RegisterPage";

const ROLES = {
    user: 2001,
    editor: 1984,
    admin: 5150
};

export const router = createHashRouter([
    //Public Routes.
    {path: '/', element: <LandingPage/>},
    {path: '/register', element: <RegisterPage/>},
    {path: '/login', element: <LoginPage/>},

    //Private Routes.
    {element: <RequireAuth allowedRoles={[ROLES.user, ROLES.editor, ROLES.admin]}/>, children: [
        {path: '/home', element: <HomePage/>},
    ]},
    {element: <RequireAuth allowedRoles={[ROLES.admin]}/>, children: [
        {path: '/admin', element: <AdminPage/>},
    ]},
    
    //Catch All.
    {path: '/*', element: <NotFoundPage/>}
]);

//Roles: USER 2001, EDITOR 1984 Y ADMIN 5150 (CREAR PAGE DE CADA ROLE PARA PROBAR).