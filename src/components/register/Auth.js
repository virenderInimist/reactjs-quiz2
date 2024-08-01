import React, { useEffect, useState } from 'react';
import Signin from './Signin';
import Signup from './Signup';
import axiosApi from '../../axiosApi';
import { useNavigate } from 'react-router-dom';

function Auth() {
    const [active, setActive] = useState('signin');
    const navigate = useNavigate();
    
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            axiosApi.get('/user').then((res) => {
                navigate('/home');
            }).catch((error) => {
                console.log('login/signup')
            });
        }
    })

    const AuthStyle = {
        margin: '20px 0',
        background: 'white',
        width: '33.3s%'
    }
    const handleClick = (tab) => {
        setActive(tab);
    }

    return (
        <div className="container d-flex justify-content-center align-items-center "  >
            <div className='row border p-2' style={AuthStyle}>
                <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                    <li className="nav-item" role="presentation">
                        <a className={`nav-link ${active === 'signin' ? 'active' : ''}`} onClick={() => handleClick('signin')}>Login</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className={`nav-link ${active === 'signup' ? 'active' : ''}`} onClick={() => handleClick('signup')}>Register</a>
                    </li>
                </ul>

                <div className="tab-content">
                    {
                        active === 'signin' ? <Signin /> : <Signup />
                    }
                </div>
            </div>
        </div>
    );
}

export default Auth;
