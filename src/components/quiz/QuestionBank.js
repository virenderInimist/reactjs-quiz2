import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import axiosApi from '../../axiosApi';
import SidebarS from '../layouts/SidebarS';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import OptionBtn from '../layouts/OptionBtn';

function QuestionBank() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { register } = useForm();

  useEffect(() => {
    axiosApi.get('/question').then((res) => {
      setData(res.data);
      setLoading(false);
    })
  }, [])


  const renderCont = (res, index) => {
    const options = res.question_answers.answer_options.split(',');
    return options.map((opt, optionIndex) => {
      if (res.question_type.id != '6') {
        // Render radio buttons
        return (
          <div className="form-check" key={optionIndex}>
            <input
              type='radio'
              value={opt} id={`option${index}_${optionIndex}`}
              {...register(`questionAttempt[${res.id}]`)}
              disabled="disabled" />
            <label className="form-check-label" htmlFor={`option${index}_${optionIndex}`} >
              {opt}
            </label>
          </div>
        );
      } else {
        // Render checkboxes
        return (
          <div className="form-check" key={optionIndex}>
            <input
              type='checkbox'
              value={opt} id={`option${index}_${optionIndex}`}
              {...register(`questionAttempt[${res.id}]`)}
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
    <>

      <div className="container-fluid">
        <div className="row">

          <div className='col-1'>
            <SidebarS />
          </div>
          <div className='col-11'>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2>Question Manager</h2>
              <Link className="btn btn-success ml-auto" to="/add-question">Add Question</Link>
            </div>
            {loading ? (
              // Show loading spinner while data is being fetched
              <div className="loading-spinner">
                <i className="fas fa-spinner fa-spin"></i>
              </div>
            ) : (
              data.length ? (
                data.map((val, index) => {
                  return (
                    <div key={index}>
                      <div className="card my-2">
                        <div className="card-body">
                          <div className='text-muted d-flex justify-content-between'>
                            <h5 className="card-title">Q. {index + 1}</h5>
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
                          <p className="card-text">{val.title}</p>
                          {renderCont(val, index)}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <>No Data</>
              )
            )}


          </div>
        </div >
      </div >
    </>
  )
}

export default QuestionBank