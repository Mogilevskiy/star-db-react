import React from 'react';

import './error-indicator.css';
import icon from './death-star-icon.png'

const ErrorIndicator = () => {

    return(
        <section className={'error-indicator'}>
            <img src={icon} alt="error-icon"/>
            <span>BOOM!</span>
            <span>Something has gone terribly wrong!</span>
            <span>(but we already sent our droids to fix it)</span>
        </section>
    )
};

export default ErrorIndicator