import React from 'react';
import * as ReactBootStrap from 'react-bootstrap';

const Table = ( {dataManager} ) => {

    const all_races = dataManager.getRaces();
    const team_ids = dataManager.getTeamIds();

    const renderTeam = (team_id) => {

        const team_scores = dataManager.getTeamScores(team_id);
        const driver_ids = dataManager.getDriverIds(team_id);

        return (
            <tr key={team_id}>
                <td key={'drivers'}>
                    {driver_ids.map( (driver,index) => {
                        if (index < 3) {
                            return (`${driver} / `)
                        };
                        return (`${driver}`)})}
                </td>
                <td key={'average'}>
                    {team_scores.average}
                </td>   
                {all_races.map( race => {
                        return ( 
                        <td key={race}>
                            {team_scores[race]}
                        </td> )
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
                {all_races.map( race => {
                    return ( 
                    <th key={race}>
                        {race}
                    </th> 
                    )})}
                </tr>
            </thead>
            <tbody>
                {team_ids.map(renderTeam)} 
            </tbody> 
        </ReactBootStrap.Table>
    );
}

export default Table;