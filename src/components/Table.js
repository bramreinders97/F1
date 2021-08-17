import React, { useState, useEffect } from 'react';
import * as ReactBootStrap from 'react-bootstrap';

const Table = ( {dataManager} ) => {

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

    const renderTeam = (team) => {              // team is one object (team) from teamObj

        const team_id = team.team_id;
        const team_scores = dataManager.getTeamScores(team_id);
        const driver_names = dataManager.getDriverNames(team_id);

        return (
            <tr key={team_id}>
                <td key={'drivers'}>
                    {driver_names.map( (driver,index) => {
                        if (index < 3) {
                            return (`${driver} / `)
                        };
                        return (`${driver}`)})}
                </td>
                <td key={'average'}>
                    {dataManager.getAverage(team,team_scores)}
                </td>   
                {allRacesArray.map( race => {
                        return ( 
                        <ReactBootStrap.OverlayTrigger
                            placement="left"    
                            key={race}
                            overlay={<ReactBootStrap.Tooltip id="button-tooltip" > {driver_names.map(
                                driver => (`${driver}: ${dataManager.getDriverScore(driver,race)} `   )
                            )} </ReactBootStrap.Tooltip>}>

                            <td key={race} 
                                onClick={() => handleClickCell(team, race)} 
                                className={ team[race] ? 'table-default' : 'table-danger'}
                                id='clickable'
                                >
                                {team_scores[race]}
                            </td>
                        </ReactBootStrap.OverlayTrigger> )
                    })}
            </tr>
        )
    }


    return (
        <ReactBootStrap.Table striped bordered hover>
            <thead>
                <tr>
                <th>Team</th>
                <th>Average</th>
                {allRacesArray.map( race => {
                    return ( 
                    <th key={race} 
                        onClick={() => handleClickHeader(race)}
                        id='clickable'
                        >
                        {race.replace('_',' ')}
                    </th> 
                    )})}
                </tr>
            </thead>
            <tbody>
                {teamsObj.map(renderTeam)} 
            </tbody> 
        </ReactBootStrap.Table>
    );
}

export default Table;