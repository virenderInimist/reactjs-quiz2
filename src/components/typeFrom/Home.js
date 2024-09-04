import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import FormsList from './FormsList';
import './Workspace.css'; // Create this file for additional styling if needed.

function Workspace() {
    return (
        <div className="workspace d-flex">
            <Sidebar />
            <div className="main-content flex-grow-1 p-4">
                <Header />
                <FormsList />
            </div>
        </div>
    );
}

export default Workspace;
