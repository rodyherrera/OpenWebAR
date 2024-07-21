import React from 'react';
import { BsStars } from 'react-icons/bs';
import { TiArrowSortedUp } from 'react-icons/ti';
import { PiSpeakerHigh } from "react-icons/pi";
import { SlLike, SlDislike } from "react-icons/sl";
import Input from '@components/form/Input';
import useAna from '@hooks/useAna';
import Loader from '@components/general/Loader';
import AnaChatHeader from '@components/ana/AnaChatHeader';
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

                <div className='Ana-Chat-Footer-Container'>
                    {(messages.length >= 1 && !(!currentAssistantMessage.length && messages.length <= 1 && isLoading)) && (
                        <div className='Ana-Chat-Footer-Suggests-Container'>
                            {["What can I do with Vision's?", 'Ideas about inmersive experiences with WebAR', "I would like to meet you, who are you?"].map((suggest, index) => (
                                <div className='Ana-Suggest-Container Extended' key={index} onClick={() => suggestHandler(suggest)}>
                                    <p className='Ana-Suggest'>{suggest}</p>
                                </div>
                            ))}
                        </div>
                    )}
                    <Input 
                        containerProps={{ className: 'Ana-Chat-Message-Input-Container' }}
                        variant='Ana-Chat-Message-Input'
                        placeholder='Message to Ana'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        RightIconProps={{ 
                            onClick: messageSubmitHandler,
                            style: { opacity: (isLoading) ? (0.3) : (1) }
                        }}
                        RightIcon={() => (
                            <TiArrowSortedUp />
                        )}
                    />
                </div>
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