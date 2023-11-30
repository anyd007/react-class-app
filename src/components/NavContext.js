import { createContext, useContext, useState } from "react";


const NavContext = createContext()

export const NavContextProvider = ({children}) =>{
    const [showPrivMenu, SetShowPrivMenu] = useState(false);
    const [openPopup, setOpenPopup] = useState(false)
    const [openDeletePopup, setOpenDeletePopup] = useState(false)
    const [openEditPopup, setOpenEditPopup] = useState(false)
    return (
        <NavContext.Provider value={{showPrivMenu, SetShowPrivMenu, openPopup, setOpenPopup, 
        openDeletePopup, setOpenDeletePopup, openEditPopup, setOpenEditPopup}}>
            {children}
        </NavContext.Provider>
    )
}

export const useNavContext = () => useContext(NavContext)