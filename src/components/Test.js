import React from 'react';

const Test = () => {

    const one = [{team:1,selected:false,bah:true}];
    
    const two = [{team:1,selected:false,bah:false}, //so from original this one comes, hence the false
                 {team:2,selected:false,bah:false}];

    
    

    const combineObjects = (ObjOne,ObjTwo) => {  //for two, use originalTeamObj.slice(0,nmrOfTeams) after making a copy firts

        const mergedArray = [...ObjOne, ...ObjTwo];
        let set = new Set();
        let unionArray = mergedArray.filter(item => {
            if (!set.has(item.team)) {
                set.add(item.team);
                return true;
            }
            return false;
            }, set);
        
        return unionArray;
    };
    
    // console.log(combineObjects(one,two));

    return ( 
        <p>Check console</p>
    )
}

export default Test;