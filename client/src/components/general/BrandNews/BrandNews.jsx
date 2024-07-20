import React from 'react';
import { HiArrowUpRight } from 'react-icons/hi2';
import './BrandNews.css';

const BrandNews = ({ backgroundImage, title }) => {

    return (
        <figure className='Brand-News-Container'>
            <img 
                className='Brand-News-Image'
                src={backgroundImage} 
                alt='Augmented Reality Powered Humans' />
            <figcaption className='Brand-News-Caption-Container'>
                <h3 className='Brand-News-Caption-Title'>{title}</h3>
                <i className='Brand-News-Caption-Icon-Container'>
                    <HiArrowUpRight />
                </i>
            </figcaption>
        </figure>
    );
};

export default BrandNews;