import ChatbotIcon from "./Components/ChatbotIcon"

const App = () => {
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

            <div className="message user-message">
              <p className="message-text">
                Hello! I have a question about your services.
              </p>
            </div>
        </div>

        {/*Chatbot Body*/}
        <div className="chat-footer">
          <form action="" className="chat-form">
            <input type="text" placeholder="Message...." className="message-input" required/>
            <button>
              <span class="material-symbols-rounded">
                arrow_upward
              </span>
            </button>
          </form>
        </div>
      
    </div>
  </div>
  );
}

export default App