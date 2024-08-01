import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosApi from '../../axiosApi';

function SidebarS() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar open/close
    const navigate = useNavigate();
    const sidebarStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: isSidebarOpen ? '230px' : '80px', // Adjusted width based on sidebar state
        transition: 'width 0.3s ease' // Smooth transition for width change
    };

    // const toggleSidebar = () => {
    //     setIsSidebarOpen(!isSidebarOpen);
    // }

    const handleLogout = () => {

        axiosApi.post('/logout')
            .then((res) => {

                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                localStorage.removeItem('userRole');
                navigate('/');

            })
            .catch((error) => {
                console.error(error);
            });

    };
    return (
        <>
            <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={sidebarStyle}>
                <Link to="/home" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <i className="fas fa-home fa-2x me-2"></i>
                    <span className={`fs-4 ${isSidebarOpen ? '' : 'd-none'}`}>Quiz Maker</span>
                </Link>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <Link to="/home" className="nav-link active" aria-current="page" title='home'>
                            <i className="fas fa-home me-2"></i>
                            <span className={`${isSidebarOpen ? '' : 'd-none'}`}>Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="#" className="nav-link text-white">
                            <i className="fas fa-tachometer-alt me-2"></i>
                            <span className={`${isSidebarOpen ? '' : 'd-none'}`}>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="#" className="nav-link text-white">
                            <i className="fas fa-table me-2"></i>
                            <span className={`${isSidebarOpen ? '' : 'd-none'}`}>Orders</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="#" className="nav-link text-white">
                            <i className="fas fa-th me-2"></i>
                            <span className={`${isSidebarOpen ? '' : 'd-none'}`}>Products</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile" className="nav-link text-white" title='profile'>
                            <i className="fas fa-user-circle me-2"></i>
                            <span className={`${isSidebarOpen ? '' : 'd-none'}`}>My account</span>
                        </Link>
                    </li>
                    <li>
                        <Link onClick={handleLogout} className="nav-link text-white" title='profile'>
                            <i className="fas fa-sign-out-alt me-2"></i>
                            <span className={`${isSidebarOpen ? '' : 'd-none'}`}>Logout</span>
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

export default SidebarS;
