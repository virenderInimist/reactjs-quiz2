import React, { useEffect, useState } from 'react'
import axiosApi from '../../axiosApi';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../layouts/Sidebar';
import { useForm } from 'react-hook-form';
import MultipleChoiceMultiAnswer from './questionType/MultipleChoiceMultiAnswer';
import TrueFalse from './questionType/TrueFalse';
import MultipleChoiceOneAnswer from './questionType/MultipleChoiceOneAnswer';
import Swal from 'sweetalert2';

function EditQuestion() {
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const { questionId } = location.state || {};
    const { register, handleSubmit, formState: { errors }, setValue, unregister } = useForm({
        defaultValues: {
            title: '',
            description: ''
        }
    });
    const [questionType, setQuestionType] = useState([]);
    const [selQuestion, setSelQuestion] = useState();
    const [initialChoices, setInitialChoices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
            navigate('/');  // Redirect to home if no token
            return;
        }
        const fetchData = async () => {
            try {
                const questionResponse = await axiosApi.get('/question/edit/' + questionId);
                setValue('title', questionResponse.data.title);
                setValue('description', questionResponse.data.description);
                setValue('question_type_id', questionResponse.data.question_type_id);
                setValue('questionAnswerId', questionResponse.data.question_answers.id);
                setSelQuestion(questionResponse.data.question_type_id.toString());

                const questionTypeResponse = await axiosApi.get('questionType');
                setQuestionType(questionTypeResponse.data);

                if (questionResponse.data.question_answers) {
                    const answerOptionsArray = questionResponse.data.question_answers.answer_options.split(',');
                    const correctAnswer = questionResponse.data.question_answers.correct_answer;

                    setInitialChoices(answerOptionsArray.map(option => ({
                        value: option,
                        isCorrect: option === correctAnswer
                    })));

                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [questionId, setValue, navigate]);

    const arrayCombine = (keys, values) => {
        if (keys.length !== values.length) {
            throw new Error('Arrays must have the same length');
        }
        const combined = {};
        for (let i = 0; i < keys.length; i++) {
            combined[keys[i]] = values[i];
        }
        return combined;
    };



    const onSubmit = (data) => {
        let choices = {};
        data.creator_id = localStorage.getItem('userId');

        // Validate if at least one correct answer is selected
        if (data.question_type_id === 5 || data.question_type_id === 6) {
            const selectedCorrect = Object.values(data.correct_answer).some(value => value === true);
            if (!selectedCorrect) {
                Swal.fire({
                    icon: "error",
                    title: "you should choose an correct answer!",
                    //html: '<b>Result :' + res.data.correctquestions + '/' + res.data.totalquestions + '</b>',
                    //footer: '<a href="#">Why do I have this issue?</a>'
                });
                return;
            }
        }

        // Process data and send API request
        if (data.answer_options) {
            choices = arrayCombine(data.answer_options, data.correct_answer);
        }

        if (data.question_type_id === 4) {
            data.answer_options = ['true', 'false'];
        }

        if (data.question_type_id === 5 || data.question_type_id === 6) {
            const answer = Object.entries(choices)
                .filter(([key, value]) => value === true)
                .map(([key]) => key).join(', ');
            data.correct_answer = answer;
        }

        axiosApi.put('/question/update/' + questionId, data).then((res) => {
            if (res.data === 'success') {
                Swal.fire({
                    icon: "success",
                    title: "Question updated",
                    //footer: '<a href="#">Why do I have this issue?</a>'
                }).then(() => {
                    navigate('/question-manager');
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Sorry some error occured!",
                    //html: '<b>Result :' + res.data.correctquestions + '/' + res.data.totalquestions + '</b>',
                    //footer: '<a href="#">Why do I have this issue?</a>'
                });
            }
        }).catch((error) => {
            console.error("Error updating question:", error);
            // Handle error, show appropriate message if needed
        });
    };


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-2">
                    <Sidebar />
                </div>
                <div className="col-10">

                    <div className="container my-2">
                        {loading ? (
                            <div className="loading-spinner">
                                <i className="fas fa-spinner fa-spin"></i>
                            </div>
                        ) : (
                            <div className="row justify-content-center">
                                <div className="col-md-8">
                                    <h3>Edit Question</h3>
                                    <form className="custom-form p-4" onSubmit={handleSubmit(onSubmit)}>
                                        <div className="form-group">
                                            <label htmlFor="question-title">Question Title</label>
                                            <input
                                                type="text"
                                                id="question-title"
                                                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                                placeholder="Enter question title"
                                                {...register('title', { required: 'Question title is required' })}
                                            />
                                            {errors.title && <span className="invalid-feedback">{errors.title.message}</span>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="description">Description</label>
                                            <textarea
                                                id="description"
                                                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                                placeholder="Enter description"
                                                {...register('description')}
                                            ></textarea>
                                            {errors.description && <span className="invalid-feedback">{errors.description.message}</span>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="question-type">Question Type</label>
                                            <select
                                                id="question-type"
                                                className={`form-control ${errors.question_type_id ? 'is-invalid' : ''}`}
                                                {...register('question_type_id', { required: 'Question type is required' })}
                                                onChange={(e) => setSelQuestion(e.target.value)}
                                            >
                                                <option value="">Select</option>
                                                {questionType.length > 0 && questionType.map((val) => (
                                                    <option key={val.id} value={val.id}>{val.title}</option>
                                                ))}
                                            </select>
                                            {errors.question_type_id && <span className="invalid-feedback">{errors.question_type_id.message}</span>}
                                        </div>
                                        {selQuestion === '5' && <MultipleChoiceOneAnswer formRegister={register} setValue={setValue} unregister={unregister} initialChoices={initialChoices} />}
                                        {selQuestion === '4' && <TrueFalse formRegister={register} setValue={setValue} />}
                                        {selQuestion === '6' && <MultipleChoiceMultiAnswer formRegister={register} setValue={setValue} />}
                                        <button type="submit" className="btn btn-primary btn-sm mx-2">Submit</button>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )

}
export default EditQuestion