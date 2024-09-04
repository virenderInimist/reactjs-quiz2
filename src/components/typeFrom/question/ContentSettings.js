import React from 'react';
import './ContentSettings.css';

function ContentSettings() {
    return (
        <div className="content-settings">
            <div className="settings-section">
                <h6 className="mb-3">Content</h6>
                <button className="settings-button">Design</button>
                <button className="settings-button">Logic</button>
            </div>
        </div>
    );
}

export default ContentSettings;
