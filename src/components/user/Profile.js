import React, { useEffect, useState } from 'react';
import Sidebar from '../layouts/Sidebar';
import axiosApi from '../../axiosApi';
import { Link, useNavigate } from 'react-router-dom';

function Profile() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosApi.get('/user');
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error appropriately
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {

    axiosApi.post('/logout')
      .then(() => {
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
    <div className="container-fluid">
      <div className="row">

        <div className="col-2">
          <Sidebar />
        </div>

        <div className="col-10">
          <div className="container-fluid mt-4">
            <div className="row">
              <div className="col-lg-3 bg-light border-end vh-100">
                <div className="py-4">
                  <h4 className="text-center">Manage your account</h4>
                  <hr />
                  <ul className="nav flex-column">
                    <li className="nav-item">
                      <Link className="nav-link active" to="/profile"><i className="bi bi-person"></i> General information</Link>
                    </li>
                    {/* <li className="nav-item">
                      <a className="nav-link" href="#"><i className="bi bi-receipt"></i> Billing</a>
                    </li> */}
                    {/* <li className="nav-item">
                      <a className="nav-link" href="#"><i className="bi bi-people"></i> Respondent data fields</a>
                    </li> */}
                    {/* <li className="nav-item">
                      <a className="nav-link" href="#"><i className="bi bi-translate"></i> Language and region</a>
                    </li> */}
                    {/* <li className="nav-item">
                      <a className="nav-link" href="#"><i className="bi bi-bell"></i> Notifications</a>
                    </li> */}
                    <li className="nav-item">
                      <Link className="nav-link" to="/LoadChangePassword"><i className="bi bi-shield-lock"></i> Password and sign in</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/LoadChangeEmail"><i className="bi bi-envelope"></i> Change email address</Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-9">
                {loading ? (
                  <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                    <i className="fas fa-spinner fa-spin fa-3x"></i>
                  </div>
                ) : (
                  <>
                    {/* General Information Card */}
                    < div className="card shadow-sm mb-4">
                      <div className="card-body">
                        <h4 className="card-title">General Information</h4>
                        <hr />
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <div>
                            <h5 className="mb-0">Name: <strong>{userData?.name}</strong></h5>
                          </div>
                          <div>
                            <button className="btn btn-outline-danger" onClick={handleLogout}>Sign out</button>
                          </div>
                        </div>
                        <div className="alert alert-warning">
                          <i className="bi bi-exclamation-triangle"></i> Your account has been frozen and does not allow you to conduct tests. Taking tests is no longer possible.
                        </div>
                        <div className="text-center mb-4">
                          <button className="btn btn-success">Upgrade</button>
                        </div>
                      </div>
                    </div>

                    {/* Statistics Card */}
                    <div className="card shadow-sm">
                      <div className="card-body">
                        <h4 className="card-title">Statistics</h4>
                        <hr />
                        <ul className="list-unstyled">
                          <li>Tests created: <strong>3</strong></li>
                          <li>Tests completed in the last 30 days: <strong>0</strong></li>
                          <li>Tests completed in total: <strong>1</strong></li>
                          <li>Training tests completed in the last 30 days: <strong>0</strong></li>
                          <li>Training tests completed in total: <strong>0</strong></li>
                        </ul>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Profile;
