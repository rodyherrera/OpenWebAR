import React from 'react';
import AnaResponseOptions from '@components/ana/AnaResponseOptions';
import './AnaChatMessages.css';

const AnaChatMessages = ({ messagesContainerRef, messages, currentAssistantMessage }) => {

    return (
        <div className='Ana-Messages-Container' ref={messagesContainerRef}>
            {messages.map(({ content, role }, index) => (
                <div key={index} className={`Ana-Message-Container ${role}`}>
                    {role === 'assistant' ? (
                        <React.Fragment>
                            <div className='Ana-Message-Top-Assistant-Container'>
                                <div className='Ana-Response-Options-Container'>
                                    <i className='Ana-Message-Icon-Container' />
                                </div>
                                <p className='Ana-Message-Content'>{content}</p>
                            </div>
                            <AnaResponseOptions />
                        </React.Fragment>
                    ) : (
                        <span className='Ana-Message-Content'>{content}</span>
                    )}
                </div>
            ))}
            {currentAssistantMessage && (
                <div className={`Ana-Message-Container assistant`}>
                    <div className='Ana-Message-Top-Assistant-Container'>
                        <div className='Ana-Response-Options-Container'>
                            <i className='Ana-Message-Icon-Container' />
                        </div>
                        <span className='Ana-Message-Content'>{currentAssistantMessage}</span>
                    </div>
                    <AnaResponseOptions />
                </div>
            )}
        </div>
    );
};

export default AnaChatMessages;