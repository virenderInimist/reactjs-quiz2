import { useEffect, useState } from 'react';
import axiosApi from '../../axiosApi';
import { useForm } from 'react-hook-form';
import MultipleChoiceOneAnswer from './questionType/MultipleChoiceOneAnswer';
import TrueFalse from './questionType/TrueFalse';
import MultipleChoiceMultiAnswer from './questionType/MultipleChoiceMultiAnswer';
import Sidebar from '../layouts/Sidebar';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { selectQuizId } from '../../selectors';

function AddQuestion() {
    const [loading, setLoading] = useState(true);
    const { register, handleSubmit, formState: { errors }, setValue, unregister } = useForm();
    const [questionType, setQuestionType] = useState([]);
    const [selQuestion, setSelQuestion] = useState();
    const navigate = useNavigate();
    const quizId = useSelector(selectQuizId);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
            navigate('/');  // Redirect to home if no token
            return;
        }
    })

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
        data.quiz_id = quizId;
        if (data.answer_options) {
            choices = arrayCombine(data.answer_options, data.correct_answer);
        }
        if (data.question_type_id == 4) {
            data.answer_options = ['true', 'false'];
        }

        if (data.question_type_id == 5 || data.question_type_id == 6) {
            const answer = Object.entries(choices)
                .filter(([key, value]) => value === true)
                .map(([key]) => key).join(', ');
            data.correct_answer = answer;
        }

        if (data.correct_answer == '') {
            Swal.fire({
                icon: "error",
                title: "you should choose an correct answer!",
                //html: '<b>Result :' + res.data.correctquestions + '/' + res.data.totalquestions + '</b>',
                //footer: '<a href="#">Why do I have this issue?</a>'
            });
            return;
        }
        axiosApi.post('/question/create', data).then((res) => {
            if (res.data) {
                Swal.fire({
                    icon: "success",
                    title: "Question added succesfully",
                    //footer: '<a href="#">Why do I have this issue?</a>'
                }).then(() => {
                    navigate('/question-manager');
                });
            }
        });
    };

    useEffect(() => {
        axiosApi.get('questionType').then((res) => {
            setQuestionType(res.data);
        });
        setLoading(false);
    }, []);

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
                                    <h3>Add Question</h3>
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
                                                {...register('description', { required: 'Description is required' })}
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
                                        {selQuestion === '5' && <MultipleChoiceOneAnswer formRegister={register} setValue={setValue} unregister={unregister} />}
                                        {selQuestion === '4' && <TrueFalse formRegister={register} setValue={setValue} />}
                                        {selQuestion === '6' && <MultipleChoiceMultiAnswer formRegister={register} setValue={setValue} />}
                                        <button type="submit" className="btn btn-primary mx-2 btn-sm">Submit</button>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddQuestion;
