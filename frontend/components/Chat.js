import { useEffect, useState, useRef } from "react";

export default function Chat({ socket, username }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const typingTimeout = useRef(null);

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    const handleUserTyping = (isTyping) => {
      setTyping(isTyping);
      if (isTyping) {
        setTimeout(() => setTyping(false), 2000);
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);
    socket.on("userTyping", handleUserTyping);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
      socket.off("userTyping", handleUserTyping);
    };
  }, [socket]);

  const handleTyping = () => {
    socket.emit("userTyping", true);

    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      socket.emit("userTyping", false);
    }, 2000);
  };

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage = { username, text: message };
    socket.emit("sendMessage", newMessage);
    setMessage("");
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl font-bold">Chat</h2>
      <div className="flex-1 overflow-y-auto bg-white text-black p-4 rounded-md">
        {messages.map((msg, index) => (
          <p key={index} className="p-2">
            <span className="text-blue-600">👤 {msg.username}:</span> {msg.text}
          </p>
        ))}
        {typing && <p className="text-sm italic">Typing...</p>}
      </div>
      <div className="mt-2 flex">
        <input
          type="text"
          className="p-2 text-black flex-grow rounded-md"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 px-4 py-2 rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
}