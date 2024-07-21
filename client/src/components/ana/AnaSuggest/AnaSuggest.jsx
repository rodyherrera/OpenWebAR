import React from 'react';
import './AnaSuggest.css';

const AnaSuggest = ({ suggest, suggestHandler }) => {

    return (
        <div className='Ana-Suggest-Container' onClick={() => suggestHandler(suggest)}>
            <p className='Ana-Suggest'>{suggest}</p>
        </div>
    );
};

export default AnaSuggest;