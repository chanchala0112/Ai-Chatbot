import { useRef, useState, useEffect } from 'react';
import ChatbotIcon from "./Components/ChatbotIcon";
import ChatMessage from "./Components/ChatMessage";
import ChatForm from "./Components/ChatForm";

const App = () => {
  const [chathistory, setChatHistory] = useState([]);
   const [showChatbot, setShowChatbot] = useState((false)); // boolean, not array
  const chatBodyRef = useRef();

  const generateBotReponse = async(history) => {
    //Helper Function update history
    const updateHistory = (text, isError = false) => { 
      setChatHistory((prev) => [...prev.filter((msg) => msg.text !== "Thinking..."), { role: "model",
      text, isError}]);
    };

    //format chat history for API request
      history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));

    const requestoptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({contents: history})
    }

    try{
          //Make the API call to get the bot's response
      console.log("API URL:", import.meta.env.VITE_API_URL);
      const response = await fetch(import.meta.env.VITE_API_URL, requestoptions);
      const data = await response.json();
      if(!response.ok) throw new Error(data.error.message || "Something went wrong");
      
      //Clean and update chat history with the bot's response
       const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
       updateHistory(apiResponseText);
    }catch(error){
      updateHistory(error.message, true);
      
    }

  };

  useEffect(() => {
    //Auto-scroll whenever chat history updates
    chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth"});
  }, [chathistory]);

  return (
    <div  className={`container ${showChatbot ? "show-chatbot" : ""}`}>
      <button onClick={() => setShowChatbot(prev => !prev)} id="chatbot-toggler">
        <span className="material-symbols-rounded">
          mode_comment
        </span>
        <span className="material-symbols-rounded">
          close
        </span>
      </button>

      <div className="chatbot-poppup">
        {/*Chatbot Header*/}
        <div className="chat-header">
          <div className="header-info">
           <ChatbotIcon />
            <h2 className="logotext">Chatbot</h2>
            </div>
            <button onClick={() => setShowChatbot(prev => !prev)} className="material-symbols-rounded">
                keyboard_arrow_down             
            </button>
          
        </div>

          {/*Chatbot Body*/}
          <div ref={chatBodyRef} className="chatbot-body">
            <div className="message bot-message">
              <ChatbotIcon />
              <p className="message-text">
                Hey there! <br/> How can I assist you today?
              </p>
            </div>
            {/* Render chat history dianamically*/}
            {chathistory.map((chat, index) => (
              <ChatMessage key={index} chat={chat} />
            ))}
            
        </div>

        {/*Chatbot Footer*/}
        <div className="chat-footer">
          <ChatForm chathistory={chathistory} setChatHistory={setChatHistory} generateBotReponse={generateBotReponse}/>
        </div>
      
    </div>
  </div>
  );
}

export default App