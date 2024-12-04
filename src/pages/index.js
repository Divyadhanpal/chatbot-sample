import { useState, useEffect } from "react";
import { Inter } from 'next/font/google'
import PreviousChats from '../components/PreviousChats';
import Chat from "@/components/Chat";
import Sidebar from "@/components/Sidebar";
import MobileSidebar from "@/components/MobileSidebar";
import axios from "axios";
import {chatAdded} from "../lib/chatSlice";
import { useAppSelector, useAppDispatch, useAppStore } from '../lib/hooks';

export default function Home() {

  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const [isChatWindowVisible, setIsChatWindowVisible] = useState(false);
  const [chatId, setchatId] = useState(null);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [output, setOutput] = useState('');
  const [prevChats, setPrevChats] = useState([]);
  const [navChatId,setNavChatId] = useState(null);

   // Initialize the store with the product information
   const store = useAppStore()
   const initialized = useRef(false)
   if (!initialized.current) {
    // store.dispatch(initializeProduct(product))
     initialized.current = true
   }
   // const name = useAppSelector(state => state.product.name)
   const dispatch = useAppDispatch()


  useEffect(() => {
    if (prevChats.length == 0) {
      const apiUrl = 'http://localhost:8000/api/v1/chats';
      callApi(apiUrl);
    }
  }, []);

  const callApi = async (url) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const result = await response.json();
      console.log(result.map(item => item.id), "result from callapi get")
      // Assuming the ID is in result.id
      if (result) {
        setPrevChats(result.map(item => item.id)); // Save the ID
      }
    } catch (error) {
      setOutput('Error fetching data: ' + error.message);
    }
  };


  const getChatIDFromApi = () => {
    alert("inside api")
    const url = `http://localhost:8000/api/v1/chats`;

    axios.post(url).then((response) => {
      // const result =  response.json();
      console.log(response.data.id, "result from callapi index")
      // setOutput(JSON.stringify(result, null, 2));

      // Assuming the ID is in result.id
      if (response.data.id) {
        dispatch(chatAdded(response.data.id))
        setchatId(response.data.id); // Save the ID
      }
    }).catch((error) => {
      setOutput('Error fetching data: ' + error.message);
      console.log(error, "from index error ");
    })
  }


  const toggleComponentVisibility = () => {
    setIsComponentVisible(!isComponentVisible);
  };

  const toggleChatWindow = () => {
      setIsChatWindowVisible(true);
      getChatIDFromApi();  
  };

  const getIdFromNav =(id) => {
    setchatId(id)
    setIsChatWindowVisible(true);
  }



  return (

    <div className="overflow-hidden w-full h-screen relative flex">
      {isComponentVisible ? (
        <MobileSidebar toggleComponentVisibility={toggleComponentVisibility} />
      ) : null}
      <div className="dark hidden flex-shrink-0 bg-gray-900 md:flex md:w-[260px] md:flex-col">
        <div className="flex h-full min-h-0 flex-col ">
          <Sidebar isChatWindowVisible={isChatWindowVisible} onToggle={toggleChatWindow} prevChats={prevChats} getIdFromNav={getIdFromNav}/>
        </div>
      </div>

      {isChatWindowVisible ? <Chat chatId={chatId} toggleComponentVisibility={toggleComponentVisibility} /> : <div style={{ color: '#fff' }}>
        You can start your chat by clicking NEW CHAT Button
      </div>}

    </div>
  )
}
