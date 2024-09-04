import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import axiosApi from '../../../axiosApi';
import { useSelector } from 'react-redux';
import { selectQuizId } from '../../../selectors';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function Sidebar({handleQuestionClick}) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();
    const quizId = useSelector(selectQuizId);

    useEffect(() => {
        axiosApi.get('selQuestions/' + quizId).then((res) => {
            setData(res.data);
            setLoading(false);
        });
    }, [quizId]);

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(data.quiz_slots);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setData({ ...data, quiz_slots: items });

        axiosApi.post('/updateQuestionOrder', {
            quizId,
            quiz_slots: items.map((slot, index) => ({
                id: slot.id,
                slot: index + 1
            }))
        });
    };

    
    return (
        <div className="sidebar bg-white border-right">
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="questions">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="questions-list"
                        >
                            {!loading && data?.quiz_slots.length > 0 ? (
                                data.quiz_slots.map((slot, index) => (
                                    <Draggable key={slot.id} draggableId={slot.id.toString()} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="question-item mb-2"
                                                onClick={() => handleQuestionClick(slot?.question_id)}
                                            >
                                                <div className="icon badge bg-info text-white d-flex align-items-center justify-content-center">
                                                    {index + 1}
                                                </div>
                                                <span className="ms-3">{slot.question.title}</span>
                                            </div>
                                        )}
                                    </Draggable>
                                ))
                            ) : (
                                <div className="loading-spinner">
                                    <i className="fas fa-spinner fa-spin"></i>
                                </div>
                            )}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <button className="btn btn-outline-secondary w-100 mt-4">+ Add content</button>
        </div>
    );
}

export default Sidebar;
