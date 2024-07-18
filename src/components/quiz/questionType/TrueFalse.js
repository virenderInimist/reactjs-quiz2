import { useState } from "react";
function TrueFalse({ formRegister, setValue }) {
    const [choices, setChoices] = useState(true, false);

    return (
        <div>
            <div className="form-check">
                <input {...formRegister('correct_answer')} className="form-check-input" type="radio" id="trueOption" value="true" />
                <label className="form-check-label" htmlFor="trueOption">
                    True
                </label>
            </div>

            <div className="form-check">
                <input {...formRegister('correct_answer')} className="form-check-input" type="radio" id="falseOption" value="false" />
                <label className="form-check-label" htmlFor="falseOption">
                    False
                </label>
            </div>
        </div>
    )
}

export default TrueFalse