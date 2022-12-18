import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const RequireAuth = ({allowedRoles}) => {
    const authStore = useSelector(state => state.authStore);
    const location = useLocation();

    return (
        authStore?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet/> //Any child component of RequireAuth
            : authStore?.accessToken
                ? <Navigate to='/unauthorized' state={{from: location}} replace/>
                : <Navigate to='/login' state={{from: location}} replace/>     
    )
};