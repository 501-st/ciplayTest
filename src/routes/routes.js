import React from 'react';
import {Route, Routes} from "react-router";
import "../index.css"
import Login from "../pages/login";
import Registration from "../pages/registration";
import ChangePassword from "../pages/change-password";

const RoutesComponent = () => {

    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/registration" element={<Registration/>}/>
            <Route path="/changePass" element={<ChangePassword/>}/>
            <Route path="/*" element={<Login/>}/>
        </Routes>
    )
}

export default RoutesComponent;
