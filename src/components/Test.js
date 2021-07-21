import React from 'react';

const Test = ({dataManager}) => {

    const test = dataManager.getTeamScores(2);
    console.log(test);

    return (
        <p>
             Should be Ham: {test.eng}
        </p>
    )
}

export default Test;