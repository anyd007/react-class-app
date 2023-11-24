import { createContext, useContext, useState } from "react";


const NavContext = createContext()

export const NavContextProvider = ({children}) =>{
    const [showPrivMenu, SetShowPrivMenu] = useState(false);
    const [openPopup, setOpenPopup] = useState(false)
    const [openDeletePopup, setOpenDeletePopup] = useState(false)
    return (
        <NavContext.Provider value={{showPrivMenu, SetShowPrivMenu, openPopup, setOpenPopup, openDeletePopup, setOpenDeletePopup}}>
            {children}
        </NavContext.Provider>
    )
}

export const useNavContext = () => useContext(NavContext)