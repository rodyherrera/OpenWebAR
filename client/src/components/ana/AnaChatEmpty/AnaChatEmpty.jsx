import React from 'react';
import './AnaChatEmpty.css';

const AnaChatEmpty = ({ suggestHandler }) => {

    return (
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
    );
};

export default AnaChatEmpty;