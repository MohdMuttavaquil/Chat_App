import { useEffect } from "react";
import { createContext, useState } from "react";
import axios from "axios";

export const AppContext = createContext()

export const AppProvider = ({ children }) => {

    const [singIn, setSingIn] = useState(false)
    const url = "http://localhost:3000"
    const [token, setToken] = useState(false)
    const [userName, setUserName] = useState("")
    const [userContect, setUserContect] = useState([])
    const [messages, setMessages] = useState([])

    const userInfo = async () => {
        const userToken = localStorage.getItem("token")

        if (userToken) {
            setToken(true)
            const res = await axios.get(`${url}/api/contect/info`, { headers: { userToken } })
            setUserName(res.data.userData)
            setUserContect(res.data.userContect)

            const data = res.data.messages
            const mes = data.reduce((acc, curr)=>{
                const existing = acc.find(item => item.from === curr.from)
                if (existing) {
                    existing.messages.push(curr.message)
                } else {
                    acc.push({from: curr.from, messages: [curr.message] })
                }
                return acc
            }, [])

            setMessages(mes)
        }
    }

    useEffect(() => {
        userInfo()
    }, [token])

    return (
        <AppContext.Provider value={{ token, setToken, singIn, setSingIn, url, userName, setUserName, userContect, setUserContect, userInfo, messages, setMessages }}>
            {children}
        </AppContext.Provider>
    )
}