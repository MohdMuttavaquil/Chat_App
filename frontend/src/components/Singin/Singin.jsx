import React, { useState, useContext } from 'react'
import { AppContext } from '../../Context/AppContext'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { socket } from '../../socket'

const Singin = () => {

  const { singIn, setSingIn, url, setToken, setUserName, setUserContect } = useContext(AppContext)
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

  // fatch data from database
  const getData = (res)=>{
       if (res.data.success) {
        localStorage.setItem("token", res.data.token)
        setToken(true)
        setUserName(res.data.userData)
        setUserContect(res.data.userContect)
      } else {
        alert(res.data.massege)
      }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (singIn) {
      const res = await axios.post(`${url}/api/user/singin`, data)
     getData(res)
    } else {
      const res = await axios.post(`${url}/api/user/login`, data)
      getData(res)
    }

    socket.connect()
    socket.emit("login", data.userName)
    console.log("user connected")

    setData({
      email: "",
      userName: "",
      password: ""
    })

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