import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '../layouts/Sidebar'
import axiosApi from '../../axiosApi';
import '@fortawesome/fontawesome-free/css/all.min.css';
import OptionBtn from '../layouts/OptionBtn';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setQuizid } from '../../actions';


function Home() {
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
            setLoading(false);
        })

    }, [])

    const NoMessages = () => {
        return (
            <div className="alert  text-center m-3" role="alert">
                <i className="fas fa-exclamation-circle fa-2x mb-3"></i>
                <h4 className="alert-heading">Sorry</h4>
                <p>(No Quiz created yet)</p>
            </div>
        );
    };

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
        navigate('/edit-quiz', { state: { quizId: id } })
    }

    return (
        <>
            <div className='container-fluid my-2'>

                <div className='row'>

                    <div className='col-2'>
                        <Sidebar />
                    </div>
                    <div className='col-10'>
                        <div className='container my-2'>
                            <div className='row'>
                                <div className="col-md-8" ref={target}> <b id="resource">My Quizzes: <span className='text-muted'>({data.length})</span></b> </div>
                                <div className="col-md-4  text-md-end">
                                    <Link to="/new-quiz" className='btn btn-success'><i className="fa fa-plus" aria-hidden="true" style={{ border: '1px solid black', padding: '5px', borderRadius: '50%' }}></i> New Quiz</Link>
                                </div>
                                {loading ? (
                                    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                                        <i className="fas fa-spinner fa-spin fa-3x"></i>
                                    </div>
                                ) : (
                                    data.length ? (
                                        data.map((item, index) => (
                                            <div key={index} className='col-md-6 mt-2'>
                                                <div className='card shadow-sm mb-4' onClick={(e) => handleQuizClick(e, item.id)}>
                                                    <div className='card-body'>
                                                        <div className='text-muted d-flex justify-content-between'>
                                                            <span>CREATED: <DateComponent date={item.created_at} /></span>
                                                            <span className='ml-auto'>{<OptionBtn mainId={item.id} table="quiz" setData={setData} options={[
                                                                { label: 'Edit', action: '/quiz/edit/' + item.id },
                                                                { label: 'Delete', action: '/quiz/delete/' + item.id },
                                                                { label: 'Report', action: '/quiz/Report/' + item.id },
                                                            ]} />}</span>
                                                        </div>
                                                        <h5 className='card-title fw-bold'>{item.name}</h5>
                                                        <h6 className='card-subtitle mb-2 text-muted'>{item.description}</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <NoMessages />
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home