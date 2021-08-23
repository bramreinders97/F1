import React, {useEffect, useState} from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import SimpleSelect from './DriverSelector';

const Test = ({dataManager}) => {

   const possible_team_mates = dataManager.getPossibleTeamMates([null,null,null,null]);
   console.log('possible_team_mates',possible_team_mates);

   

    return ( 
        <SimpleSelect dataManager={dataManager}/>
    )
}

export default Test;