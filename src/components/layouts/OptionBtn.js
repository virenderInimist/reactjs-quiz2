import React, { useState, useEffect, useRef } from 'react';
import axiosApi from '../../axiosApi';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function OptionBtn({ mainId, table, setData, options }) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    const toggleOptions = (e) => {
        e.stopPropagation();
        setIsOpen((prevIsOpen) => !prevIsOpen);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClick = (e, action, label) => {
        e.stopPropagation();
        if (label === 'Delete') {
            Swal.fire({
                title: 'Are you sure?',
                text: 'You won\'t be able to revert this!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    axiosApi.delete(action).then((res) => {
                        if (res.data === 'deleted') {
                            axiosApi.get('/' + table).then((result) => {
                                setData(result.data);
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Deleted!',
                                    text: 'The item has been deleted.',
                                    timer: 2000,
                                    timerProgressBar: true,
                                    showConfirmButton: false
                                });
                            });
                        }
                    }).catch((error) => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: 'Failed to delete item.',
                        });
                    });
                }
            });
        } else if (label === 'Edit') {
            if (table === 'quiz') {
                navigate('/edit-quiz', { state: { quizId: mainId } });
            } else if (table === 'question') {
                navigate('/edit-question', { state: { questionId: mainId } });
            }
        } else if (label === 'Report') {
            navigate('/result-report', { state: { quizId: mainId } });
        }
        setIsOpen(false); // Close the menu after action
    };

    return (
        <div className="option-button-container">
            <button
                type="button"
                className="option-button"
                onClick={(e) => toggleOptions(e)}
            >
                <i className="fas fa-list" title="view"></i>
            </button>
            {isOpen && (
                <div className="options-menu" ref={menuRef}>
                    <ul>
                        {options.map((option, index) => (
                            <li
                                key={index}
                                onClick={(e) => handleClick(e, option.action, option.label)}
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default OptionBtn;
