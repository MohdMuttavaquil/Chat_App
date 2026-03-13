import React, { useState, useContext } from 'react'
import { AppContext } from '../../Context/AppContext'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { socket } from '../../socket'
import { loginApi, singinApi } from '../../Api/user.api'

const Singin = () => {

  const { singIn, setSingIn, setUserName, setToken, setUserContect, setMessages } = useContext(AppContext)
  const navigate = useNavigate()


  const [data, setData] = useState({
    email: "",
    userName: "",
    password: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }


  const offlineMesg = (data) => {

    const mes = data.reduce((acc, curr) => {
      const existing = acc.find(item => item.from === curr.from)
      if (existing) {
        existing.messages.push(curr.message)
      } else {
        acc.push({ from: curr.from, messages: [curr.message] })
      }
      return acc
    }, [])

    setMessages(mes)
  }

  // fatch data from database
  const userData = (res) => {
    sessionStorage.setItem("token", res.token)
    setToken(true)
    setUserName(res.userData)
    setUserContect(res.userContect)
    offlineMesg(res.messages)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setData({ email: "", userName: "", password: "" })

    const ressult = singIn ? await singinApi(data) : await loginApi(data)
    if (!ressult) return
    userData(ressult)

    socket.connect()
    socket.emit("login", data.userName)
    console.log("user connected")
    navigate("/")
  }

  return (
    <div className='flex justify-center'>

      <form onSubmit={handleSubmit} className='flex xl:w-[25%] sm:w-[60%] w-full mx-2 md:mt-[6rem] mt-[2rem] rounded-xl flex-col gap-2 bg-[#446E6B] justify-center items-center'>

        <div className='flex px-10 mt-[2rem] mb-2 items-center justify-between w-full'>
          {singIn ? <p className='text-white font-semibold text-xl'>Sing In</p> : <p className='text-white font-semibold text-xl '>Login</p>}
          <Link to="/">
            <img src='./Cross png icon.png' className='h-4 text-right' ></img>
          </Link>
        </div>

        {singIn ? <input className='outline-none pt-1 py-1 pr-20 pl-2 border-b-4 border-amber-300 rounded-lg bg-white' onChange={handleChange} type='email' name='email' value={data.email} placeholder='Email' required /> : <></>}

        <input className='outline-none pt-1 py-1 pr-20 pl-2 border-b-4 border-amber-300 rounded-lg bg-white' onChange={handleChange} type='text' name='userName' value={data.userName} placeholder='User Name' required />

        <input className='outline-none pt-1 py-1 pr-20 pl-2 border-b-4 border-amber-300 rounded-lg bg-white' onChange={handleChange} type='password' name='password' value={data.password} placeholder='Password' required />

        <label className='text-white mt-2'>
          <input type='checkbox' name='checkbox' required />
          I accept all Term & Conditions
        </label>

        {singIn ? <button type='submit' className='px-3 py-1 rounded-lg bg-[#fff] cursor-pointer border-2 border-white'>Sing In</button> :
          <button className='px-3 py-1 rounded-lg bg-[#fff] cursor-pointer border-2 border-white' type='submit'>Login</button>}

        <div className='pt-2 pb-10 text-white'>
          {singIn ? <div> If You have an account <span className='text-red-700 pl-1' onClick={() => setSingIn(false)}>Login</span></div> :
            <div>If you have not account <span className='text-red-700 pl-1' onClick={() => setSingIn(true)}>Creatr account</span></div>}
        </div>

      </form>

    </div>
  )
}

export default Singin