import { useState, useEffect } from "react";

function MultipleChoiceOneAnswer({ formRegister, setValue, unregister, initialChoices }) {
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


    useEffect(() => {
        // Synchronize initial choices with form values
        choices.forEach((choice, index) => {
            setValue(`answer_options[${index}]`, choice.value);
            setValue(`correct_answer[${index}]`, choice.correct);
        });
    }, [choices, setValue]);

    const handleRemove = (choiceId) => {
        // Filter out the choice to be removed
        const updatedChoices = choices.filter(choice => choice.id !== choiceId);

        // Unregister form fields for the removed choice
        choices.forEach((_, index) => {
            unregister(`answer_options[${index}]`);
            unregister(`correct_answer[${index}]`);
        });

        setChoices(updatedChoices);

        // Re-register form fields with new indexes
        updatedChoices.forEach((choice, index) => {
            setValue(`answer_options[${index}]`, choice.value);
            setValue(`correct_answer[${index}]`, choice.correct);
        });
    };

    const handleAdd = () => {
        // Add a new choice
        const newId = choices.length > 0 ? choices[choices.length - 1].id + 1 : 1;
        const newChoice = { id: newId, value: "", correct: false };
        setChoices(prevChoices => [...prevChoices, newChoice]);

        // Register new form fields
        setValue(`answer_options[${choices.length}]`, "");
        setValue(`correct_answer[${choices.length}]`, false);
    };

    const handleInputChange = (index, event) => {
        // Update the value of a choice
        const updatedChoices = [...choices];
        updatedChoices[index].value = event.target.value;
        setChoices(updatedChoices);
        setValue(`answer_options[${index}]`, event.target.value);
    };

    const handleCheckboxChange = (index) => {
        // Deselect all other choices
        const updatedChoices = choices.map((choice, i) => ({
            ...choice,
            correct: i === index ? !choice.correct : false // Toggle the current choice, deselect others
        }));
        setChoices(updatedChoices);

        // Update form values for all choices based on updatedChoices
        updatedChoices.forEach((choice, i) => {
            setValue(`correct_answer[${i}]`, choice.correct);
        });
    };


    return (
        <>
            <h4 className="mx-4 my-5">Question Choices</h4>
            <ul>
                {choices.map((choice, index) => (
                    <li key={choice.id} className="list-group-item">
                        <div className="form-group mb-0">
                            <label htmlFor={`answer_options${choice.id}`}>
                                Choice {index + 1}
                            </label>
                            {choices.length > 1 && (
                                <span
                                    style={{ float: 'right', color: 'red', fontWeight: '300', cursor: 'pointer' }}
                                    onClick={() => handleRemove(choice.id)}
                                >
                                    Remove
                                </span>
                            )}
                            <input
                                type="text"
                                {...formRegister(`answer_options[${index}]`, { required: 'This field is required' })}
                                className='form-control'
                                id={`answer_options${choice.id}`}
                                value={choice.value}
                                onChange={(event) => handleInputChange(index, event)}
                            />
                        </div>
                        <div className="form-check mb-4">
                            <input
                                type="checkbox"
                                {...formRegister(`correct_answer[${index}]`)}
                                className='form-check-input'
                                id={`correct_answer${choice.id}`}
                                checked={choice.correct}
                                onChange={() => handleCheckboxChange(index)}
                            />
                            <label className="form-check-label" htmlFor={`correct_answer${choice.id}`}>
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

export default MultipleChoiceOneAnswer;
