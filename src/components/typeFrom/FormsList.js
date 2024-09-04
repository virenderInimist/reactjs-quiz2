import React, { useEffect, useRef, useState } from 'react';
import axiosApi from '../../axiosApi';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setQuizid } from '../../actions';

function FormsList() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const target = useRef();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
            navigate('/');  // Redirect to home if no token
            return;
        }
        axiosApi.get('/quiz').then((res) => {
            setData(res.data);
        }).finally(() => {
            setLoading(false);
        });

    }, [])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const DateComponent = ({ date }) => {
        return <span>{formatDate(date)}</span>;
    };


    const handleQuizClick = (e, id) => {
        // const text = document.getElementById('resource');
        // console.log(text.textContent, target.current.textContent);
        // return false;
        dispatch(setQuizid(id));
       // navigate('/edit-quiz', { state: { quizId: id } })
       navigate('/question-manager', { state: { quizId: id } })
    }

    const NoMessages = () => {
        return (
            <div className="alert  text-center m-3" role="alert">
                <i className="fas fa-exclamation-circle fa-2x mb-3"></i>
                <h4 className="alert-heading">Sorry</h4>
                <p>(No Quiz created yet)</p>
            </div>
        );
    };

    console.log(data);
    return (
        <div className="forms-list mt-3">
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                    <i className="fas fa-spinner fa-spin fa-3x"></i>
                </div>
            ) : (

                data.length && data.map((form, index) => (
                    <div key={index} className="d-flex justify-content-between align-items-center p-3 mb-3 bg-white shadow-sm rounded" onClick={(e) => handleQuizClick(e, form.id)}>
                        <div>
                            <h5 className="mb-0">{form.name}</h5>
                            <small>Updated: {<DateComponent date={form.created_at} />}</small>
                        </div>
                        <div className="d-flex">
                            <span className="me-3">Responses: {form.responses}</span>
                            <span className="me-3">Completion: {form.completion}</span>
                            <button className="btn btn-outline-secondary">⋮</button>
                        </div>
                    </div>
                ))

            )}
        </div>
    );
}

export default FormsList;
