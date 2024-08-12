import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosApi from '../../axiosApi';
import SidebarS from '../layouts/SidebarS';

function Results() {
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const { quizId } = location.state || {};
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
            navigate('/');  // Redirect to home if no token
            return;
        }
        axiosApi.get('/quizAttempt/' + quizId).then((res) => {
            setData(res.data);
            setLoading(false);
        });
    }, [quizId, navigate]);

    const handlePrint = () => {
        const printContent = document.getElementById('printableTable').innerHTML;
        const originalContent = document.body.innerHTML;

        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContent;
        window.location.reload(); // Optional: Reload the page to restore original content
    };

    return (
        <div className="container my-5">
            {loading ? (
                <div className="loading-spinner">
                    <i className="fas fa-spinner fa-spin"></i>
                </div>
            ) : (
                <>
                    <div className='row'>
                        <div className='col-1'>
                            <SidebarS />
                        </div>
                        <div className='col-11'>
                            <div className="row mb-3">
                                <div className="col-11 d-flex justify-content-center align-items-center">
                                    <h4 className="text-center">Lists Of Respondents</h4>
                                </div>
                                <div className="col-1 d-flex justify-content-end">
                                    <button className="btn btn-secondary btn-sm border" onClick={handlePrint}>
                                        Print
                                    </button>
                                </div>
                            </div>

                            <div id="printableTable">
                                <table className="table table-bordered table-hover mt-3">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Correct Answer</th>
                                            <th>Total Questions</th>
                                            <th>Grade</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.length > 0 ? (
                                                data.map((val, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{val.name}</td>
                                                        <td>{val.email}</td>
                                                        <td>{val.correctquestions}</td>
                                                        <td>{val.totalquestions}</td>
                                                        <td>{val.result}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="6" className="text-center">No data available</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Results;
