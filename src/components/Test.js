import React from 'react';

const Test = ({dataManager}) => {

    const test = () => {
        const test = dataManager.getDriverScores('Ver');



        console.log(test);
    
    }
    
    test();

    return ( 
        <p>
             Should be Ham: 
        </p>
    )
}

export default Test;