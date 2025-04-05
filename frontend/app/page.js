"use client";

import { useState, useEffect } from "react";
import Chat from "../components/Chat";
import MusicPlayer from "../components/MusicPlayer";
import io from "socket.io-client";

export default function Home() {
  const [username, setUsername] = useState("");
  const [entered, setEntered] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
      setEntered(true);
    }
  }, []);

  useEffect(() => {
    const newSocket = io("http://localhost:5000", {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 3000,
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleEnter = () => {
    if (username.trim()) {
      localStorage.setItem("username", username);
      setEntered(true);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-400 text-white font-['Verdana']">
      {!entered ? (
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Set Username</h2>
          <input
            type="text"
            className="p-2 text-black rounded-md"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            onClick={handleEnter}
            className="bg-green-500 px-4 py-2 rounded-md"
          >
            Enter the Party
          </button>
        </div>
      ) : (
        <div className="flex w-full h-full">
          <div className="w-1/2 p-4">
            {socket && <Chat socket={socket} username={username} />}
          </div>
          <div className="w-1/2 p-4">
            {socket && <MusicPlayer socket={socket} />}
          </div>
        </div>
      )}
    </div>
  );
}
