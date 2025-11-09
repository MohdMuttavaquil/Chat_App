import React, { useContext, useState } from 'react'
import { MdSend, MdArrowBack, MdVideocam } from "react-icons/md"
import { socket } from '../../socket'
import { AppContext } from '../../Context/AppContext'

const Chat = ({ userData, setShow }) => {

  const { setMessages, userName } = useContext(AppContext)
  const [message, setMessage] = useState("")

  const handleChenge = (e) => {
    setMessage(e.target.value)
  }

  const send = (toUserName, sendUser) => {

    socket.emit("send_message", { toUserName, message, sendUser })

    setMessages(prev => {

      const updated = [...prev];
      const existing = updated.find(item => item.from === toUserName);

      if (existing) {
        existing.messages.push(message);
      } else {
        updated.push({ from: toUserName, messages: [message] });
      }

      return updated;
    });

    setMessage('')
  }

  const back = () => {
    setShow(false)
  }

  return (
    <div>

      <div className="bg-[#446E6B] text-white md:h-[30rem] max-h-screen min-h-[60vh] flex-col rounded-xl relative">

        <div className='flex bg-gray-600 h-[3rem] items-center rounded-xl justify-between '>

          <div className='flex pl-2 sm:pl-4 gap-2 '>

            <div className='cursor-pointer mt-1' onClick={() => back()}><MdArrowBack size={25} color='white' /></div>
            <p className='text-xl w-full '>{userData.from} </p>
          </div>

          <div className='cursor-pointer pr-5 mt-1 sm:pr-12'><MdVideocam size={30} color='white' /></div>

        </div>

        <div className='h-[80%] w-full overflow-auto sm:pl-4 px-2 box'>
          {userData.messages && userData.messages.map((i, index) => <div key={index}>
            <p className='rounded-2xl pl-3 pr-4 inline-block py-1 my-1 bg-[#243736]'>{i}</p>
          </div>)}

        </div>

        <div className='flex mx-2 absolute bottom-0 mb-2 w-full'>
          <input type='text' onChange={handleChenge} value={message} className='w-[85%] h-[2rem] text-gray-700 text-lg bg-white outline-none rounded-2xl mx-1 px-2' />

          <button className='cursor-pointer' onClick={() => send(userData.from, userName)}><MdSend size={30} /></button>
        </div>

      </div>

    </div>
  )
}

export default Chat