import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";


const AuthContext = createContext()

export const AuthPrivider = ({children}) =>{
    
    const [currentUser, setCurrentUser] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, (user) =>{
            setAuthenticated(!!user);
            if(user){
                setCurrentUser(user)
                setAuthChecked(true);
               
            }
            else{
                setCurrentUser('')
            }
        })
        
        return () => unsubscribe()
       
    },[auth])
    console.log(authenticated);
    return (
        <AuthContext.Provider value={{currentUser, setCurrentUser, authenticated}}>
            {authChecked ? children : children}
        </AuthContext.Provider>
    )

   
}
export const useAuthContext = () => useContext(AuthContext)
