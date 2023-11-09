import { useEffect, useState } from "react"
import Popup from "../ui/Popup";
import Button from "../ui/Button";
import UserNavbar from "../user/UserNavbar";
import {auth} from '../config/firebase'
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import '../styles/login.scss';

const Login = () => {

    const [emailLogin, setEmailLogin] = useState('')
    const [passwordLogin, setPasswordLogin] = useState('')
    const [checkLogin, setCheckLogin] = useState(false)
    const [errorTxt, setErrorTxt] = useState('')
    const [txtStatus, setTxtStatus] = useState('')
    const [openPopup, setOpenPopup] = useState(false);
    const [user, setUser] = useState(null)


    const loginSubmit = async (e) =>{
        e.preventDefault()
       
        try{
            await signInWithEmailAndPassword(auth, emailLogin, passwordLogin)
            setOpenPopup("Logowanie udane")
            setCheckLogin(true)
            setTxtStatus("Logowanie udane !")
        }
        catch(err){
            console.log(err.code);
            if(err.code === "auth/invalid-email"){
                setErrorTxt("błędny email ")
            }
            else if(err.code === "auth/missing-password"){
                setErrorTxt("niewłaściew hasło ")
            }
            else if(err.code === "auth/invalid-login-credentials"){
                setErrorTxt("Nieprawidłowe dane logowania ")
            }
            else{
                setErrorTxt("błąd logowania " + err.message)
            }

            setCheckLogin(false)
        }
    }
    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            // console.log(user.email);
            if (user) {
                setCheckLogin(true);
              } else {
                setCheckLogin(false);
              }
          
          },);
      
          return () => unsubscribe();
    },[])

    return (
        <div className="login">
         
            { openPopup && <Popup status={txtStatus} setOpenPopup={setOpenPopup}/> }
        {checkLogin ? ( <UserNavbar /> ) : (
            <>
            <h2>Logowanie</h2>
            <form className="signin__container" onSubmit={loginSubmit}>
                <label>Podaj e-mail</label>
                <input type="text"
                    placeholder="e-mail..."
                    value={emailLogin}
                    onChange={(e) => setEmailLogin(e.target.value)}
                    required
                />
                <label>Podaj hasło</label>
                <input type="text"
                    placeholder="hasło..."
                    value={passwordLogin}
                    onChange={(e) => setPasswordLogin(e.target.value)}
                    required
                />
               
                <Button value="LOGOWANIE" />
            </form>
            <p className="error-txt">{errorTxt}</p>
            </>
        )}
        
        </div>
    );
}
 
export default Login;