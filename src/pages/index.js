import { useState, useEffect } from "react";
import { Inter } from 'next/font/google'
import PreviousChats from '../components/PreviousChats';
import Chat from "@/components/Chat";
import Sidebar from "@/components/Sidebar";
import MobileSidebar from "@/components/MobileSidebar";


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
 
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
