
"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from 'next/image';
import { Scrollbars } from "react-custom-scrollbars-2";
import { Button } from "@/components/ui/button";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import Footer from "@/components/footer";
import { Header } from "@/components/header";



export default function ChatBot() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [selectedModel, setSelectedModel] = useState("Model-1");
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const scrollbarsRef = useRef(null);

  useEffect(() => {
    // Retrieving the sidebar state from localStorage
    const storedSidebarState = localStorage.getItem("isSidebarVisible");
    if (storedSidebarState !== null) {
      setIsSidebarVisible(JSON.parse(storedSidebarState));
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarVisible((prevState) => {
      const newState = !prevState;
      localStorage.setItem("isSidebarVisible", JSON.stringify(newState));
      return newState;
    });
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = { author: "user", text: inputMessage };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputMessage("");

    // Adding a mock bot response for demonstration purposes
    const botResponse = {
      author: "bot",
      text: "This is a mock response from the bot since there is no backend.",
    };
    setMessages((prevMessages) => [...prevMessages, botResponse]);
  };

  return (
    <>
      <Header />
      <div className="flex h-screen bg-gray-900 text-white">
        {isSidebarVisible && (
          <aside className="w-60 flex flex-col bg-[#1e293b] border-r border-gray-300 h-screen">
            <div className="flex items-center justify-between p-4 border-b border-gray-300">
              <Button className="bg-gray-200 text-sm py-2 px-4 rounded mr-1">
                New chat
              </Button>
            </div>
          </aside>
        )}
        <TextIcon
          className="text-black min-w-6 min-h-6 max-w-8 max-h-8 ml-4 mt-4 cursor-pointer hover:text-gray-400"
          onClick={toggleSidebar}
          title="Toggle sidebar"
        />

        <main className="flex-1 flex flex-col bg-[#0f172a]">
          <header className="flex items-center justify-between p-4 border-b border-gray-300">
            <Select
              onValueChange={(value) => setSelectedModel(value)}
              value={selectedModel}
            >
              <SelectTrigger id="modelSelect">
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mode-l">Mode-l</SelectItem>
                <SelectItem value="Model-2">Model-2</SelectItem>
              </SelectContent>
            </Select>
          </header>
          <div className="flex-1 p-6 flex flex-col space-y-6">
            {messages.length === 0 && (
              <div className="flex flex-col justify-center items-center space-y-6">
                <Image
                  src="/visioneye.gif"
                  alt="Welcome"
                  width={150}
                  height={120}
                  className="text-black"
                />
                <h1 className="text-3xl font-semibold">
                  How can I help you today?
                </h1>
              </div>
            )}

            <div className="chat-messages-container flex-1 h-0 overflow-hidden">
              <Scrollbars
                autoHide
                autoHideTimeout={1000}
                autoHideDuration={200}
                ref={scrollbarsRef}
                style={{ width: "100%", height: "100%" }}
                renderView={(props) => (
                  <div {...props} className="custom-scrollbars-container" />
                )}
              >
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-2 ${
                      msg.author === "user"
                        ? "justify-start mb-2"
                        : "justify-end mb-2"
                    } w-full`}
                  >
                    {msg.author === "user" ? (
                      <Avatar>
                        <AvatarImage src="https://i.pinimg.com/736x/61/f7/5e/61f75ea9a680def2ed1c6929fe75aeee.jpg" />
                        <AvatarFallback>User</AvatarFallback>
                      </Avatar>
                    ) : null}
                    <div
                      className={`max-w-[70%] p-2 rounded-md ${
                        msg.author === "user"
                          ? "bg-gray-200 text-black"
                          : "bg-purple-900 text-white"
                      }`}
                    >
                      <p>{msg.text}</p>
                    </div>
                    {msg.author === "bot" ? (
                      <Avatar>
                        <AvatarImage src="https://p7.hiclipart.com/preview/401/376/896/computer-icons-eye-symbol-eye.jpg" />
                        <AvatarFallback>ChatBot</AvatarFallback>
                      </Avatar>
                    ) : null}
                  </div>
                ))}
              </Scrollbars>
            </div>

            <div className="w-full flex items-center p-4 bg-gray-800 rounded-md">
              <Input
                className="flex-1 bg-transparent border-none placeholder-gray-500"
                placeholder="Message ChatBot..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button className="ml-4" onClick={handleSendMessage}>
                Send
              </Button>
            </div>
            <p className="text-xs text-gray-500 text-center">
              ChatBot can make mistakes. Consider checking important
              information.
            </p>
          </div>
        </main>
      </div>
      <Footer />
      <TextIcon
        className="text-black h-6 w-6 ml-4 mt-4 cursor-pointer hover:text-gray-400"
        onClick={toggleSidebar}
        title="Toggle sidebar"
      />
    </>
  );
}

function TextIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 6.1H3" />
      <path d="M21 12.1H3" />
      <path d="M15.1 18H3" />
    </svg>
  );
}
const TrashIcon = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="currentColor" // Allows the fill color to be changed via props
    >
      <g data-name="Layer 5">
        <path d="M13.39 13a1 1 0 0 0-.91 1.08l.52 6A1 1 0 0 0 14 21h.09A1 1 0 0 0 15 19.91l-.53-6A1 1 0 0 0 13.39 13zM17.53 13.94l-.53 6A1 1 0 0 0 17.91 21H18a1 1 0 0 0 1-.91l.52-6a1 1 0 0 0-2-.17z"></path>
        <path d="M27,6H20V5a3,3,0,0,0-3-3H15a3,3,0,0,0-3,3V6H5A1,1,0,0,0,5,8H6.09L7.64,23.5a5,5,0,0,0,5,4.5h6.76a5,5,0,0,0,5-4.5L25.91,8H27a1,1,0,0,0,0-2ZM14,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H14Zm8.37,18.3a3,3,0,0,1-3,2.7H12.62a3,3,0,0,1-3-2.7L8.1,8H23.9Z"></path>
      </g>
    </svg>
  );
};
