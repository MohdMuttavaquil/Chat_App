import { createContext, useState } from "react";

export const AppContext = createContext()

export const AppProvider = ({ children }) => {

    const url = "https://api2.stylevibe.fun/"
    // const url = "http://localhost:3000/"

    const [singIn, setSingIn] = useState(false)
    const [token, setToken] = useState(false)
    const [userName, setUserName] = useState("")
    const [userContect, setUserContect] = useState([])
    const [messages, setMessages] = useState([])

    return (
        <AppContext.Provider value={{ token, setToken, singIn, setSingIn, url, userName, setUserName, userContect, setUserContect, messages, setMessages }}>
            {children}
        </AppContext.Provider>
    )
}