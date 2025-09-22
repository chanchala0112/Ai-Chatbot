import ChatbotIcon from "./Components/ChatbotIcon"
import ChatForm from "./Components/ChatForm"
import ChatMessage from "./Components/chatMessage.jsx"


const App = () => {
  const [chathistory, setChatHistory] = useState([]);

  return (
    <div className="container">
      <div className="chatbot-poppup">

        {/*Chatbot Header*/}
        <div className="chat-header">
          <div className="header-info">
           <ChatbotIcon />
            <h2 className="logotext">Chatbot</h2>
            </div>
            <button>
              <span class="material-symbols-rounded">
                keyboard_arrow_down
              </span>
            </button>
          
        </div>

          {/*Chatbot Body*/}
          <div className="chatbot-body">
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
          <ChatForm setChatHistory={setChatHistory}/>
        </div>
      
    </div>
  </div>
  );
}

export default App