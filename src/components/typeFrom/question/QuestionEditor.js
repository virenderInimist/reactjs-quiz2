import Swal from 'sweetalert2';
import MultipleChoiceMultiAnswer from '../../quiz/questionType/MultipleChoiceMultiAnswer';
import MultipleChoiceOneAnswer from '../../quiz/questionType/MultipleChoiceOneAnswer';
import TrueFalse from '../../quiz/questionType/TrueFalse';
import './QuestionEditor.css';
import axiosApi from '../../../axiosApi';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function QuestionEditor({ register, setValue, unregister, handleSubmit, question, initialChoices, questionType }) {
    const navigate = useNavigate();

    useEffect(() => {
        // Unregister any excess choices when the component renders or questionType changes
        if (initialChoices && initialChoices.length < 4) {
            for (let i = initialChoices.length; i < 4; i++) {
                unregister(`answer_options[${i}]`);
                unregister(`correct_answer[${i}]`);
            }
        }
    }, [initialChoices, unregister]);

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

        axiosApi.put('/question/update/' + question.id, data).then((res) => {
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
    console.log(initialChoices);
    return (

        <>
            {initialChoices ? (
                <div className="question-editor">
                    <h6 className="question-title">1.{question?.title}</h6>
                    <form className="custom-form p-4" onSubmit={handleSubmit(onSubmit)}>
                        {questionType === 5 && <MultipleChoiceOneAnswer formRegister={register} setValue={setValue} unregister={unregister} initialChoices={initialChoices} />}
                        {questionType === 4 && <TrueFalse formRegister={register} setValue={setValue} />}
                        {questionType === 6 && <MultipleChoiceMultiAnswer formRegister={register} setValue={setValue} />}
                        <button type="submit" className="btn btn-primary btn-sm mx-2">Submit</button>
                    </form>
                </div>
            ) : (
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Sorry!</strong> This is a warning message.
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            )}
        </ >

    );
}

export default QuestionEditor;
