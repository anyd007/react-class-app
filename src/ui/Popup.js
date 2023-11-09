import { useState } from 'react';
import '../styles/popup.scss';

const Popup = ({status, setOpenPopup}) => {
   
    const handleClosePopup = () => {
        setOpenPopup(false)
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