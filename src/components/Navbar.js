import { Link } from "react-router-dom";
import '../styles/navbar.scss';
import { useEffect, useState } from "react";

const Navbar = () => {
    const [home, setHome ] = useState(false)
    const [signin, setSignin] = useState(true)
    const [login, setLogin] = useState(true)

        const handleHomeClick = () =>{
            setHome(false)
            setLogin(true)
            setSignin(true)
        }
   
        const handleSingInClick = () => {
            setHome(true)
            setLogin(true)
            setSignin(false)
        }

        const handleLogInClick = () => {
            setHome(true)
            setLogin(false)
            setSignin(true)
        }

    

    return ( 
        <nav className="navbar">
            <div className="links">
               { home && <Link onClick={handleHomeClick} className="links__item" to="/">Strona główna</Link> }
               { signin && <Link  onClick={handleSingInClick} className="links__item" to="/signin">Rejestracja</Link> }
               { login &&  <Link onClick={handleLogInClick} className="links__item" to="login">Logowanie</Link> }
            </div>
        </nav>
     );
}
 
export default Navbar;