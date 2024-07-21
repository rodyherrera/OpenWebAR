import React from 'react';
import { TiArrowSortedUp } from 'react-icons/ti';
import Input from '@components/form/Input';
import './AnaChatFooter.css';

const AnaChatFooter = ({ 
    messages, 
    setMessage, 
    messageSubmitHandler, 
    message, 
    currentAssistantMessage, 
    isLoading 
}) => {
    return (
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
    );
};

export default AnaChatFooter;