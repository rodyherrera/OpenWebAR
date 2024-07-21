import React from 'react';
import AnaSuggest from '@components/ana/AnaSuggest';
import './AnaChatEmpty.css';

const AnaChatEmpty = ({ suggestHandler }) => {

    return (
        <div className='Ana-Empty-Chat-Container'>
            {['I would like you to tell me a joke', 'Tell me a curious fact, surprise me', 'Are you aware of reality, Ana?'].map((suggest, index) => (
                <AnaSuggest key={index} suggest={suggest} suggestHandler={suggestHandler} />
            ))}
            <div className='Ana-Empty-Chat-Header-Container'>
                <h3 className='Ana-Empty-Chat-Header-Title'>🙆‍♀️</h3>
            </div>
            <div className='Ana-Empty-Chat-Bottom-Container'>
                {["What can I do with Vision's?", 'Ideas about inmersive experiences with WebAR', "I would like to meet you, who are you?"].map((suggest, index) => (
                    <AnaSuggest key={index} suggest={suggest} suggestHandler={suggestHandler} />
                ))}
            </div>
        </div>  
    );
};

export default AnaChatEmpty;