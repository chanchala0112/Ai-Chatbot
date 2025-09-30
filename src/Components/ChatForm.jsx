import { useRef } from "react";

const ChatForm = ({ chathistory, setChatHistory , generateBotReponse}) => {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";

    // update chat history with user's message
    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);

    //Delay 600ms  before showing "Thinking..." and generating response
    setTimeout(() => {
      //Add a Thinking... placeholder for the bot's response
      setChatHistory((history) => [
        ...history,
        { role: "model", text: "Thinking..." }
       ]);

      //Call the function to generate the bot's respondse
      generateBotReponse([...chathistory , { role: "user", text: userMessage }]);
  }, 600);
  };

  return (
    <form className="chat-form" onSubmit={handleFormSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Message..."
        className="message-input"
        required
      />
      <button type="submit">
        <span className="material-symbols-rounded">
            keyboard_arrow_down
        </span>
      </button>
    </form>
  );
}

export default ChatForm;
