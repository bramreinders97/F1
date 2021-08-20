import React from 'react';
import * as ReactBootStrap from 'react-bootstrap';

const Table = ( {dataManager,teamsObj,allRacesArray,handleClickHeader,handleClickCell,handleClickTeam} ) => {

    const renderTeam = (team) => {              // team is one object (team) from teamObj

        const team_id = team.team_id;
        const team_scores = dataManager.getTeamScores(team_id);
        const driver_names = dataManager.getDriverNames(team_id);

        return (
            <tr key={team_id}>
                <td key={'drivers'}
                    className={ team.selected ? 'table-success' : 'table-default'}
                    onClick={() => handleClickTeam(team)}
                    id='clickable'
                    >
                        {driver_names.map( (driver,index) => {
                        if (index < 3) {
                            return (`${driver} / `)
                        };
                        return (`${driver}`)})}
                </td>
                <td key={'average'}>
                    {team.avg} 
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
                                onClick={() => handleClickCell(team, race, team_scores)} 
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