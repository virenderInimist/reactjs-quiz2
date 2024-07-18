import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to manage sidebar open/close

    const sidebarStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: isSidebarOpen ? '230px' : '80px', // Adjusted width based on sidebar state
        transition: 'width 0.3s ease' // Smooth transition for width change
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={sidebarStyle}>
                <Link to="/home" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <svg className="bi me-2" width="40" height="32">
                        <use xlinkHref="#bootstrap"></use>
                    </svg>
                    <span className={`fs-4 ${isSidebarOpen ? '' : 'd-none'}`}>Quiz Maker</span>
                </Link>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <Link to="/home" className="nav-link active" aria-current="page">
                            <svg className="bi me-2" width="16" height="16">
                                <use xlinkHref="#home"></use>
                            </svg>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="#" className="nav-link text-white">
                            <svg className="bi me-2" width="16" height="16">
                                <use xlinkHref="#speedometer2"></use>
                            </svg>
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="#" className="nav-link text-white">
                            <svg className="bi me-2" width="16" height="16">
                                <use xlinkHref="#table"></use>
                            </svg>
                            Orders
                        </Link>
                    </li>
                    <li>
                        <Link to="#" className="nav-link text-white">
                            <svg className="bi me-2" width="16" height="16">
                                <use xlinkHref="#grid"></use>
                            </svg>
                            Products
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile" className="nav-link text-white">
                            <svg className="bi me-2" width="16" height="16">
                                <use xlinkHref="#people-circle"></use>
                            </svg>
                            My account
                        </Link>
                    </li>
                </ul>
                <hr />
                {/* <button className="btn btn-dark btn-sm mt-auto" onClick={toggleSidebar}>
                    {isSidebarOpen ? 'Minimize' : 'Maximize'}
                </button> */}
            </div>
        </>
    );
}

export default Sidebar;
