import React, { useState } from "react";

const Counter = props => {
    const [number, setNumber] = useState(0);
    const [num2, setNum2] = useState();

    const handleOnClick = type => {
        const parsedNumber = Number(number);
        const parsedNum2 = Number(num2);
        if (type === "+") {
            setNumber(parsedNumber + parsedNum2);
        } else {
            setNumber(parsedNumber - parsedNum2);
        }
    };

    const handleOnChange = e => {
        const opNumber = e.target.value;
        setNum2(opNumber);
    };

    return (
        <div>
            <h1>Este es el componente counter</h1>
            <h3> El valor es: {number} </h3>
            <input value={num2} onChange={handleOnChange} type="number" />
            <br />
            <button
                onClick={function () {
                    handleOnClick("+");
                }}
            >
                Sumar {num2}
            </button>
            <button
                onClick={function () {
                    handleOnClick("-");
                }}
            >
                Restar {num2}
            </button>
            <button
                onClick={() => {
                    setNum2("");
                    setNumber(0);
                }}
            >
                Reset
            </button>
        </div>
    );
};

export default Counter;
