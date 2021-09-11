import React, { useState, useEffect } from 'react';
import Test from './Test';
import Test2 from './DriverSelector';
import SimpleSelect from './DriverSelector';
import * as ReactBootStrap from 'react-bootstrap';
import Table from './Table';


const TableHead = ( {dataManager} ) => {
    
    const [nmbrTeamsToShow, setNmbrTeamsToShow] = useState(15);
    const [allTeamsObj, setAllTeamsObj] = useState( dataManager.getTeamIds() );
    const [shownTeamsObj, setShownTeamsObj] = useState( allTeamsObj.slice(0,nmbrTeamsToShow) );
    
    const allRacesArray = dataManager.getRaceArray();  //i keep this because otherwise i have to loop over Object.keys two times which seems inefficient
    const [allRacesObj, setAllRacesObj] = useState( dataManager.getRaceObj() );

    const [showingTopX, setShowingTopX] = useState(true);

    const combineObjects = (ObjOne,ObjTwo) => {  
        const mergedArray = [...ObjOne, ...ObjTwo];
        let set = new Set();
        let unionArray = mergedArray.filter(item => {
            if (!set.has(item.team_id)) {
                set.add(item.team_id);
                return true;
            }
            return false;
            }, set);
        
        return unionArray;
    };

    const handleClickHeader = (race) => {
        const newBooleanValue = ! allRacesObj[race];
        
        let newRaceObj = {...allRacesObj};
        newRaceObj[race] = newBooleanValue;        
        setAllRacesObj(newRaceObj);

        let newallTeamsObj = [...allTeamsObj];
        newallTeamsObj.forEach( team => {
            team[race] = newBooleanValue;
            const team_scores = dataManager.getTeamScores(team.team_id); 
            team.avg = dataManager.getAverage(team,team_scores);    
        });
        setAllTeamsObj(newallTeamsObj);

        if (showingTopX) {
            setShownTeamsObj(newallTeamsObj.slice(0,nmbrTeamsToShow));
        } else {
            setShownTeamsObj(newallTeamsObj.filter( team => team.selected === true));
        };
    }

    const handleClickCell = (team, race, team_scores) => {  
        const index = shownTeamsObj.indexOf(team);
        let newTeamsObj = [...shownTeamsObj];
        newTeamsObj[index][race] = ! newTeamsObj[index][race];
        newTeamsObj[index].avg = dataManager.getAverage(newTeamsObj[index],team_scores);  
        setShownTeamsObj(newTeamsObj);

        const newOriginal  = combineObjects(newTeamsObj,allTeamsObj);
        setAllTeamsObj(newOriginal);
    }

    const handleClickTeam = (team) => {
        const index = shownTeamsObj.indexOf(team);
        let newTeamsObj = [...shownTeamsObj];
        newTeamsObj[index].selected = ! newTeamsObj[index].selected;
        setShownTeamsObj(newTeamsObj);
    }

    const handleButtonClick = (operation) => {
        const old_value = nmbrTeamsToShow;
        setNmbrTeamsToShow(old_value + operation);
    }

    const handleClickSort = () => {
        if (showingTopX) {
            let newTeamObj = [...allTeamsObj];
            newTeamObj = newTeamObj.sort( (a,b) => (a.avg > b.avg) ? -1 : 1);
            setAllTeamsObj(newTeamObj);
    
            setShownTeamsObj(newTeamObj.slice(0,nmbrTeamsToShow));
        } else {
            let newTeamObj = [...shownTeamsObj];
            newTeamObj = newTeamObj.sort( (a,b) => (a.avg > b.avg) ? -1 : 1);
            setShownTeamsObj(newTeamObj);
        };
       
    };

    const handleClickSubmitTeam = (team_id) => {
        
        const index = allTeamsObj.findIndex( (team) => team.team_id === team_id);
        let newTeamObj = [...allTeamsObj];
        newTeamObj[index].selected = true;

        setAllTeamsObj(newTeamObj);
        
        if (showingTopX) {
            setShownTeamsObj(newTeamObj.slice(0,nmbrTeamsToShow));
        } else {
            setShownTeamsObj(newTeamObj.filter( team => team.selected === true));
        };
        
    };

    const handleGreenButtonClick = () => {
        if (showingTopX) {
            setShowingTopX(false);

            let onlySelectedObj = [...allTeamsObj].filter( team => team.selected === true);
            setShownTeamsObj(onlySelectedObj);

        } else {
            setShowingTopX(true);

            const newObj = [...allTeamsObj].sort( (a,b) => (a.avg > b.avg) ? -1 : 1);
            setShownTeamsObj(newObj.slice(0,nmbrTeamsToShow));   
        };
    };

    const handleUnselectAll = () => {
        let newObj = [...allTeamsObj];
        newObj.forEach( team => team.selected = false);
        setAllTeamsObj(newObj);
        setShownTeamsObj(newObj.slice(0,nmbrTeamsToShow));
        setShowingTopX(true);
    };

    useEffect( () => {
        if (showingTopX) {
            setShownTeamsObj( allTeamsObj.slice(0,nmbrTeamsToShow) );
        } ;
    }, [ nmbrTeamsToShow, dataManager ] ); //dataManager not really nacessary but to silence the warning

    useEffect( () => {
    }, [ allRacesObj, shownTeamsObj ] );


    return ( 
        <React.Fragment>

        <SimpleSelect dataManager={dataManager} handleClickSubmitTeam={handleClickSubmitTeam}/>

        <ReactBootStrap.Button variant='primary' onClick={() => handleButtonClick(1)}>
            +
        </ReactBootStrap.Button>
        <ReactBootStrap.Button variant='warning' onClick={() => handleButtonClick(-1)}>
            -
        </ReactBootStrap.Button>
        <ReactBootStrap.Button variant='secondary' onClick={() => handleClickSort()}>
            Sort
        </ReactBootStrap.Button>
        <ReactBootStrap.Button variant='success' onClick={() => handleGreenButtonClick()}>
            {showingTopX ? 'Show Selected Teams' : `Show top ${nmbrTeamsToShow} teams`}
        </ReactBootStrap.Button>
        <ReactBootStrap.Button variant='danger' onClick={() => handleUnselectAll()}>
            Unselect All
        </ReactBootStrap.Button>
        
        <Table 
            dataManager={dataManager}
            teamsObj={shownTeamsObj}
            allRacesArray={allRacesArray}
            handleClickHeader={handleClickHeader}
            handleClickCell={handleClickCell}
            handleClickTeam={handleClickTeam}
        />
        
        </React.Fragment>  
        
    )
}

export default TableHead;