
import { useEffect, useState } from "react";
import '../styles/usernavbar.scss';
import Grades from "./Grades";
import { useAuthContext } from "../components/AuthContext";

const UserNavbar = () => {
    const { currentUser } = useAuthContext()

   
    return (
        <div className="user-navbar">
           <h2>{`Witaj ${currentUser.displayName}`}</h2> 
        <Grades />
        </div>
    );
}
 
export default UserNavbar;