// import React,{ createContext , useContext ,useEffect , useState} from 'react'
// import SocketService from "../services/socketService";
// import useGetUser from '../hook/getUser';

// const socketContext = createContext<SocketService | null>(null)

// export const useSocket = () => {
//   return useContext(socketContext)
// }

// export const SocketProvider :React.FC<{children : React.ReactNode}> = ({ children }) => {
// const user = useGetUser()
// const [socketService,setSocketService] = useState<SocketService | null>(null)
  
//   useEffect(() => {
//     if(user.id){

//       const socketUrl = import.meta.env.BASE_URL
//       const server = new SocketService(socketUrl)
      
//       setSocketService(server)
      
//       return ()=> {
//         server.disconnect()
//       }    
//     }
//   }
//   ,[])

//   return <socketContext.Provider value={socketService}> {children} </socketContext.Provider>

// }