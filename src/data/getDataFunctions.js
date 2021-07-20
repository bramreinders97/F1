import {driver_table, teams_overview, team_scores} from './test_data';

const GetTableRow = () => {
    return (
        // teams_overview.map( team => {
        // //   <p>{team.driver_1}, {team.driver_2}, {team.driver_3}, {team.driver_4}</p> 
        // //   {console.log('d1: ', team.driver_1)};
        // <p>Hello from getRow</p>
        // }
        <div>
          {teams_overview.map(
              team => {
                return (  
                    <p>{team.team_id }</p>
                )
              }
          )}
        </div>
        // <p>Driver 1: {teams_overview[0].driver_1}</p>
        
        );
};

export { GetTableRow };