import React from 'react';

const driver_id = [
    'ric', 'nor'
];


const Test = ({dataManager}) => {

    const test = dataManager.getDriverScores('ver');
    console.log(test);

    return (
        <p>
             Should be Ham: {test.eng}
        </p>
    )
}

export default Test;



{/* <p>{driver_id.map( (driver,index) => {
    return (`Driver ${index + 1}: ${driver}, `)
})}
</p> */}