import React from 'react';
import HeaderItem from '@components/header/HeaderItem';
import './Header.css';

const Header = () => {

    return (
        <div className='Header-Container-Wrapper'>
            <header className='Header-Container'>
                {['Store', 'WebAR', 'Support', 'Account', 'Open Source', 'Documentation', 'Privacy & Terms', 'Explore'].map((title, index) => (
                    <HeaderItem title={title} key={index} />
                ))}
            </header>
        </div>
    );
};

export default Header;