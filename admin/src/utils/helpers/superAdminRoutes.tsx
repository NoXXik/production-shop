import React, {ReactNode} from 'react';
import {useAppSelector} from "../hooks/reduxHooks";
import {useNavigate} from "react-router-dom";

function SuperAdminRoutes({children}: any) {
    const admin = useAppSelector(state => state.auth.data)
    const navigate = useNavigate()
    if(admin && (admin.is_super_admin === false)) {
        navigate('/')
    }
    return (
        <>
            {children}
        </>
    );
}

export default SuperAdminRoutes;
