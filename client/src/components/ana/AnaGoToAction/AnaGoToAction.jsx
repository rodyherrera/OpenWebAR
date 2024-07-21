import React from 'react';
import { BsStars } from 'react-icons/bs';
import './AnaGoToAction.css';

const AnaGoToAction = ({ toggleChatEnabled }) => {

    return (
        <div 
            className='Ana-Go-To-Action-Container' 
            onClick={toggleChatEnabled}
        >
            <span className='Ana-Go-To-Action-Text'>Chat with Ana</span>
            <i className='Ana-Go-To-Action-Icon-Container'>
                <BsStars />
            </i>
        </div>
    );
};

export default AnaGoToAction;