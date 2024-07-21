import React from 'react';
import './AnaSuggest.css';

const AnaSuggest = ({ suggest, suggestHandler, variant = '' }) => {

    return (
        <div className={'Ana-Suggest-Container '.concat(variant)} onClick={() => suggestHandler(suggest)}>
            <p className='Ana-Suggest'>{suggest}</p>
        </div>
    );
};

export default AnaSuggest;