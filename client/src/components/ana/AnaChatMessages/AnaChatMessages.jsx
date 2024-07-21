import React from 'react';
import { PiSpeakerHigh } from 'react-icons/pi';
import { SlLike, SlDislike } from 'react-icons/sl';
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
                            <div className='Ana-Response-Options-Bottom-Container'>
                                <i className='Ana-Response-Option'>
                                    <PiSpeakerHigh />
                                </i>
                                <i className='Ana-Response-Option'>
                                    <SlLike />
                                </i>
                                <i className='Ana-Response-Option'>
                                    <SlDislike />
                                </i>
                            </div>
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
                    <div className='Ana-Response-Options-Bottom-Container'>
                        <i className='Ana-Response-Option'>
                            <PiSpeakerHigh />
                        </i>
                        <i className='Ana-Response-Option'>
                            <SlLike />
                        </i>
                        <i className='Ana-Response-Option'>
                            <SlDislike />
                        </i>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnaChatMessages;