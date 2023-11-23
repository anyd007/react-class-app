import { createContext, useContext, useState } from "react";


const NavContext = createContext()

export const NavContextProvider = ({children}) =>{
    const [showPrivMenu, SetShowPrivMenu] = useState(false);
    const [openPopup, setOpenPopup] = useState(false)
    const [grades, setGrades] = useState([])

    return (
        <NavContext.Provider value={{showPrivMenu, SetShowPrivMenu, openPopup, setOpenPopup, grades, setGrades}}>
            {children}
        </NavContext.Provider>
    )
}

export const useNavContext = () => useContext(NavContext)