import React, { useState } from 'react';

function Calculator() {
  const [value, setValue] = useState('0');
  const [memory, setMemory] = useState(null);
  const [operation, setOperation] = useState(null);

  // Function to handle number clicks
  const handleNumberClick = (number) => {
    if (value === '0' && number !== '.') {
      setValue(number.toString());
    } else {
      setValue(value + number.toString());
    }
  };

  // Function to handle operation clicks
  const handleOperationClick = (op) => {
    setMemory(value);
    setOperation(op);
    setValue('0');
  };

  // Function to handle equals
  const handleEquals = () => {
    const num1 = parseFloat(memory);
    const num2 = parseFloat(value);
    let result;
    switch (operation) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
        result = num1 * num2;
        break;
      case '/':
        result = num1 / num2;
        break;
      default:
        result = 0;
    }
    setValue(result.toString());
    setMemory(null);
    setOperation(null);
  };

  // Function to handle clear
  const handleClear = () => {
    setValue('0');
    setMemory(null);
    setOperation(null);
  };

  return (
    <div className="calculator">
      <input type="text" value={value} readOnly />
      <div className="buttons">
        <button onClick={() => handleNumberClick(7)}>7</button>
        <button onClick={() => handleNumberClick(8)}>8</button>
        <button onClick={() => handleNumberClick(9)}>9</button>
        <button onClick={() => handleOperationClick('/')}>/</button>
        <button onClick={() => handleNumberClick(4)}>4</button>
        <button onClick={() => handleNumberClick(5)}>5</button>
        <button onClick={() => handleNumberClick(6)}>6</button>
        <button onClick={() => handleOperationClick('*')}>*</button>
        <button onClick={() => handleNumberClick(1)}>1</button>
        <button onClick={() => handleNumberClick(2)}>2</button>
        <button onClick={() => handleNumberClick(3)}>3</button>
        <button onClick={() => handleOperationClick('-')}>-</button>
        <button onClick={() => handleNumberClick(0)}>0</button>
        <button onClick={() => handleNumberClick('.')}>.</button>
        <button onClick={handleEquals}>=</button>
        <button onClick={() => handleOperationClick('+')}>+</button>
        <button onClick={handleClear}>C</button>
      </div>
    </div>
  );
}

export default Calculator;