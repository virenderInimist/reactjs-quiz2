import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SidebarS from '../layouts/SidebarS';
import axiosApi from '../../axiosApi';
import Swal from 'sweetalert2';

function EditQuiz() {
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const { quizId } = location.state || {};
    const [data, setData] = useState({
        name: '',
        description: '',
        minpassquestions: ''
    });
    const navigate = useNavigate();
    
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
            navigate('/');  // Redirect to home if no token
            return;
        }
        axiosApi.get('/quiz/edit/' + quizId).then((res) => {
            setData({
                'name': res.data.name,
                'description': res.data.description,
                'minpassquestions': res.data.minpassquestions,
            });
            setLoading(false);
        });
    }, []);

    const [errors, setErrors] = useState({
        name: '',
        description: '',
        'minpassquestions': ''
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (name === 'minpassquestions') {
            if (value < 0 || value > 100) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    minpassquestions: 'Min pass question must be between 0 and 100',
                }));
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    minpassquestions: '',
                }));
            }
        }
    };


    const onSubmit = (event) => {
        event.preventDefault();

        // Add your own validation logic here if needed
        if (!data.name.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                name: 'Quiz name is required',
            }));
            return;
        }

        axiosApi.put('/quiz/update/' + quizId, data).then((res) => {
            Swal.fire({
                icon: 'success',
                title: 'Success',
            }).then(() => {
                navigate('/home');
            });
        });
    };

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-1'>
                    <SidebarS />
                </div>
                <div className='col-11'>
                    <div className="row mt-2">
                        <div className="col-md-10">
                            <b>Test Link</b>
                        </div>
                        <div className="col-md-2 text-md-end">
                            <Link to="/question-manager"sdasdsadasdas className='btn btn-success'>Question Manager</Link>
                        </div>
                        {loading ? (
                            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                                <i className="fas fa-spinner fa-spin fa-3x"></i>
                            </div>
                        ) : (
                            <div className='col-md-12'>
                                <form onSubmit={onSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="quiz-name">Quiz Name</label>
                                        <input
                                            type="text"
                                            id="quiz-name"
                                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                            placeholder="Enter quiz name"
                                            name="name"
                                            value={data.name}
                                            onChange={handleChange}
                                        />
                                        {errors.name && <span className="invalid-feedback">{errors.name}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Description</label>
                                        <textarea
                                            id="description"
                                            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                            placeholder="Enter description"
                                            name="description"
                                            value={data.description}
                                            onChange={handleChange}
                                        ></textarea>
                                        {errors.description && <span className="invalid-feedback">{errors.description}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Min Pass question</label>
                                        <input type='number'
                                            id="description"
                                            className={`form-control ${errors.minpassquestions ? 'is-invalid' : ''}`}
                                            placeholder="Enter min pass question percentage"
                                            max='100'
                                            min='0'
                                            name="minpassquestions"
                                            value={data.minpassquestions}
                                            onChange={handleChange}
                                        />
                                        {errors.minpassquestions && <span className="invalid-feedback">{errors.minpassquestions.message}</span>}
                                    </div>
                                    <button type="submit" className="btn btn-primary my-2">Submit</button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>

    )
}

export default EditQuiz