import { useState } from "react";

function MultipleChoiceMultiAnswer({ formRegister, setValue, unregister, initialChoices }) {
  const [choices, setChoices] = useState(initialChoices && initialChoices.length > 0 ?
    initialChoices.map((choice, index) => ({
      id: index + 1,
      value: choice.value,
      correct: choice.isCorrect
    })) : [
      { id: 1, value: "", correct: false },
      { id: 2, value: "", correct: false },
      { id: 3, value: "", correct: false },
      { id: 4, value: "", correct: false }
    ]);


  const handleAdd = () => {
    // Add a new choice
    const newId = choices.length > 0 ? choices[choices.length - 1].id + 1 : 1;
    const newChoice = { id: newId, value: "", correct: false };
    setChoices(prevChoices => [...prevChoices, newChoice]);

    // Register new form fields
    setValue(`answer_options[${choices.length}]`, "");
    setValue(`correct_answer[${choices.length}]`, false);
  };
  const handleRemove = (choiceId) => {
    const updatedChoices = choices.filter(choice => choice.id !== choiceId);

    choices.forEach((_, index) => {
      unregister(`answer_options[${index}]`);
      unregister(`correct_answer[${index}]`);
    });

    setChoices(updatedChoices);

    updatedChoices.forEach((choice, index) => {
      setValue(`answer_options[${index}]`, choice.value);
      setValue(`correct_answer[${index}]`, choice.correct);
    });
  };
  const handleInputChange = (index, event) => {
    // Update the value of a choice
    const updatedChoices = [...choices];
    updatedChoices[index].value = event.target.value;
    setChoices(updatedChoices);
    setValue(`answer_options[${index}]`, event.target.value);
  };

  return (
    <>
      <ul>
        {choices.length !== 0 && choices.map((val, index) => (
          <li key={val.id} className="list-group-item">
            <div className="form-group mb-0">
              <label htmlFor={'answer_options' + val.id}>
                Choice {val.id}
              </label>
              <span style={{ float: 'right', color: 'red', fontWeight: '300' }} onClick={() => handleRemove(val.id)}>Remove</span>

              <input
                type='text'
                {...formRegister(`answer_options[${index}]`, { required: 'This field is required' })}
                className='form-control'
                id={'answer_options' + val.id}
                onChange={(event) => handleInputChange(index, event)}
              />
            </div>
            <div className="form-check mb-4">
              <input
                type='checkbox'
                {...formRegister(`correct_answer[${index}]`)}
                className='form-check-input'
                id={'correct_answer' + val.id}
              />
              <label className="form-check-label" htmlFor={'correct_answer' + val.id}>
                Check if correct
              </label>
            </div>
          </li>
        ))}
      </ul>
      <button type="button" className="btn btn-success btn-sm my-2" onClick={handleAdd}>
        Add Choice
      </button>
    </>
  );
}

export default MultipleChoiceMultiAnswer;
