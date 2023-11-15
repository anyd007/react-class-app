import { createContext, useContext, useState } from "react";


const NavContext = createContext()

export const NavContextProvider = ({children}) =>{
    const [showPrivMenu, SetShowPrivMenu] = useState(false);
    const [openPopup, setOpenPopup] = useState(false)

    return (
        <NavContext.Provider value={{showPrivMenu, SetShowPrivMenu, openPopup, setOpenPopup}}>
            {children}
        </NavContext.Provider>
    )
}

export const useNavContext = () => useContext(NavContext)