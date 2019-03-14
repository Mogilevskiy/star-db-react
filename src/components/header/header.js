import React from 'react';

import './header.css';


const Header = () => {
    return (
        <div className="row">
            <div className="col-md-12">
                <nav className="navbar navbar-expand-lg head">
                    <a className="navbar-brand" href="#">StarDB</a>
                    <ul className="navbar-nav my-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Features</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Pricing</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
};

export default Header