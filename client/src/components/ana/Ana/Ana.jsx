import React from 'react';
import useAna from '@hooks/useAna';
import Loader from '@components/general/Loader';
import AnaChatMessages from '@components/ana/AnaChatMessages';
import AnaChatHeader from '@components/ana/AnaChatHeader';
import AnaChatFooter from '@components/ana/AnaChatFooter';
import AnaChatEmpty from '@components/ana/AnaChatEmpty';
import AnaGoToAction from '@components/ana/AnaGoToAction';
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
                            <AnaChatEmpty suggestHandler={suggestHandler} />
                        )
                    )}
                </div>
                
                <AnaChatFooter
                    messages={messages}
                    setMessage={setMessage}
                    messageSubmitHandler={messageSubmitHandler}
                    message={message}
                    suggestHandler={suggestHandler}
                    currentAssistantMessage={currentAssistantMessage}
                    isLoading={isLoading} />
            </div>
            {!isChatEnabled && (
                <AnaGoToAction toggleChatEnabled={toggleChatEnabled} />
            )}
        </div>
    );
};

export default Ana;