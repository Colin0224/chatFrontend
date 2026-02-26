import './ChatCreation.css'; 
import { MessageSquare } from 'lucide-react';
import {useRef, useState, useEffect} from 'react'
import {motion} from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const TABS = ["Join Room", "Create Room"];


// const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
//   const [isCopied, setIsCopied] = useState<boolean>(false);

//   const handleCopyClick = async () => {
//     try {
//       await navigator.clipboard.writeText(textToCopy);
//       setIsCopied(true);

//       // Reset the "Copied" state after 2 seconds
//       setTimeout(() => {
//         setIsCopied(false);
//       }, 2000);
//     } catch (err) {
//       console.error('Failed to copy text: ', err);
//     }
//   };
function ChatCreation() { 
    const [username, setUsername] = useState("")
    const [code, setCode] = useState("")
    const [activeTab, setActiveTab] = useState(TABS[0]);
    const [genCode, setGenCode] = useState("");
    const [isCopied, setIsCopied] = useState(false);
    const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const navigate = useNavigate();
    const handleCopyClick = async () => {
        if (isCopied || !genCode) return;

        try { await navigator.clipboard.writeText(genCode); } 
        catch (error) {
            console.error('Failed to copy code:', error);
            return;
        }
        setIsCopied(true);

        if (copyTimeoutRef.current) {
            clearTimeout(copyTimeoutRef.current);
        }
        copyTimeoutRef.current = setTimeout(() => {
            setIsCopied(false);
        }, 1200);
    }


//   useEffect(() => {
//     console.log(`${chatID}`)
//     const newSocket = io(SOCKET_URL)
//     setSocket(newSocket);

//     newSocket.on('connect', () => {
//       console.log('Connected!');
//       newSocket.emit("join-room", chatID);
//     })


//     newSocket.on('message', (msg) => {
//       console.log('Message recieved:', msg);

//       const newMessage = {
//         id: makeMessageId(),
//         roomId: msg.chatID,
//         userId: msg.UserID, 
//         text: msg.msg, 
//         sentAt: msg.timestamp, 
//         userName: msg.userName
//       }
//       setMessage((messages) => [...messages, newMessage]);
//   });

//     return () => {
//       newSocket.disconnect();
//       newSocket.emit("leave-room", chatID)
//     }
//   }, []);


//   const handleSubmit = (e) => {
//     e.preventDefault();
//       if(socket){
        
//         socket.emit('message', {UserID: UserID, msg: msg, chatID:chatID, userName})

        useEffect(() => {
            
        }, []);



    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const randStr = Math.random().toString(36).substring(2,7);
        navigate(`/chat/${code}`, {
            state: {
                userId: `user_${randStr}`, 
                username: username
            }
        })

        
    }
    const handleGenCode = () => {
        const randStr = Math.random().toString(36).substring(2,7);
        navigate(`/chat/${genCode}`, {
            state: {
                userId: `user_${randStr}`, 
                username: username,
            }
        })
    }
    
    return(
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-sm h-[600px] bg-gray-200 rounded-3xl border shadow-2xl border-slate-700/50  overflow-hidden flex flex-col">    
                <div className="bg-sky-100 flex flex-col items-center justify-center h-40 relative  border-slate-300"> 
                    <div className = "flex justify-center mb-3"></div>
                    <div className="p-3 bg-white rounded-2xl shadow-sm text-sky-600 ring-1 mb-3 ring-sky-200">
                        <MessageSquare size={28} fill="currentColor" />
                    </div>
                    <h1 className="title">Simple Chat App</h1>
                    <h2 className = "text-slate-500 text-xs font-bold uppercase tracking-widest mt-1 mb-3">Connect With Friends</h2>
                </div> 

                <div className="bg-slate-700 flex-1 p-6">

                    <div className = "space-y-2 group">
                        <label className = " text-s font-bold text-slate-400 tracking-wider transition-colors group-focus-within:text-sky-400">
                            Display Name
                        </label>
                        <input
                        type = "text"
                        placeholder = "Enter your username..."
                        value = {username}
                        onChange = {(e) => setUsername(e.target.value)}
                        className = "w-full border border-slate-700 text-white bg-slate-900 rounded-xl px-4 py-3.5 focus:outline-none focus:border-sky-500 focus:ring-1 mt-2 focus:ring-sky-500 transition-all placeholder-slate-600 shadow-inner" /> 
                    </div>
                

                    {/* Container */}
                    <div className="flex justify-evenly space-x-2 rounded-xl bg-slate-900  p-2 shadow-sm border border-slate-600 mt-5">
                        {TABS.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`
                            relative rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none
                            ${activeTab === tab ? "text-slate-900" : "text-slate-500 hover:text-sky-500"}
                            `}
                        >
                            {/* The Magic Background - Only renders for the active tab */}
                            {activeTab === tab && (
                            <motion.div
                                layoutId="active-pill"
                                className="absolute inset-0 bg-slate-100"
                                style={{ borderRadius: 8 }} // Matches the button's rounded-lg
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                            )}
                            
                            {/* The Text - z-10 ensures it sits ON TOP of the background */}
                            <span className="relative z-10 font-bold tracking-wide ">{tab}</span>
                        </button>
                        ))}
                    </div> 

                    {activeTab === "Join Room" && (
                    <div> 
                <form onSubmit = {handleSubmit} >
                    <div className = "space-y-2 group mt-6">
                    <label className = "mt-4 text-s font-bold text-slate-400 tracking-wider transition-colors group-focus-within:text-sky-400"> 
                        Room Code
                    </label>
                

                
                    <input type = "text" placeholder = "Enter Code: "
                    value = {code}
                    onChange = {(e) => setCode(e.target.value)}
                    className = "w-full border border-slate-700 text-white bg-slate-900 rounded-xl px-4 py-3.5 focus:outline-none focus:border-sky-500 focus:ring-1 mt-2 focus:ring-sky-500 transition-all placeholder-slate-600 shadow-inner" />

                    </div>
                    
                    <button className = "w-full rounded-xl bg-sky-600 hover:bg-sky-500 p-3 mt-6 text-slate-300 font-bold disabled:opacity-50" disabled = {username == "" || code.length != 6}>Enter Room</button>
                </form>
                    </div>

                    )}
                    {activeTab === "Create Room" && genCode === "" && (
                        
                        <div>
                            <div className = "spacy-y-2 group mt-6">
                                <button className = "w-full bg-slate-900 rounded-xl p-11 text-slate-400">Generate a code to invite others</button>  
                            </div>
                            <button className = "w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 p-3 mt-4 text-slate-300 font-bold" onClick = {() => setGenCode(Math.random().toString(36).substring(2,8).toUpperCase()) }>Generate Code</button>
                            
                        </div> 
                    )}
                    {activeTab === "Create Room" && genCode !== "" && (
                        <div>
                            <button type="button" className = "w-full mt-6 bg-slate-900 rounded-xl p-11 text-slate-400 transition-transform duration-100 active:scale-[0.98] disabled:opacity-80" onClick = {handleCopyClick} disabled = {isCopied}>
                                <h1 className = "text-3xl text-sky-600">{genCode}</h1>
                                <h1 className = {`text-xs transition-colors duration-150 ${isCopied ? 'text-emerald-400' : 'text-slate-400' }`}>{isCopied ? "COPIED" : "CLICK TO COPY CODE"}</h1>
                                </button>  
                            
                            <button className = "w-full rounded-xl bg-sky-600 hover:bg-sky-500 p-3 mt-4 text-slate-300 font-bold disabled:opacity-50 " disabled = {username == ""} onClick = {handleGenCode}>Enter Room</button>
                        </div>
                    )}
                    

                </div>
            </div>

    </div>

            
    )
}

export default ChatCreation; 
