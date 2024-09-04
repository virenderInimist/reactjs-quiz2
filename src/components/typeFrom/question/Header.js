import React from 'react';
import './Header.css';

function Header() {
    return (
        <div className="header">
            <h6>My workspace > Development Quiz</h6>
            <div className="actions">
                <button className="action-button">Create</button>
                <button className="action-button">Connect</button>
                <button className="action-button">Share</button>
                <button className="action-button">Results</button>
            </div>
        </div>
    );
}

export default Header;
