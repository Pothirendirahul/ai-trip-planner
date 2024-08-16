import React, { useState } from "react";
import { getChatbotResponse } from "@/service/openaiService";
import { AiOutlineSend } from "react-icons/ai";

function ChatBot() {
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const handleChatSubmit = async () => {
    if (!chatInput.trim()) return;

    const newMessage = { role: "user", content: chatInput };
    setChatMessages([...chatMessages, newMessage]);

    try {
      const botResponse = await getChatbotResponse(chatInput);
      setChatMessages([...chatMessages, newMessage, { role: "assistant", content: botResponse }]);
    } catch (error) {
      setChatMessages([...chatMessages, newMessage, { role: "assistant", content: "Something went wrong. Please try again later." }]);
    }

    setChatInput("");
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg border p-4 rounded-md w-80">
      <div className="h-64 overflow-y-scroll mb-2">
        {chatMessages.map((message, index) => (
          <div key={index} className={`my-2 ${message.role === "user" ? "text-right" : "text-left"}`}>
            <p className={`${message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200"} inline-block p-2 rounded-lg`}>
              {message.content}
            </p>
          </div>
        ))}
      </div>
      <div className="flex items-center border-t pt-2">
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Ask me anything..."
          className="flex-grow p-2 border border-gray-300 rounded-l-md"
        />
        <button onClick={handleChatSubmit} className="p-2 bg-blue-500 text-white rounded-r-md">
          <AiOutlineSend />
        </button>
      </div>
    </div>
  );
}

export default ChatBot;
