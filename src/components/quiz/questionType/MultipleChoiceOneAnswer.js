import { useState, useEffect } from "react";

function MultipleChoiceOneAnswer({ formRegister, setValue, unregister, initialChoices }) {console.log(initialChoices);
    // Initialize choices state, allowing it to reset when initialChoices changes
    const [choices, setChoices] = useState([]);

    useEffect(() => {
        if (initialChoices && initialChoices.length > 0) {
            setChoices(initialChoices.map((choice, index) => ({
                id: index + 1,
                value: choice.value,
                correct: choice.isCorrect,
            })));
        } else {
            setChoices([
                { id: 1, value: "", correct: false },
                { id: 2, value: "", correct: false },
                { id: 3, value: "", correct: false },
                { id: 4, value: "", correct: false },
            ]);
        }
    }, [initialChoices]); // Re-run when initialChoices changes

    // Register form fields whenever choices change
    useEffect(() => {
        choices.forEach((choice, index) => {
            setValue(`answer_options[${index}]`, choice.value);
            setValue(`correct_answer[${index}]`, choice.correct);
        });
    }, [choices, setValue]);

    const handleRemove = (choiceId) => {
        // Remove the choice and unregister corresponding form fields
        const updatedChoices = choices.filter(choice => choice.id !== choiceId);
        setChoices(updatedChoices);

        // Update form fields after removing a choice
        updatedChoices.forEach((_, index) => {
            setValue(`answer_options[${index}]`, updatedChoices[index].value);
            setValue(`correct_answer[${index}]`, updatedChoices[index].correct);
        });
    };

    const handleAdd = () => {
        const newId = choices.length > 0 ? choices[choices.length - 1].id + 1 : 1;
        const newChoice = { id: newId, value: "", correct: false };
        setChoices(prevChoices => [...prevChoices, newChoice]);

        // Register new form fields
        setValue(`answer_options[${choices.length}]`, "");
        setValue(`correct_answer[${choices.length}]`, false);
    };

    const handleInputChange = (index, event) => {
        const updatedChoices = [...choices];
        updatedChoices[index].value = event.target.value;
        setChoices(updatedChoices);
        setValue(`answer_options[${index}]`, event.target.value);
    };

    const handleCheckboxChange = (index) => {
        const updatedChoices = choices.map((choice, i) => ({
            ...choice,
            correct: i === index ? !choice.correct : false,
        }));
        setChoices(updatedChoices);

        updatedChoices.forEach((choice, i) => {
            setValue(`correct_answer[${i}]`, choice.correct);
        });
    };

    return (
        <>
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
