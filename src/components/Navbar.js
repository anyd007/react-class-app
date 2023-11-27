import { Link } from "react-router-dom";
import '../styles/navbar.scss';
import { useNavContext } from "./NavContext";
import { useAuthContext } from "./AuthContext";
import Button from "../ui/Button";
import { useEffect, useState } from "react";
import Popup from '../ui/Popup'

const Navbar = () => {
  
    const { currentUser } = useAuthContext()
    const {showPrivMenu, SetShowPrivMenu} = useNavContext()
    const [openPopup, setOpenPopup] = useState(false)
    const [popupTxt, setPopuopTxt] = useState('')
    const [userPhoto, setUserPhoto] = useState(false)

    const handleOpenPopup = () => {
        setOpenPopup(true)
        setPopuopTxt('czy napewno chcesz się wylogować?')
    }
    useEffect(() =>{
        if(currentUser){
            SetShowPrivMenu(true)
            setUserPhoto(true)
        }
        else{
            SetShowPrivMenu(false)
            setUserPhoto(false)
        }
    },[currentUser])



    return (
        <nav className="navbar">
            { userPhoto && <img src={currentUser.photoURL} alt="" /> }
            <div className="links">
                <Link className="links__item" to="/">Strona główna</Link>
                {!showPrivMenu && <Link  className="links__item" to="/signin">Rejestracja</Link>}
                {!showPrivMenu && <Link  className="links__item" to="login">Logowanie</Link>}
                {showPrivMenu && <Link className="links__item" to="/users/">oceny</Link>}
                {showPrivMenu && <Link className="links__item" to="/users/notes">notatki</Link>}
                {showPrivMenu && <Button onClick={handleOpenPopup} value="WYLOGUJ SIĘ"/>}
                {openPopup && <Popup setOpenPopup={setOpenPopup} popupTxt={popupTxt}/>}
            </div>
        </nav>
    );
}

export default Navbar;