import {useState, useEffect} from 'react'
import {io, Socket} from 'socket.io-client';
import {useParams, useLocation, useNavigate} from 'react-router-dom';
// const SOCKET_URL = 'http://192.168.1.154:3000';
// const SOCKET_URL = 'http://localhost:3000';
const SOCKET_URL = 'https://chat-backend-production-dfd09.up.railway.app';

const makeMessageId = () => `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

type Message ={
    id: string; 
    roomId: string; 
    userId: string; 
    text: string; 
    sentAt: string; 
    userName: string; 

}

function ChatUI() {

  const {roomId} = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const initialState = location.state || {};
  //my logic is that every room has a code, 
  // and every room has a set of messages, 

const [messages, setMessage] = useState<Message[]>([

  ])

  // So i need some information to properly setup this chat
  // 1) I need the room id, 
  // I need the userID
  // i need the content of the message, 
  // I need the time it was sent, 



  const [chatID] = useState<string>(roomId || '')
  const [UserID, setUserID] = useState<string>(initialState.userId || '')
  const [msg, setMsg] = useState("hello")
  const [socket, setSocket] = useState<Socket | null >(null)
  const [userName, setUserName] = useState<string>(initialState.username || '');

  




  useEffect(() => {



    const newSocket = io(SOCKET_URL)
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected!');
      newSocket.emit("join-room", chatID);
    })


    newSocket.on('message', (msg) => {
      console.log('Message recieved:', msg);

      const newMessage = {
        id: makeMessageId(),
        roomId: msg.chatID,
        userId: msg.UserID, 
        text: msg.msg, 
        sentAt: msg.timestamp, 
        userName: msg.userName
      }
      setMessage((messages) => [...messages, newMessage]);
  });

    return () => {
      newSocket.disconnect();
      newSocket.emit("leave-room", chatID)
    }
  }, []);

  

  // So i need some information to properly setup this chat
  // 1) I need the room id, 
  // I need the userID
  // i need the content of the message, 
  // I need the time it was sent, 


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

      if(socket){

        socket.emit('message', {UserID: UserID, msg: msg, chatID:chatID, userName})


  
      } else {
        

  
      }
  }
  
return (
    <> 
      <div className="min-h-screen flex items-center justify-center p-4 flex-col">

      <h1> "Chat ID: " {chatID}  </h1>
      <div className = "border rounded-xl bg-slate-200 border-slate-300">
      <div className = "rounded-xl bg-sky-100 w-[50vw] h-[80vh] justify-flex  p-4 your-scroll-container">
        <div> 
        {messages.map((message, index) => {
          let isMyMsg = message.userId === UserID; 
          let showName = index === 0 || messages[index - 1].userId !== message.userId
          return(
          <div key = {message.id} className = {`flex flex-col ${isMyMsg ? 'items-start' : 'items-end'} w-full max-w-none p-2`}>
            {           
              showName && (<span className = "text-xs font-bold text-gray-600 mb-1 ml-3">{ message.userName }</span>)
            }

            <div className = "bg-white rounded-2xl py-3 px-4 shadow-sm border border-gray-100 ">
            <p className = "text-gray-800 text-sm leading-relaxed">{ message.text }</p>
            <span className = "block text-right text-[10px] text-gray-400 mt-1">
              {new Date(message.sentAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
            </span>
            </div>
          </div> 
          )
          
        })
        }
        </div>

      </div>
        <form onSubmit = {handleSubmit} className = "w-[50vw] flex flex-row">
          <input type = "text" placeholder = "Message" 
          value = {msg}
          onChange = {(e) => setMsg(e.target.value)}
          className = "w-[50vw] text-slate-200 rounded-xl px-4 py-3.5 bg-slate-400"  ></input>
          <button type = "submit">Enter</button>
      </form>
      
      </div>
      </div>
    </>
  )
}

export default ChatUI
