import { useState } from "react"

function MultipleChoiceMultiAnswer({ formRegister, setValue }) {
  const [choices, setChoices] = useState([1, 2, 3, 4]);
  return (
    <>
      <ul>
        {choices.length !== 0 && choices.map((val, index) => (
          <li key={val} className="list-group-item">
            <div className="form-group mb-0">
              <label htmlFor={'answer_options' + val}>
                Choice {val}
              </label>
              <span style={{ float: 'right', color: 'red', fontWeight: '300' }}  >Remove</span>


              <input type='text' {...formRegister(`answer_options[${index}]`)} className='form-control' id={'answer_options' + val} />

            </div>
            <div className="form-check mb-4">
              <input type='checkbox'{...formRegister(`correct_answer[${index}]`)} className='form-check-input' id={'correct_answer' + val} />
              <label className="form-check-label" htmlFor={'correct_answer' + val}>check if correct</label>
            </div>
          </li>
        ))}
      </ul>

    </>
  )
}

export default MultipleChoiceMultiAnswer