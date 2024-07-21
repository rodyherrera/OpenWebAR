import React, { useState, useEffect, useRef } from 'react';
import { BsStars } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import { io } from 'socket.io-client';
import { TiArrowSortedUp } from 'react-icons/ti';
import { PiSpeakerHigh } from "react-icons/pi";
import { SlLike, SlDislike } from "react-icons/sl";
import Input from '@components/form/Input';
import Loader from '@components/general/Loader';
import './Ana.css';

// NOTE: ALL THIS COMPONENT THIS REFACTOR.
const Ana = () => {
    const [isChatEnabled, setIsChatEnabled] = useState(true);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [currentAssistantMessage, setCurrentAssistantMessage] = useState('');
    const messagesContainerRef = useRef(null);

    useEffect(() => {
        const scrollToBottom = () => {
            if(messagesContainerRef.current){
                messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
            }
        };
        scrollToBottom();
    }, [messages, currentAssistantMessage]);

    useEffect(() => {
        const wSocket = io('https://8000--main--trinity--rodyherrera--c3cp3puaetl6s.pit-1.try.coder.app', {
            transports: ['websocket'],
            reconnectionDelayMax: 10000
        });

        wSocket.on('connect', () => {
            setIsConnected(true);
        });

        wSocket.on('disconnect', () => {
            setIsConnected(false);
        });

        wSocket.on('ollama-stream-response', ({ message, done }) => {
            setCurrentAssistantMessage((prev) => {
                const assistantMessage = prev + message.content;
                if(done){
                    setMessages((prev) => [ ...prev, { role: 'assistant', content: assistantMessage } ]);
                    setIsLoading(false);
                    return '';
                }
                return assistantMessage;
            });
        });

        setSocket(wSocket);
        return () => {
            wSocket.disconnect();
        };
    }, []);

    const suggestHandler = (suggest) => {
        setMessages([ ...messages, { role: 'user', content: suggest } ]);
        socket.emit('ollama-prompt', suggest);
        setMessage('');
        setIsLoading(true);
    };

    const messageSubmitHandler = () => {
        setMessages([ ...messages, { role: 'user', content: message } ]);
        socket.emit('ollama-prompt', message);
        setMessage('');
        setIsLoading(true);
    };
    
    return (
        <div className='Ana-Container'>
            <div className='Ana-Chat-Container' data-isactive={isChatEnabled}>
                <div className='Ana-Chat-Header-Container'>
                    <h3 className='Ana-Chat-Title'>How can I help you today?</h3>
                    <i className='Ana-Chat-Header-Icon-Container' onClick={() => setIsChatEnabled(false)}>
                        <IoClose />
                    </i>
                </div>

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
                    onClick={() => setIsChatEnabled(true)}
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