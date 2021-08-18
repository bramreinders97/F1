import React, { useState, useEffect } from 'react';
import Test from './Test';
import Table from './Table';


const TableHead = ( {dataManager} ) => {
    
    // const [stateTest,setStateTest] = useState(4)
    
    // //test function
    // const handleTest = (i) => {
    //     setStateTest(i);
    //     console.log('clicked')
    // }

    // useEffect( () => {
    // }, [ stateTest ] );

    const [teamsObj, setTeamsObj] = useState( dataManager.getTeamIds(15) );
    
    const allRacesArray = dataManager.getRaceArray();  //i keep this because otherwise i have to loop over Object.keys two times which seems inefficient
    const [allRacesObj, setAllRacesObj] = useState( dataManager.getRaceObj() );

    const handleClickHeader = (race) => {
        const newBooleanValue = ! allRacesObj[race];
        
        let newRaceObj = {...allRacesObj};
        newRaceObj[race] = newBooleanValue;        
        setAllRacesObj(newRaceObj);

        let newTeamsObj = [...teamsObj];
        newTeamsObj.forEach( team => {
            team[race] = newBooleanValue;
        });
        setTeamsObj(newTeamsObj);
    }

    const handleClickCell = (team, race) => {
        const index = teamsObj.indexOf(team);
        let newTeamsObj = [...teamsObj];
        newTeamsObj[index][race] = ! newTeamsObj[index][race];
        setTeamsObj(newTeamsObj);
    }

    useEffect( () => {
        // console.log('allRacesObj',allRacesObj);
        // console.log('team 2',teamsObj[0]);
        // console.log('team 1',teamsObj[1]);
    }, [ allRacesObj, teamsObj ] );


    return ( 
        // <Test number={stateTest} handleTest={handleTest}/>
        
        <Table 
            dataManager={dataManager}
            teamsObj={teamsObj}
            allRacesArray={allRacesArray}
            allRacesObj={allRacesObj}
            handleClickHeader={handleClickHeader}
            handleClickCell={handleClickCell}
        />
        
    )
}

export default TableHead;