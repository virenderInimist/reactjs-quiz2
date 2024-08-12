import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../layouts/Sidebar';

function ChangeEmail() {
    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <div className="col-2">
                    <Sidebar />
                </div>

                {/* Main Content Area */}
                <div className="col-10">
                    <div className="row">
                        {/* "Manage your account" Sidebar */}
                        <div className="col-3 bg-light border-end vh-100">
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

                        {/* Email Change Form */}
                        <div className="col-9">
                            <div className="container mt-4">
                                <div className="card shadow-sm mb-4">
                                    <div className="card-body">
                                        <h5 className="card-title">Set a new email address for your account</h5>
                                        <hr />
                                        <form>
                                            <div className="mb-3">
                                                <label htmlFor="currentEmail" className="form-label">Current email address</label>
                                                <input type="email" className="form-control" id="currentEmail" value="virenderk@inimisttech.com" readOnly />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="newEmail" className="form-label">New email address</label>
                                                <input type="email" className="form-control" id="newEmail" placeholder="New email address" />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="confirmNewEmail" className="form-label">Re-enter new email address</label>
                                                <input type="email" className="form-control" id="confirmNewEmail" placeholder="Re-enter new email address" />
                                            </div>
                                            <button type="submit" className="btn btn-success">Save</button>
                                        </form>
                                    </div>
                                </div>

                                {/* Additional Sign-in Options */}
                                <div className="mt-5">
                                    <h6>SIGN IN WITH MICROSOFT</h6>
                                    {/* Add your Microsoft sign-in button or functionality here */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangeEmail;
