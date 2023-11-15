import { createContext, useContext, useState } from "react";


const NavContext = createContext()

export const NavContextProvider = ({children}) =>{
    const [showPrivMenu, SetShowPrivMenu] = useState(false);

    return (
        <NavContext.Provider value={{showPrivMenu, SetShowPrivMenu}}>
            {children}
        </NavContext.Provider>
    )
}

export const useNavContext = () => useContext(NavContext)