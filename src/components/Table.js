// import React from 'react';
// import { data } from '../data/test_data';
// import * as ReactBootStrap from 'react-bootstrap';

// const Table = () => {

//     const renderTeam = (team) => {
//         return (
//             <tr key={team.team_id}>
//                 <td>D1: {team.driver_1}, D2: {team.driver_2}, D3: {team.driver_3}, D4: {team.driver_4}</td>
//                 <td>{team.average}</td>
//                 <td>
//                     {team_scores.find(teamAndRace => {
//                         return ( teamAndRace.race === 'eng' && teamAndRace.team_id === team.team_id )}).team_score
//                     }
//                 </td>
//                 <td>
//                     {team_scores.find(teamAndRace => {
//                         return ( teamAndRace.race === 'por' && teamAndRace.team_id === team.team_id )}).team_score
//                     }
//                 </td>
//             </tr>
//         )
//     }


//     return (
//         <ReactBootStrap.Table striped bordered hover>
//             <thead>
//                 <tr>
//                 <th>Team</th>
//                 <th>Average</th>
//                 <th>England</th>
//                 <th>Portugal</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {team_table.map(renderTeam)}
//             </tbody>
//         </ReactBootStrap.Table>
//     );
// }

// export default Table;