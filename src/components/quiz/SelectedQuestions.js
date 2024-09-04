import { useEffect, useState } from "react";
import axiosApi from "../../axiosApi";
import { useSelector } from "react-redux";
import { selectQuizId } from "../../selectors";
import Sidebar from "../layouts/Sidebar";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function SelectedQuestions() {
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
    <div className="container-fluid">
      <div className="row">

        <div className="col-2">
          <Sidebar />
        </div>

        <div className="col-10">
          <div className="container-fluid mt-4">
            <div className="row">
              {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                  <i className="fas fa-spinner fa-spin fa-3x"></i>
                </div>
              ) : (
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="questions">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="col-md-12"
                      >
                        { data.quiz_slots.length !== 0 ? data.quiz_slots.map((slot, index) => (
                          <Draggable key={slot.id} draggableId={slot.id.toString()} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="col-md-12 mb-4"
                              >
                                <div className="card">
                                  <div className="card-body">
                                    <h6 className="card-title">Q.{index + 1} {slot.question.title}</h6>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        )) :
                          <div class="alert alert-warning" role="alert">
                           Sorry! No Questions To Show.
                          </div>
                        }
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              )}
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default SelectedQuestions;
