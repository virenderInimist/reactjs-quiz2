import React, { useEffect, useState } from 'react';
import axiosApi from '../../axiosApi';
import SidebarS from '../layouts/SidebarS';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import OptionBtn from '../layouts/OptionBtn';
import { useSelector } from 'react-redux';
import { selectQuizId } from '../../selectors';
import Swal from 'sweetalert2';
import { Base64 } from 'js-base64';

function QuestionBank() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit } = useForm();
  const quizId = useSelector(selectQuizId);
  const [quizData, setQuizData] = useState({});
  const [quizLink, setQuizLink] = useState('');
  const defaultValues = quizData.quiz_slots ? quizData.quiz_slots.map(slot => slot.question_id) : [];
  const navigate = useNavigate();

  useEffect(() => {

    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      navigate('/');  // Redirect to home if no token
      return;
    }
    axiosApi.get(`/quiz/show/${quizId}`).then((res) => {
      setQuizData(res.data);
    });
  }, [quizId]);

  useEffect(() => {
    axiosApi.get(`/quiz-question/${quizId}`).then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, [quizId]);

  const onSubmit = (e) => {
    setLoading(true);
    const updatedData = {
      ...e,
      name: quizData.name,
      description: quizData.description,
      minpassquestions: quizData.minpassquestions,
    };
    if (updatedData['question_ids'].length) {
      axiosApi.put(`/quiz/update/${quizId}`, updatedData).then((res) => {
        setQuizData(res.data);
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "Successful",
          text: "Quiz Saved",
        });
      }).catch(() => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Sorry, some error occurred. Please try again later!",
        });
      });
    } else {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please select at least one question!",
      });
    }
  }

  const handleNavigate = () => {
    const encodedQuizId = Base64.encode(quizId);
    const serverUrl = process.env.REACT_APP_BASE_URL;
    const link = `${serverUrl}/quiz/${encodedQuizId}`;
    setQuizLink(link);
  }

  const renderCont = (res, index) => {
    const options = res.question_answers.answer_options.split(',');
    return options.map((opt, optionIndex) => {
      if (res.question_type.id !== '6') {
        return (
          <div className="form-check" key={optionIndex}>
            <input
              type='radio'
              value={opt}
              id={`option${index}_${optionIndex}`}
              disabled="disabled" />
            <label className="form-check-label" htmlFor={`option${index}_${optionIndex}`}>
              {opt}
            </label>
          </div>
        );
      } else {
        return (
          <div className="form-check" key={optionIndex}>
            <input
              type='checkbox'
              value={opt}
              id={`option${index}_${optionIndex}`}
              disabled="disabled" />
            <label className="form-check-label" htmlFor={`option${index}_${optionIndex}`}>
              {opt}
            </label>
          </div>
        );
      }
    });
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className='col-1'>
          <SidebarS />
        </div>
        <div className='col-11'>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <button onClick={handleNavigate} className="btn btn-info">Quiz Link</button>
            <h2>Question Manager</h2>
            <Link className="btn btn-success ml-auto" to="/add-question">Add Question</Link>
          </div>
          {quizLink && (
            <p>
              Quiz Link: <Link to={quizLink}>{quizLink}</Link>
            </p>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <button type="submit" className="btn btn-primary mt-2 w-25 question-submit-btn">Submit</button>
            {loading ? (
              <div className="loading-spinner">
                <i className="fas fa-spinner fa-spin"></i>
              </div>
            ) : (
              data.length ? (
                data.map((val, index) => (
                  <div key={index}>
                    <div className="card my-2">
                      <div className="card-body">
                        <div className='text-muted d-flex justify-content-between mb-2'>
                          <label className="customcheck">Q. {index + 1}
                            <input
                              type="checkbox"
                              value={val.id}
                              {...register('question_ids', { type: 'array' })}
                              defaultChecked={defaultValues.includes(val.id)}
                            />
                            <span className="checkmark"></span>
                          </label>
                          <OptionBtn
                            mainId={val.id}
                            table="question"
                            setData={setData}
                            options={[
                              { label: 'Edit', action: '/question/edit/' + val.id },
                              { label: 'Delete', action: '/question/delete/' + val.id },
                            ]}
                          />
                        </div>
                        <p className="card-text ms-4">{val.title}</p>
                        {renderCont(val, index)}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <>No Data</>
              )
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default QuestionBank;
