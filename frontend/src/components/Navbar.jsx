import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'
import axios from 'axios'
import { socket } from '../socket'

const Navbar = () => {

  const { setSingIn, setToken, token, userName, url, setUserContect, setMessages } = useContext(AppContext)
  const [search, setsearch] = useState("")
  const [foundUser, setfoundUser] = useState("")
  const userToken = localStorage.getItem("token")

  const logout = () => {
    socket.disconnect()
    setMessages("")
    localStorage.removeItem("token")
    setToken(false)
  }

  const handleChange = (e) => {
    setsearch(e.target.value)
  }

  const findUser = async () => {
    const res = await axios.post(`${url}/api/contect/search`, { search })
    console.log(res.data)
    if (res.data.success) {
       setfoundUser(res.data.foundUser)   
    } else{
      alert(res.data.massege)
    }
   
    setsearch("")
  }

  const addUser = async () =>{
    const res = await axios.post(`${url}/api/contect/add`,  {foundUser}, {headers:{userToken }})
     if (!res.data.success) {
      alert(res.data.massege)
    } else{
       setUserContect(res.data.userContect)
    }
   
   
    setfoundUser("")
  }

  return (
    <nav className='sticky md:w-[75%] mx-auto'>

      <div className='flex h-[5rem] px-2 justify-between items-center z-50'>

       {/* logo */}
        <div className='text-white font-semibold text-[2rem]'>LOGO</div>

        <div className='flex items-center gap-5'>
         
          {token ? <div className='flex gap-[1.5rem]'>
            {/*for logon user*/}

            <div className='flex gap-1'>


             {foundUser ==="" ?(
              <div className='sm:flex hidden gap-2'>
                {/* for user search */}
            
                <input onChange={handleChange} value={search} className='outline-none pt-1 py-1 pr-20 pl-2 border-b-4 border-amber-300 rounded-lg bg-white md:w-[20rem] ' type='text' placeholder='Enter Username' required />

                <button onClick={() => findUser()} className='px-3 py-1 rounded-lg bg-[#446E6B] hover:bg-white hover:text-gray-700 duration-500 text-white border-2 cursor-pointer border-white'>
                  Search
                </button>
              </div>) :

             ( <div className='sm:flex hidden gap-1'>

                {/* Add to contect */}

                <p className='text-xl'>{foundUser}</p>
                <button className='px-3 py-1 rounded-lg bg-[#446E6B] hover:bg-white hover:text-gray-700 duration-500 text-white border-2 cursor-pointer border-white' onClick={() => addUser()}>Add</button>

              </div> )}
            </div>

             {/* user profile and logout button */}

            <div id='Profile' className='flex gap-2'>
              <img src='./profile.png' className='h-[2rem]' />
              <p className='mt-1 text-xl font-semibold text-gray-800'>{userName}</p>
            </div>

            <button className='flex px-3 py-1 rounded-lg bg-[#446E6B] hover:bg-white hover:text-gray-700 duration-500 text-white border-2 border-white' onClick={() => logout()}>
              Log out
            </button>

          </div> :

            <div className='flex gap-[1.5rem]'>

              {/* for new user */}

              <button className='px-3 py-1 rounded-lg bg-[#446E6B] hover:bg-white hover:text-gray-700 duration-500 text-white border-2 border-white' onClick={() => setSingIn(true)}>
                <Link to="/singin">Sing In</Link>
              </button>
              <button className='px-3 py-1 rounded-lg bg-[#446E6B] hover:bg-white hover:text-gray-700 duration-500 text-white border-2 border-white' onClick={() => setSingIn(false)}>
                <Link to="/login">Login</Link>
              </button>

            </div>}

        </div>

      </div>

        {/* on moblie */}


        {token ? <div>

          {foundUser ==="" ?(
            
              <div className='flex sm:hidden gap-2 px-2'>
                {/* for user search */}
            
                <input onChange={handleChange} value={search} className='outline-none pt-1 py-1 pr-20 pl-2 border-b-4 border-amber-300 rounded-lg bg-white md:w-[20rem] ' type='text' placeholder='Enter Username' required />

                <button onClick={() => findUser()} className='px-3 py-1 rounded-lg bg-[#446E6B] hover:bg-white hover:text-gray-700 duration-500 text-white border-2 cursor-pointer border-white'>
                  Search
                </button>
              </div>) :

             ( <div className='flex md:hidden gap-1 justify-center'>

                {/* Add to contect */}

                <p className='text-xl'>{foundUser}</p>
                <button className='px-3 py-1 rounded-lg bg-[#446E6B] hover:bg-white hover:text-gray-700 duration-500 text-white border-2 cursor-pointer border-white' onClick={() => addUser()}>Add</button>

              </div> )}

              </div>
              :<></>}

    </nav>
  )
}

export default Navbar