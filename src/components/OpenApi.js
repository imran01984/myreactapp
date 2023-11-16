import { useState }  from 'react';
//import OpenAI from 'openai';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {  MainContainer,  ChatContainer,  MessageList,  Message,  MessageInput,  TypingIndicator, } from '@chatscope/chat-ui-kit-react';


export default function OpenApi() {
    

  const openaikey = "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";
    
    const [messages, setMessages] = useState([
          {
            message: "Hello, I'm ChatGPT! Ask me anything!",
            sentTime: "just now",
            sender: "ChatGPT",
          },
        ]);
        const [isTyping, setIsTyping] = useState(false);
      
        const handleSendRequest = async (message) => {
          const newMessage = {
            message,
            direction: 'outgoing',
            sender: "user",
          };
      
          setMessages((prevMessages) => [...prevMessages, newMessage]);
          setIsTyping(true);
      
          try {
            const response = await processMessageToChatGPT([...messages, newMessage]);
            const content = response.choices[0]?.message?.content;
            if (content) {
              const chatGPTResponse = {
                message: content,
                sender: "ChatGPT",
              };
              setMessages((prevMessages) => [...prevMessages, chatGPTResponse]);
            }
          } catch (error) {
            console.error("Error processing message:", error);
          } finally {
            setIsTyping(false);
          }
        };
      
        async function processMessageToChatGPT(chatMessages) {
          const apiMessages = chatMessages.map((messageObject) => {
            const role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
            return { role, content: messageObject.message };
          });      
          const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
              { role: "system", 
              content: "I'm a OpenAI User using ChatGPT for learning" 
              },
              ...apiMessages,
            ],
          };      
          const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
              "Authorization": "Bearer " + openaikey,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(apiRequestBody),
          });
      
          return response.json();
        }
  return (
    <div className="App">
      <div style={{ position:"absolute", height: "600px", width: "550px", border: "3px solid #73AD21" }}>      
        <MainContainer>
          <ChatContainer>                 
            <MessageList 
              scrollBehavior="smooth" 
              typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}>
              
              {messages.map((message, i) => {
                console.log(message)
                return <Message key={i} model={message} />
              })}

            </MessageList>
            <MessageInput placeholder="Send a Message" onSend={handleSendRequest} />        
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  )
}
