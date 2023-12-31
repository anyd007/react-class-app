import Button from "../ui/Button";
import '../styles/signin.scss';
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import Loading from "../ui/Loading";
import { useNavigate } from "react-router-dom";

const Signin = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRepassword] = useState('')
    const [name, setName] = useState('')
    const [errorTxt, setErrorTxt] = useState('')
    const [txtStatus, setTxtStatus] = useState('')
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()



    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorTxt('')
        setLoading(true)
        if (password !== repassword) {
            setErrorTxt("Hasła nie są identyczne")
            setLoading(false)
        }
        else if(!email.includes("@")){
            setErrorTxt("Błędny mail")
            setLoading(false)
        }
        else {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password)
                setTxtStatus("Rejestacja zakończona sukscesem...")
                setErrorTxt('')
                setEmail('')
                setPassword('')
                setRepassword('')
                setLoading(false)
                
                await updateProfile(userCredential.user, {
                    displayName: name
                })
            }
            catch (err) {
                console.log(err.message);
                if(err.code === "auth/weak-password"){
                    setTxtStatus("Błąd rejestacji:  hasło jest za słabe")
                }
                else if(err.code === "auth/email-already-in-use"){
                    setTxtStatus("Konto z tym mailem już istnieje")
                }
                else{
                setTxtStatus("Błąd rejestacji: " + err.code)
                }
                setLoading(false)
            }
        }
    }
    const signinWithGoogle = async () => {
        try{
            await signInWithPopup(auth, googleProvider)
            navigate('/users')
        }
        catch(err){
            console.log(err.message);
            setTxtStatus("Błąd rejestacji: " + err.code)
        }
    }
    return (

        <div className="signin">
            { loading && <Loading  /> }
            <h2>rejestracja</h2>
            <p className="error">{txtStatus}</p>
            <p>szybka:</p>
            <Button value="PRZEZ GOOGLE" onClick={signinWithGoogle}/>
            <p>lub tradycyjna:</p>
            <form className="signin__container" onSubmit={handleSubmit}>
                <label>Podaj e-mail</label>
                <input type="text"
                    placeholder="e-mail..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                 <label>Podaj swoje imię</label>
                <input type="text"
                    placeholder="imię..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <label>Podaj hasło</label>
                <input type="password"
                    placeholder="hasło..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label>Powtórz hasło</label>
                <input type="password"
                    placeholder="hasło..."
                    value={repassword}
                    onChange={(e) => setRepassword(e.target.value)}
                    required
                />
                <Button value="REJESTRACJA" />
            </form>
            <p className="errorTxt">{errorTxt}</p>
        </div>
    );
}

export default Signin;