import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Make sure to import Link from react-router-dom
import axios from 'axios';

function Hero() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  async function generateAnswer() {
    setAnswer("loading...");
    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyD1RHlOdgZA_6PDkFcWE06SK1NqR68f8to",
        method: "post",
        data: { "contents": [{ "parts": [{ "text": question }] }] }
      });
      setAnswer(response["data"]["candidates"][0]["content"]["parts"][0]["text"]);
    } catch (error) {
      setAnswer("Error occurred. Please try again.");
    }
  }

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen bg-cover bg-center">
      {/* Placeholder */}
      <div className="absolute inset-0 bg-gray-300 bg-cover bg-center z-0" style={{ backgroundImage: "url('/placeholder_image.jpg')" }} />

      {/* Main Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/bg_image.jpg')" }}
      />
      
      <div className="relative z-10 flex flex-col items-center">
        <h1 className='font-extrabold text-3xl sm:text-4xl md:text-[50px] text-center text-white mt-10 md:mt-14 mb-6 md:mb-12'>
          <span>Personalized Journeys with AI: Easy and Quick</span>
        </h1>
        <Link to={'/create-trip'}>
          <button className='black-button text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-2 md:py-3'>
            Get Started It's Free!!
          </button>
        </Link>

        {/* Chatbot Section */}
        {isOpen && (
          <div
            className={`fixed ${isMinimized ? 'bottom-4 right-4 w-16 h-16' : 'bottom-4 right-4 w-80 h-60'} bg-white rounded-lg shadow-lg transition-all duration-300 overflow-auto`}
            style={{ zIndex: 1000 }}
          >
            <div className="flex items-center justify-between p-2 border-b">
              <span className="font-bold text-lg">{isMinimized ? '' : 'Chatbot'}</span>
              <div className="flex space-x-2">
                {isMinimized ? (
                  <button onClick={() => { setIsMinimized(false); setIsOpen(true); }} className="p-1 text-gray-500 hover:text-gray-700">+</button>
                ) : (
                  <button onClick={handleClose} className="p-1 text-gray-500 hover:text-gray-700">❌</button>
                )}
              </div>
            </div>
            {!isMinimized && (
              <div className="p-4">
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  cols="30"
                  rows="4"
                  placeholder="Ask me anything..."
                  className="w-full p-2 border border-gray-300 rounded-md mb-4"
                ></textarea>
                <button
                  onClick={generateAnswer}
                  className="w-full px-4 py-2 bg-black text-white rounded-md mb-4 hover:bg-yellow-500 transition-colors duration-300"
                >
                  Generate Trip ➣
                </button>
                <div className="prose">
                  <p>{answer}</p>
                </div>
              </div>
            )}
            {isMinimized && (
              <button onClick={() => { setIsMinimized(false); setIsOpen(true); }} className="absolute bottom-2 right-2 p-2 bg-blue-500 text-white rounded-full">+</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Hero;
