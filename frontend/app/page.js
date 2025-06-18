"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import io from "socket.io-client";

const Chat = dynamic(() => import("../components/Chat"), { ssr: false });
const MusicPlayer = dynamic(() => import("../components/MusicPlayer"), { ssr: false });

export default function Home() {
  const [username, setUsername] = useState("");
  const [entered, setEntered] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername && storedUsername.trim()) {
          setUsername(storedUsername);
          setEntered(true);
        }
      }
    } catch (err) {
      console.error("Error accessing localStorage:", err);
    }
  }, []);

  useEffect(() => {
    if (!entered || socket) return;

    try {
      const newSocket = io("https://vibechat-q5d3.onrender.com", {
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 3000,
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    } catch (err) {
      console.error("Socket connection error:", err);
    }
  }, [entered]);

  const handleEnter = () => {
    if (!username.trim()) {
      alert("Please enter a valid username!");
      return;
    }

    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("username", username.trim());
      }
      setEntered(true);
    } catch (err) {
      console.error("Error saving username:", err);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-400 text-white font-['Verdana']">
      {!entered ? (
        <div className="text-center space-y-4 bg-white p-6 rounded-lg text-black">
          <h2 className="text-2xl font-bold">🎉 Enter the Party</h2>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 rounded-md border border-gray-300 w-64 text-black"
          />
          <br />
          <button
            onClick={handleEnter}
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Enter the Party
          </button>
        </div>
      ) : (
        <div className="flex w-full h-full">
          <div className="w-1/2 p-4">
            {socket ? (
              <Chat socket={socket} username={username} />
            ) : (
              <p>Connecting to chat...</p>
            )}
          </div>
          <div className="w-1/2 p-4">
            {socket ? (
              <MusicPlayer socket={socket} />
            ) : (
              <p>Loading music player...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
