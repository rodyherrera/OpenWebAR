import { useState, useEffect, useRef, useCallback } from 'react';
import useWebSocket from '@hooks/useWebSocket';

const useAna = () => {
    const [isChatEnabled, setIsChatEnabled] = useState(true);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const [currentAssistantMessage, setCurrentAssistantMessage] = useState('');
    const [chatTitle, setChatTitle] = useState('How can I help you today?');
    const { socket, isConnected } = useWebSocket();
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
        if(!isConnected) return;
        let titleBuffer = '';
        socket.on('ollama-generate-title-stream-response', ({ message, done }) => {
            titleBuffer += message.content;
            if(done){
                setChatTitle(titleBuffer.replaceAll('"', ''));
                titleBuffer = '';
            }
        });
        socket.on('ollama-stream-response', ({ message, done }) => {
            setCurrentAssistantMessage((prev) => {
                const assistantMessage = prev + message.content;
                if(done){
                    setMessages((prev) => [...prev, { role: 'assistant', content: assistantMessage }]);
                    socket.emit('ollama-generate-title', JSON.stringify(messages.slice(0, 2)));
                    setIsLoading(false);
                    return '';
                }
                return assistantMessage;
            });
        });
        return () => {
            socket.off('ollama-generate-title-stream-response');
            socket.off('ollama-stream-response');
        };
    }, [isConnected, socket, messages]);

    const suggestHandler = useCallback((suggest) => {
        setMessages((prev) => [ ...prev, { role: 'user', content: suggest } ]);
        socket.emit('ollama-prompt', suggest);
        setMessage('');
        setIsLoading(true);
    }, [socket]);

    const messageSubmitHandler = useCallback(() => {
        const newMessages = [...messages, { role: 'user', content: message }];
        setMessages(newMessages);
        socket.emit('ollama-prompt', message);
        setMessage('');
        setIsLoading(true);
    }, [socket, message, messages]);

    const toggleChatEnabled = useCallback(() => {
        setIsChatEnabled((prev) => !prev);
    }, []);

    return {
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
    };
};

export default useAna;