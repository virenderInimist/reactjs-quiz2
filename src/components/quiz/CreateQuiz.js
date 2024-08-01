import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2';
import axiosApi from '../../axiosApi';
import Sidebar from '../layouts/Sidebar';
import { useNavigate } from 'react-router-dom';

function CreateQuiz() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
            navigate('/');  // Redirect to home if no token
            return;
        }
    })

    const onSubmit = (data) => {
        axiosApi.post('/quiz/create', data).then((res) => {
            if (res.data == 'success') {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    //footer: '<a href="#">Why do I have this issue?</a>'
                }).then(() => {
                    navigate('/home');
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Sorry some error occured!",
                    //html: '<b>Result :' + res.data.correctquestions + '/' + res.data.totalquestions + '</b>',
                    //footer: '<a href="#">Why do I have this issue?</a>'
                });
            }
        })
    }
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-2'>
                    <Sidebar />
                </div>
                <div className='col-10'>
                    <div className='container my-2'>
                        <div className='row justify-content-center'>
                            <div className='col-md-8'>
                                <h3>Add Quiz</h3>
                                <form className='custom-form p-4' onSubmit={handleSubmit(onSubmit)}>
                                    {/* <input type='hidden' {...register('creator_id')}  defaultValue="1"/> */}
                                    <div className="form-group">
                                        <label htmlFor="quiz-name">Quiz Name</label>
                                        <input
                                            type="text"
                                            id="quiz-name"
                                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                            placeholder="Enter quiz name"
                                            {...register('name', { required: 'Quiz name is required' })}
                                        />
                                        {errors.name && <span className="invalid-feedback">{errors.name.message}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Description</label>
                                        <textarea
                                            id="description"
                                            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                            placeholder="Enter description"
                                            {...register('description', { required: 'Description is required' })}
                                        ></textarea>
                                        {errors.description && <span className="invalid-feedback">{errors.description.message}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="minpassquestions">Min Pass Question</label>
                                        <input
                                            type='number'
                                            id="minpassquestions"
                                            className={`form-control ${errors.minpassquestions ? 'is-invalid' : ''}`}
                                            placeholder="Enter min pass question percentage"
                                            {...register('minpassquestions', {
                                                required: 'This field is required',
                                                min: { value: 0, message: 'Must be at least 0' },
                                                max: { value: 100, message: 'Must be at most 100' },
                                            })}
                                        />
                                        {errors.minpassquestions && <span className="invalid-feedback">{errors.minpassquestions.message}</span>}
                                    </div>
                                    <button type="submit" className="btn btn-primary mt-2">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CreateQuiz