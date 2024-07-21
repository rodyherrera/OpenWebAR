import React, { useState } from 'react';
import { BsStars } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import { TiArrowSortedUp } from 'react-icons/ti';
import Input from '@components/form/Input';
import './Ana.css';

const Ana = () => {
    const [isChatEnabled, setIsChatEnabled] = useState(false);

    return (
        <div className='Ana-Container'>
            <div className='Ana-Chat-Container'>
                <div className='Ana-Chat-Header-Container'>
                    <h3 className='Ana-Chat-Title'>How can I help you today?</h3>
                    <i className='Ana-Chat-Header-Icon-Container'>
                        <IoClose />
                    </i>
                </div>

                <div className='Ana-Chat-Body-Container'>
                    <div className='Ana-Empty-Chat-Container'>
                        {['I would like you to tell me a joke', 'Tell me a curious fact, surprise me', 'Are you aware of reality, Ana?'].map((suggest, index) => (
                            <div className='Ana-Suggest-Container' key={index}>
                                <p className='Ana-Suggest'>{suggest}</p>
                            </div>
                        ))}
                        <div className='Ana-Empty-Chat-Header-Container'>
                            <h3 className='Ana-Empty-Chat-Header-Title'>🙆‍♀️</h3>
                        </div>
                        <div className='Ana-Empty-Chat-Bottom-Container'>
                            {["What can I do with Vision's?", 'Ideas about inmersive experiences with WebAR', "I would like to meet you, who are you?"].map((suggest, index) => (
                                <div className='Ana-Suggest-Container' key={index}>
                                    <p className='Ana-Suggest'>{suggest}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='Ana-Chat-Footer-Container'>
                    <Input 
                        containerProps={{ className: 'Ana-Chat-Message-Input-Container' }}
                        variant='Ana-Chat-Message-Input'
                        placeholder='Message to Ana'
                        RightIcon={() => (
                            <TiArrowSortedUp />
                        )}
                    />
                </div>
            </div>
            {!true && (
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