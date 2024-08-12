import React from 'react';
import Sidebar from '../layouts/Sidebar';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axiosApi from '../../axiosApi';
import Swal from 'sweetalert2';

function ChangePassword() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        axiosApi.put('/updatePassword', data)
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: res.data.message,
                });
            })
            .catch((err) => {
                if (err.response && err.response.status === 422) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: err.response.data.error || 'Old password does not match.',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'An unexpected error occurred. Please try again later.',
                    });
                }
            });
    }

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
                        <div className="col-lg-3 bg-light border-end vh-100">
                            <div className="py-4">
                                <h4 className="text-center">Manage your account</h4>
                                <hr />
                                <ul className="nav flex-column">
                                    <li className="nav-item">
                                        <Link className="nav-link active" to="/profile"><i className="bi bi-person"></i> General information</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/LoadChangePassword"><i className="bi bi-shield-lock"></i> Password and sign in</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/LoadChangeEmail"><i className="bi bi-envelope"></i> Change email address</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Password Form */}
                        <div className="col-9">
                            <div className="container mt-4">
                                <div className="card shadow-sm mb-4">
                                    <div className="card-body">
                                        <h5 className="card-title">Set a new password for your account</h5>
                                        <hr />
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="mb-3">
                                                <label htmlFor="currentPassword" className="form-label">Current password</label>
                                                <input
                                                    {...register('old_password', { required: "Current password is required" })}
                                                    type="password"
                                                    className="form-control"
                                                    id="currentPassword"
                                                    placeholder="Current password"
                                                />
                                                {errors.old_password && <p className="text-danger">{errors.old_password.message}</p>}
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="newPassword" className="form-label">New password</label>
                                                <input
                                                    {...register('new_password', { required: "New password is required" })}
                                                    type="password"
                                                    className="form-control"
                                                    id="newPassword"
                                                    placeholder="New password"
                                                />
                                                {errors.new_password && <p className="text-danger">{errors.new_password.message}</p>}
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="confirmNewPassword" className="form-label">Re-enter new password</label>
                                                <input
                                                    {...register('confirm_new_password', {
                                                        required: "Please confirm your new password",
                                                        validate: value => value === watch('new_password') || "Passwords do not match"
                                                    })}
                                                    type="password"
                                                    className="form-control"
                                                    id="confirmNewPassword"
                                                    placeholder="Re-enter new password"
                                                />
                                                {errors.confirm_new_password && <p className="text-danger">{errors.confirm_new_password.message}</p>}
                                            </div>
                                            <button type="submit" className="btn btn-primary">Submit</button>
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

export default ChangePassword;
