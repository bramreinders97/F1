import React, { useState, useEffect } from 'react';
import Test from './Test';
import * as ReactBootStrap from 'react-bootstrap';
import Table from './Table';


const TableHead = ( {dataManager} ) => {
    
    const [nmbrTeamsToShow, setNmbrTeamsToShow] = useState(15);
    const [teamsObj, setTeamsObj] = useState( dataManager.getTeamIds(nmbrTeamsToShow) );
    
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
            const team_scores = dataManager.getTeamScores(team.team_id); 
            team.avg = dataManager.getAverage(team,team_scores);    
        });
        setTeamsObj(newTeamsObj);
    }

    const handleClickCell = (team, race, team_scores) => {  
        const index = teamsObj.indexOf(team);
        let newTeamsObj = [...teamsObj];
        newTeamsObj[index][race] = ! newTeamsObj[index][race];
        newTeamsObj[index].avg = dataManager.getAverage(newTeamsObj[index],team_scores);  
        setTeamsObj(newTeamsObj);
    }

    const handleClickTeam = (team) => {
        const index = teamsObj.indexOf(team);
        let newTeamsObj = [...teamsObj];
        newTeamsObj[index].selected = ! newTeamsObj[index].selected;
        setTeamsObj(newTeamsObj);
    }

    const handleButtonClick = (operation) => {
        const old_value = nmbrTeamsToShow;
        setNmbrTeamsToShow(old_value + operation);
    }

    useEffect( () => {
        setTeamsObj(dataManager.getTeamIds(nmbrTeamsToShow))
    }, [ nmbrTeamsToShow, dataManager ] ); //dataManager not really nacessary but to silence the warning

    useEffect( () => {
    }, [ allRacesObj, teamsObj ] );


    return ( 
        <React.Fragment>
                    
        <ReactBootStrap.Button variant='primary' onClick={() => handleButtonClick(1)}>
            +
        </ReactBootStrap.Button>
        <ReactBootStrap.Button variant='warning' onClick={() => handleButtonClick(-1)}>
            -
        </ReactBootStrap.Button>
        
        
        <Table 
            dataManager={dataManager}
            teamsObj={teamsObj}
            allRacesArray={allRacesArray}
            handleClickHeader={handleClickHeader}
            handleClickCell={handleClickCell}
            handleClickTeam={handleClickTeam}
        />
        
        </React.Fragment>  
        
    )
}

export default TableHead;