import React, { useContext, useState } from 'react'
import { MdSend, MdArrowBack, MdVideocam } from "react-icons/md"
import { socket } from '../../socket'
import { AppContext } from '../../Context/AppContext'

const Chat = ({ userData, setShow }) => {

  const { setMessages, userName } = useContext(AppContext)
  const [message, setMessage] = useState("")
  const [ call, setCall ] = useState(false)
  const [ roomId, setRoomId ] = useState({
    createRoomId: "",
    joinRoomId: ""
  })

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

  // For video call 

  const handleRoomId = (e)=>{
    const { name, value } = e.target
    setRoomId((prev)=> ({...prev, [name]: value}))
    console.log(roomId)
  }

  const videoCall = ()=>{
    setCall(!call)
  }

  const handleSubmit = (e)=>{
   e.preventDefault()
   const id = roomId.createRoomId
   if (id !== "") {
   setMessage(`Join this room for video call roomId =  ${id}`)
   }
   
   videoCall(false)
   setRoomId({createRoomId: "", joinRoomId:""})
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

          <div onClick={()=> videoCall()} className='cursor-pointer pr-5 mt-1 sm:pr-12'><MdVideocam size={30} color='white' /></div>

        </div>

       {/* Room for video call */}
       {call && <form onSubmit={handleSubmit} className='ml-2'>

        <label >
          <p>Create a Room</p>
          <input type='number' onChange={handleRoomId} value={roomId.createRoomId} name='createRoomId' placeholder='Enter a room number' className='bg-white text-gray-700 outline-none rounded-lg py-1'/>
        </label>

         <label>
          <p>join Room</p>
          <input type='number' onChange={handleRoomId} value={roomId.joinRoomId} name='joinRoomId' placeholder='Enter room number' className='bg-white text-gray-700 outline-none rounded-lg py-1 ' />
        </label>
 
       <br></br>
        <input type='submit' className='px-3 py-1 my-2 cursor-pointer hover:px-4 hover:py-1.5 bg-gray-600 text-white rounded-lg' value={"Enter"}/>
       
       </form> }


        <div className='h-[80%] w-full overflow-auto sm:pl-4 px-2'>
          {userData.messages && userData.messages.map((i, index) => <div key={index}>
            <p className='rounded-2xl pl-3 pr-4 inline-block py-1 my-1 bg-[#243736]'>{i}</p>
          </div>)}

        </div>

        <div className='flex mx-2 absolute bottom-0 mb-2 w-full'>
          <textarea type='text' onChange={handleChenge} value={message} className='w-[85%] h-[2rem] text-gray-700 text-lg bg-white outline-none rounded-2xl mx-1 px-2  resize-none overflow-y-auto whitespace-normal break-words' />

          <button className='cursor-pointer' onClick={() => send(userData.from, userName)}><MdSend size={30} /></button>
        </div>

      </div>

    </div>
  )
}

export default Chat