// Logo.js
import React from 'react';

const Logo = () => {
    return (
        <div className="LogoContainer">
            <img src={`${window.location.origin.toString()}/arabic-logo.png`} alt="Logo" height={'100%'} width={'100%'} className="h-10" />
        </div>
    );
};

export default Logo;
