import { createContext, useState } from "react";

export const AppContext = createContext()

export const AppProvider = ({ children }) => {

    const [singIn, setSingIn] = useState(false)
    const url = "https://chat-app-jkuj.onrender.com"
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