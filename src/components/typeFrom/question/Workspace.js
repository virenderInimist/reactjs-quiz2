import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import QuestionEditor from './QuestionEditor';
import ContentSettings from './ContentSettings';
import './Workspace.css';
import { useSelector } from 'react-redux';
import { selectQuizId } from '../../../selectors';
import axiosApi from '../../../axiosApi';
import { useForm } from 'react-hook-form';

function Workspace() {
    const [loading, setLoading] = useState(true);
    const [question, setQuestion] = useState();
    const quiz_id = useSelector(selectQuizId);
    const [questionType, setQuestionType] = useState([]);
    const [initialChoices, setInitialChoices] = useState([]);
    const { register, handleSubmit, formState: { errors }, setValue, unregister } = useForm({
        defaultValues: {
            title: '',
            description: ''
        }
    });

    useEffect(() => {
        axiosApi.get('/quiz-question/' + quiz_id).then((res) => {
            setQuestion(res.data.question);
            const answerOptionsArray = res.data.question?.question_answers.answer_options.split(',');
            const correctAnswer = res.data.question?.question_answers.correct_answer;
            const choices = answerOptionsArray?.map(option => ({
                value: option,
                isCorrect: option === correctAnswer
            }));
            setQuestionType(res.data.question?.question_type_id)
            setInitialChoices(choices); // Set the state with mapped choices
            setLoading(false);
        })
    }, [])


    const handleQuestionClick = (questionId) => {
        try {
            axiosApi.get('/question/edit/' + questionId).then((res) => {
                setQuestion(res.data);
                setValue('title', res.data.title);
                setValue('description', res.data.description);
                setValue('question_type_id', res.data.question_type_id);
                setValue('questionAnswerId', res.data.question_answers.id);
                setQuestionType(res.data.question_type_id);
                if (res.data.question_answers) {
                    const answerOptionsArray = res.data.question_answers.answer_options.split(',');
                    const correctAnswer = res.data.question_answers.correct_answer;

                    setInitialChoices(answerOptionsArray.map(option => ({
                        value: option,
                        isCorrect: option === correctAnswer
                    })));
                }
            })

            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const handleAddQuestionClick = () =>{
        setInitialChoices(undefined);
    }

    return (
        loading ? (
            <div className="loading-spinner">
                <i className="fas fa-spinner fa-spin"></i>
            </div>
        ) : (
            <div className="workspace">
                <Sidebar handleQuestionClick={handleQuestionClick} handleAddQuestionClick={handleAddQuestionClick} />
                <div className="main-content">
                    <Header />
                    <div className="content-area">
                        <QuestionEditor register={register} setValue={setValue} unregister={unregister} handleSubmit={handleSubmit} question={question} initialChoices={initialChoices} questionType={questionType} />
                    </div>
                </div>
                <ContentSettings />
            </div>
        )
    );
}

export default Workspace;
