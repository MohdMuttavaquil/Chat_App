import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../Context/AppContext'
import Chat from './Chat'
import { socket } from '../../socket'

const Home = () => {

  const { token, userContect, setMessages, userName, messages } = useContext(AppContext)
  const [userData, setUserDate] = useState({})
  const [show, setShow] = useState(false)

  const chat = (data) => {
    setShow(true)
    setUserDate(data)
  }

  const newChat = (a) => {
    console.log(a)
    const data = { from: a, messages: "" }
    chat(data)
  }

  useEffect(() => {

    if (!userName) {
      return
    }

    // connect to socket and receive message
    socket.connect()
    socket.on("receive_message", ({ from, message }) => {

      setMessages(prev => {
        const updated = [...prev];
        const existing = updated.find(item => item.from === from);

        if (existing) {
          existing.messages.push(message);
        } else {
          updated.push({ from, messages: [message] });
        }

        return updated;
      });
    })

    // disconnect socket
    return () => {
      socket.off("receive_message")
      socket.off("disconnect")
    }
  }, [userName])


  return (
    <div className='md:w-[80%] mx-auto my-[4rem] text-white'>

      {/* for axisting user */}
      {token ? <div >

        <div className='flex md:flex-row justify-evenly flex-col'>

          <div id='message' className={`${show ? "hidden md:flex flex-col md:h-[30rem] max-h-screen min-h-[60vh] md:w-[40%] w-[96%] mx-auto" : "flex flex-col md:h-[30rem] max-h-screen min-h-[60vh] md:w-[40%] w-[96%] mx-auto"}`}>

            {/* For New messages */}
            <div className='h-[3rem] text-2xl bg-[#446E6B] text-white flex mb-1 items-center font-semibold rounded'>
              <p className='pl-4'>New Messages</p>
            </div>

            <ul className='overflow-y-scroll'>
              {messages && messages.map((i, index) => <li key={index} onClick={() => chat(i)} className='h-[3rem] text-xl mx-1 bg-[#F0F0F0] px-2 cursor-pointer text-gray-700 border-b-4 border-gray-600 items-center flex gap-4 rounded sm:pl-4 '>
                <p className='w-full'>{i.from}</p>
              </li>)}
            </ul>

            {/*For contect */}
            <div className='mt-4 h-[3rem] text-2xl bg-[#446E6B] text-white flex mb-1 items-center font-semibold rounded'><p className='pl-4'>Contects</p></div>
            <ul className='overflow-y-scroll'>

              {userContect && userContect.map((i, index) => <li key={index} onClick={() => newChat(i)} className='h-[3rem] text-xl mx-1 bg-[#F0F0F0] px-2 cursor-pointer text-gray-700 border-b-4 border-gray-600 items-center flex gap-4 rounded sm:pl-4'>
                <img src='./profile.png' className='h-6' />
                <p>{i}</p>
              </li>)}

            </ul>
          </div>

          <div className='md:w-[40%] w-[96%] mx-auto'>
            {show && <Chat userData={userData} setShow={setShow} />}
          </div>

        </div>

      </div> :

        <div>
          {/* For new user */}

          <div className='text-4xl sm:text-7xl font-semibold text-center'>Stay Close Stay Connected <br></br>Anytime Anywhere</div>
          <div className='text-xl md:w-[70%] mx-auto mt-5 sm:flex hidden '>secure messaging app that connects people worldwide with privacy, trust, and safety ensuring your data stays protected always</div>
          <div className='text-xl mx-auto mt-2 text-center'>Create your account and begin your conversation today</div>
        </div>}

    </div>
  )
}

export default Home