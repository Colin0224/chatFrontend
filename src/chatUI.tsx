import {useState, useEffect, useRef} from 'react'
import {io, Socket} from 'socket.io-client';
import {useParams, useLocation} from 'react-router-dom';
// const SOCKET_URL = 'http://192.168.1.154:3000';
// const SOCKET_URL = 'http://localhost:3000';
const SOCKET_URL = 'https://chatapi.luckyhappyfish.com';

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
  const [UserID] = useState<string>(initialState.userId || '')
  const [msg, setMsg] = useState("")
  const [socket, setSocket] = useState<Socket | null >(null)
  const [userName] = useState<string>(initialState.username || '');
  const messageFeedRef = useRef<HTMLDivElement | null>(null);
  const shouldStickToBottomRef = useRef(true);

  




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

  useEffect(() => {
    if (shouldStickToBottomRef.current) {
      messageFeedRef.current?.scrollTo({ top: messageFeedRef.current.scrollHeight });
    }
  }, [messages]);

  

  // So i need some information to properly setup this chat
  // 1) I need the room id, 
  // I need the userID
  // i need the content of the message, 
  // I need the time it was sent, 


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

      if(socket){
        if(msg != ""){
        socket.emit('message', {UserID: UserID, msg: msg, chatID:chatID, userName})
        setMsg("")
        }
  
      } else {
        

  
      }
  }

  const handleFeedScroll = () => {
    const feed = messageFeedRef.current;

    if (!feed) return;

    shouldStickToBottomRef.current = feed.scrollHeight - feed.scrollTop - feed.clientHeight < 24;
  }
  
return (
    <> 
      <div className="min-h-screen flex items-center justify-center p-4 flex-col">

      <div className="w-[50vw] rounded-xl shadow-xl overflow-hidden border border-slate-200">
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200">
        <h1 className="text-sm font-semibold text-slate-700">Chat Room</h1>
        <span className="bg-slate-100 text-slate-500 text-xs font-mono font-medium px-3 py-1.5 rounded-lg select-all">{chatID}</span>
      </div>
      <div ref={messageFeedRef} onScroll={handleFeedScroll} className="rounded-xl bg-sky-100 w-[50vw] h-[80vh] p-4 your-scroll-container">
        <div className = "flex min-h-full flex-col justify-end"> 
        {messages.map((message, index) => {
          let isMyMsg = message.userId === UserID; 
          let showName = index === 0 || messages[index - 1].userId !== message.userId
          return(
          <div key = {message.id} className = {`flex flex-col ${isMyMsg ? 'items-end' : 'items-start'} w-full max-w-none p-2`}>
            {           
              showName && !isMyMsg && (<span className = "text-xs font-bold text-gray-500 mb-1 ml-3">{ message.userName }</span>)
            }

            <div className = {`rounded-2xl py-3 px-4 shadow-sm ${isMyMsg ? 'bg-sky-600 text-white' : 'bg-white border border-gray-100'}`}>
            <p className = {`text-sm leading-relaxed ${isMyMsg ? 'text-white' : 'text-gray-800'}`}>{ message.text }</p>
            <span className = {`block text-right text-[10px] mt-1 ${isMyMsg ? 'text-sky-200' : 'text-gray-400'}`}>
              {new Date(message.sentAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
            </span>
            </div>
          </div> 
          )
          
        })
        }
        </div>

      </div>
        <form onSubmit = {handleSubmit} className = "w-full flex items-center gap-2 px-3 py-3 bg-white border-t border-slate-200">
          <input type = "text" placeholder = "Message" 
          value = {msg}
          onChange = {(e) => setMsg(e.target.value)}
          className = "flex-1 text-slate-700 rounded-2xl px-4 py-3 bg-slate-100 border border-slate-200 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-colors placeholder-slate-400"  ></input>
          <button className = "p-3 rounded-full bg-sky-600 text-white shadow-md transition-all hover:bg-sky-500 active:scale-95" type = "submit">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-0.5 mt-[-1px]">
            <path d="m22 2-7 20-4-9-9-4Z" />
            <path d="M22 2 11 13" />
          </svg>
          </button>
          
      </form>
      
      </div>
      </div>
    </>
  )
}

export default ChatUI
