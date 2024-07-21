import React from 'react';
import { TiArrowSortedUp } from 'react-icons/ti';
import Input from '@components/form/Input';
import AnaSuggest from '@components/ana/AnaSuggest';
import './AnaChatFooter.css';

const AnaChatFooter = ({ 
    messages, 
    setMessage, 
    suggestHandler,
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
                        <AnaSuggest variant='Extended' suggest={suggest} suggestHandler={suggestHandler} key={index} />
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