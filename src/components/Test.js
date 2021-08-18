import React from 'react';

const Test = ({number,handleTest}) => {


    return ( 
        <div>
        <button onClick={() => handleTest(5)}>
            Test
        </button>
        <p>
            {number}
        </p>
        </div>
    )
}

export default Test;