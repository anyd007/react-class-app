import { useState } from 'react';
import '../styles/popup.scss';
import { useNavigate } from 'react-router-dom';

const Popup = ({status, setOpenPopup}) => {
    const navigate = useNavigate()
   
    const handleClosePopup = () => {
        setOpenPopup(false)
        navigate("./login")
    }
    return (
        <>
        <div className="popup-container">
            <div className="popup">
                <button onClick={handleClosePopup}>✖️</button>
                <p className="popup__txt">{status}</p>
            </div>
        </div> 
        </>
    );
}

export default Popup;