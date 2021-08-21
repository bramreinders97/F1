import React, {useEffect, useState} from 'react';

const Test = ({dataManager}) => {

   let [possible_team_mates,possible_teams] = dataManager.getPossibleTeamMates('VER');
   console.log('possible_team_mates',possible_team_mates);
   console.log('possible_teams',possible_teams);

   [possible_team_mates,possible_teams] = dataManager.getPossibleTeamMates('VER','HAM',null,possible_teams);
   console.log('possible_team_mates',possible_team_mates);
   console.log('possible_teams',possible_teams);

   [possible_team_mates,possible_teams] = dataManager.getPossibleTeamMates('VER','HAM','MAZ',possible_teams);
   console.log('possible_team_mates',possible_team_mates);
   console.log('possible_teams',possible_teams);


    return ( 
        <p>{'logical_expression'}</p>
    )
}

export default Test;