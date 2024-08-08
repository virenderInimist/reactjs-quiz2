import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axiosApi from '../../axiosApi';
import { useNavigate, useParams } from 'react-router-dom';
import { Base64 } from 'js-base64';
import { Modal, Button } from 'react-bootstrap';

function AttemptQuiz() {
  const [loading, setLoading] = useState(true);
  const { encodedQuizId } = useParams();
  const [quizId, setQuizId] = useState('');
  const [quizData, setQuizData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [decodeError, setDecodeError] = useState(false);
  const { quiz_slots } = quizData;
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const decodedId = Base64.decode(encodedQuizId);
      setQuizId(decodedId);
    } catch (error) {
      setDecodeError(true);
    }
  }, [encodedQuizId]);

  useEffect(() => {
    if (quizId) {
      axiosApi.get(`/quiz/show/${quizId}`).then((res) => {
        setQuizData(res.data);
        setLoading(false);
      });
    }
  }, [quizId]);

  const handleQuizAttempt = (data) => {
    console.log(data);
    setShowModal(true);
    setValue('quiz_id', quizId);
    setValue('questionAttempt', data.questionAttempt);
  };

  const handleModalSubmit = () => {
    if (name && email) {
      const data = {
        name,
        email,
        quiz_id: quizId,
        questionAttempt: getValues('questionAttempt')
      };

      axiosApi.post('/quizAttempt/create', data).then((res) => {
        navigate('/result', { state: { quizAttemptId: res.data.id, name, email } });
      });
    } else {
      alert("Please fill in both name and email address.");
    }
  };

  const renderCont = (res) => {
    const options = res.question.question_answers.answer_options.split(',');
    return options.map((opt, optIndex) => {
      if (res.question.question_type.id !== 6) {
        // Render radio buttons
        return (
          <div key={optIndex} className="form-check">
            <input
              type="radio"
              className="form-check-input"
              value={opt}
              {...register(`questionAttempt[${res.question.id}]`)}
            />
            <label className="form-check-label ms-1">{opt}</label>
          </div>
        );
      } else {
        // Render checkboxes
        return (
          <div key={optIndex} className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              value={opt}
              {...register(`questionAttempt[${res.question.id}]`)}
            />
            <label className="form-check-label ms-1">{opt}</label>
          </div>
        );
      }
    });
  };

  if (decodeError) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger" role="alert">
          Invalid quiz link. Please check the URL and try again.
        </div>
      </div>
    );
  }


  return (
    <div className="container my-5">
      {loading ? (
        <>
          <div className="loading-spinner">
            <i className="fas fa-spinner fa-spin"></i>
          </div>
          <p className=" alert alert-warning text-center" role="alert">If question not loaded then there may be no quesion in quiz right now to attempt.</p>
        </>
      ) : (
        <>
          {quiz_slots && quiz_slots[0]?.question ? (
            <div className="quiz-container p-4 rounded shadow">
              <h2 className="text-center mb-4">Quiz</h2>
              <form onSubmit={handleSubmit(handleQuizAttempt)}>
                <input type="hidden" {...register('quiz_id')} value={quizId} />

                {quiz_slots && quiz_slots.map((res, index) => (
                  <div key={res.question.id} className="mb-4 question-container">
                    <h5 className="question-title">Q.{index + 1}: {res.question.title}</h5>
                    <div className="options-container ms-3 mt-2">
                      {renderCont(res)}
                    </div>
                  </div>
                ))}
                <div className="text-center">
                  <button type="submit" className="btn btn-primary mt-3 w-50">Submit</button>
                </div>
              </form>
            </div>) : (
            <div className="alert alert-warning text-center mt-5" style={{ padding: '30px', borderRadius: '10px' }}>
              <h4>Sorry!</h4>
              <p>There are no questions available to attempt at this time.</p>
            </div>
          )
          }
        </>
      )
      }
      < Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleModalSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

    </div >
  );
}

export default AttemptQuiz;
