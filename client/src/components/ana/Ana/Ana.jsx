import React from 'react';
import { BsStars } from 'react-icons/bs';
import useAna from '@hooks/useAna';
import Loader from '@components/general/Loader';
import AnaChatMessages from '@components/ana/AnaChatMessages';
import AnaChatHeader from '@components/ana/AnaChatHeader';
import AnaChatFooter from '@components/ana/AnaChatFooter';
import './Ana.css';

const Ana = () => {
    const {
        isChatEnabled,
        message,
        isLoading,
        messages,
        currentAssistantMessage,
        chatTitle,
        messagesContainerRef,
        setMessage,
        suggestHandler,
        messageSubmitHandler,
        toggleChatEnabled
    } = useAna();

    return (
        <div className='Ana-Container'>
            <div className='Ana-Chat-Container' data-isactive={isChatEnabled}>
                <AnaChatHeader chatTitle={chatTitle} setIsChatEnabled={toggleChatEnabled} />

                <div className='Ana-Chat-Body-Container'>
                    {(!currentAssistantMessage.length && messages.length <= 1 && isLoading) ? (
                        <div className='Ana-Empty-Chat-Loading-Container'>
                            <Loader scale='0.5' />
                        </div>
                    ) : (   
                        (messages.length >= 1) ? (
                           <AnaChatMessages 
                                messagesContainerRef={messagesContainerRef}
                                messages={messages}
                                currentAssistantMessage={currentAssistantMessage} />
                        ) : (
                            <div className='Ana-Empty-Chat-Container'>
                                {['I would like you to tell me a joke', 'Tell me a curious fact, surprise me', 'Are you aware of reality, Ana?'].map((suggest, index) => (
                                    <div className='Ana-Suggest-Container' key={index} onClick={() => suggestHandler(suggest)}>
                                        <p className='Ana-Suggest'>{suggest}</p>
                                    </div>
                                ))}
                                <div className='Ana-Empty-Chat-Header-Container'>
                                    <h3 className='Ana-Empty-Chat-Header-Title'>🙆‍♀️</h3>
                                </div>
                                <div className='Ana-Empty-Chat-Bottom-Container'>
                                    {["What can I do with Vision's?", 'Ideas about inmersive experiences with WebAR', "I would like to meet you, who are you?"].map((suggest, index) => (
                                        <div className='Ana-Suggest-Container' key={index} onClick={() => suggestHandler(suggest)}>
                                            <p className='Ana-Suggest'>{suggest}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>  
                        )
                    )}
                </div>
                
                <AnaChatFooter
                    messages={messages}
                    setMessage={setMessage}
                    messageSubmitHandler={messageSubmitHandler}
                    message={message}
                    currentAssistantMessage={currentAssistantMessage}
                    isLoading={isLoading} />
            </div>
            {!isChatEnabled && (
                <div 
                    className='Ana-Go-To-Action-Container' 
                    onClick={toggleChatEnabled}
                >
                    <span className='Ana-Go-To-Action-Text'>Chat with Ana</span>
                    <i className='Ana-Go-To-Action-Icon-Container'>
                        <BsStars />
                    </i>
                </div>
            )}
        </div>
    );
};

export default Ana;