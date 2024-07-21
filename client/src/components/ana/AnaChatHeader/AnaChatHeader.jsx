import React from 'react';
import { IoClose } from 'react-icons/io5';
import './AnaChatHeader.css';

const AnaChatHeader = ({ chatTitle, setIsChatEnabled }) => {
    return (
        <div className='Ana-Chat-Header-Container'>
            <h3 className='Ana-Chat-Title'>{chatTitle}</h3>
            <i className='Ana-Chat-Header-Icon-Container' onClick={() => setIsChatEnabled(false)}>
                <IoClose />
            </i>
        </div>
    );
};

export default AnaChatHeader;