import { useEffect, useState } from "react"
import { areArraysEqual } from "../functions/arrayUtils";
import axiosApi from "../../axiosApi";
import { useLocation } from "react-router-dom";

function QuizReview() {
    const location = useLocation();
    const { quizAttemptId } = location.state || {};
    const [userReview, setUserReview] = useState({});

    useEffect(() => {
        axiosApi.get('/quizAttempt/show/' + quizAttemptId).then((res) => {
            setUserReview(res.data)
        })
    }, [])

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-8 offset-md-2 bg-light p-4 shadow rounded">
                        <h4 className="mb-4 text-center text-primary">Result: {userReview.correctquestions}/{userReview.totalquestions}</h4>

                        {userReview.question_attempt &&
                            userReview.question_attempt.map((opt, optIndex) => {
                                const questionsummary = opt.questionsummary.split(':');
                                const question = questionsummary[0];
                                const options = questionsummary[1].split(',');

                                if (opt.question.question_type_id != 6) {
                                    return (
                                        <div key={optIndex} className="mb-4">
                                            <h6 className="mb-3">{optIndex + 1}. {question}</h6>
                                            {options.map((option, optionIndex) => {

                                                let isCorrectAnswer = opt.rightanswer.trim() === option.trim();
                                                let isUserResponseCorrect = opt.rightanswer.trim() === opt.responsesummary.trim();
                                                let isUserSelectedOption = option.trim() === opt.responsesummary.trim();

                                                let bgColor = '';
                                                let optText = '';
                                                let sColor = '';

                                                if (isCorrectAnswer && isUserResponseCorrect) {
                                                    bgColor = 'bg-success'; // Correct answer selected by the user
                                                    optText = 'Your answer';

                                                } else if (isUserSelectedOption && !isUserResponseCorrect) {
                                                    bgColor = 'bg-danger'; // Wrong answer selected by the user
                                                    optText = 'Your answer';

                                                } else if (isCorrectAnswer && !isUserResponseCorrect) {
                                                    sColor = '#e6ffe6'; // Correct answer not selected by the user
                                                    optText = 'Correct'
                                                }

                                                return (
                                                    <div key={optionIndex} className={`d-flex align-items-center p-2 mb-2 ${bgColor}`} style={{ background: sColor }}>
                                                        <div className="flex-grow-1">
                                                            <span className={isUserSelectedOption ? 'font-weight-bold' : ''}>{option}</span>
                                                        </div>
                                                        {optText && (
                                                            <div className="text-center pl-3" style={{ background: 'rgba(0, 0, 0, 0.2)', width: '100px' }}>
                                                                {optText}
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                } else {
                                    { console.log( opt.rightanswer.split(',')) }
                                    return (
                                        <div key={optIndex} className="mb-4">
                                            <h6 className="mb-3">{optIndex + 1}. {question}</h6>
                                            {options.map((option, optionIndex) => {

                                                let userResponse = opt.responsesummary.split(',');
                                                let correctAnswers = opt.rightanswer.split(',');

                                                let bgColor = '';
                                                let optText = '';
                                                let sColor = '';

                                                if (userResponse.includes(option) && areArraysEqual(userResponse, correctAnswers)) {//All right answers
                                                    bgColor = 'bg-success';
                                                    optText = 'Your answer'
                                                } else if (userResponse.includes(option) && !correctAnswers.includes(option)) {//if any of option is wrong chossen
                                                    bgColor = 'bg-danger';
                                                    optText = 'Your answer'
                                                } else if (userResponse.includes(option) && correctAnswers.includes(option)) {//if any option is right
                                                    bgColor = 'bg-success';
                                                    optText = 'Your answer'
                                                }
                                                if (!userResponse.includes(option) && correctAnswers.includes(option)) { // Correct answer not selected by the user
                                                    sColor = '#e6ffe6';
                                                    optText = 'Correct'
                                                }
                                                return (
                                                    <div key={optionIndex} className={`d-flex align-items-center p-2 mb-2 ${bgColor}`} style={{ background: sColor }}>
                                                        <div className="flex-grow-1">
                                                            <span className={userResponse.includes(option) ? 'font-weight-bold' : ''}>{option}</span>
                                                        </div>
                                                        {optText && (
                                                            <div className="text-center pl-3" style={{ background: 'rgba(0, 0, 0, 0.2)', width: '100px' }}>
                                                                {optText}
                                                            </div>
                                                        )}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )
                                }
                            })}

                    </div>
                </div>
            </div >
        </>
    );
}

export default QuizReview;