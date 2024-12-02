import { useState, useEffect } from "react";
import { Inter } from 'next/font/google'
import PreviousChats from '../components/PreviousChats';
import Chat from "@/components/Chat";
import Sidebar from "@/components/Sidebar";
import MobileSidebar from "@/components/MobileSidebar";


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [chatId,setChatId] = useState(null);

  const callApi = async (url, data) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(""),
      });
      const result = await response.json();
      console.log(result,"result from callapi")
      // setOutput(JSON.stringify(result, null, 2));

      // Assuming the ID is in result.id
      if (result.id) {
        setChatId(result.id); // Save the ID
      }
    } catch (error) {
      // setOutput('Error fetching data: ' + error.message);
    }
  };

  useEffect(() => {

      // Set a new timeout for the API call
      const timeout = setTimeout(() => {
        const apiUrl = 'http://localhost:8000/api/v1/chats'; // Replace with your actual API endpoint
        const postData = { query: "" }; // Data to be sent in the POST request
        callApi(apiUrl, postData);
      }, 500); // 500ms debounce time
  });

  const [isComponentVisible, setIsComponentVisible] = useState(false);


  const toggleComponentVisibility = () => {
    setIsComponentVisible(!isComponentVisible);
  };



  return (

    <div className="overflow-hidden w-full h-screen relative flex">

      {isComponentVisible ? (
        <MobileSidebar toggleComponentVisibility={toggleComponentVisibility} />
      ) : null}
      <div className="dark hidden flex-shrink-0 bg-gray-900 md:flex md:w-[260px] md:flex-col">
        <div className="flex h-full min-h-0 flex-col ">
          <Sidebar />
        </div>
      </div>
      <Chat toggleComponentVisibility={toggleComponentVisibility} />

    </div>
  )
}
