import { useState } from 'react';
import '../styles/popup.scss';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { signOut } from "firebase/auth";

const Popup = ({popupTxt, setOpenPopup}) => {
    const navigate = useNavigate()
   
    const handleClosePopup = () => {
        setOpenPopup(false)
       
    }

    const handleLogout = async () =>{
        try{
            await signOut(auth);
            navigate('/');
            setOpenPopup(false)
        }
        catch(err){
            console.log(err.code);
        }
    }
    return (
        <>
        <div className="popup-container">
            <div className="popup">
            <h2>{popupTxt}</h2>
                <button onClick={handleLogout}>tak</button>
                <button onClick={handleClosePopup}>nie</button>
            </div>
        </div> 
        </>
    );
}

export default Popup;