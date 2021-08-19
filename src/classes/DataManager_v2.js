class DataManager {

    constructor(data) {
        this.driver_table = data.driver_table;
        this.team_table = data.team_table;
        this.race_array = data.race_array;
        
        this.sortTeams();               
        
    }

    sortTeams() {                           //sort teams based on average
        this.team_table = this.team_table.sort( (a,b) => (a.avg_all_races > b.avg_all_races) ? -1 : 1);
    }


    getTeamIds(amountOfTeams) {                          //returns [ {team_id: team_id, race: true, race: true, ...},
                                            //          {team_id: team_id, race: true, race: true, ...}, ...]
        let arr = [];

        this.team_table.forEach( team => {
            let obj = {team_id: team.team_id, selected: false};
            this.race_array.forEach( race => obj[race] = true);
            arr.push(obj);
        })

        return arr.slice(0,amountOfTeams); 
    }
    

    getDriverNames(team_id) {               //returns [driver_1, driver_2, driver_3, driver_4]
        const team = this.team_table.find( team => team.team_id === team_id );
        return [ team.driver_1, team.driver_2, team.driver_3, team.driver_4 ];
    }


    getRaceArray() {                        //returns [race, race, ...]
        return this.race_array;
    }


    getRaceObj() {                          //returns {race: true, race: true, ...} 
        let obj = {};

        this.race_array.forEach( race => {
            obj[race] = true;
        });

        return obj;
    }

    getTeamScores(team_id) {                //returns {race: team_score, race: team_score, ...}
        const team = this.team_table.find( team => 
            (team.team_id === team_id)
        );      
        
        let newObj = {...team};
        delete newObj.driver_1;

        ['team_id', 'driver_1', 'driver_2', 'driver_3', 'driver_4', 'avg_all_races'].forEach( 
            key => delete newObj[key] );

        return newObj;
    }


    getDriverScore(driver_name, race) {        //returns {race: driver_score, race: driver_score, ...}

        //think about just returning {driver_name: driver_name, race: driver_score, race: driver_score, ...}

        const driver_object = this.driver_table.find( driver => 
            ( driver.driver_name === driver_name )
        );

        // let newObj = {...driver_object};

        // delete newObj.driver_name;

        return driver_object[race];
    }   

    getAverage(team_race_object, team_scores) {         //returns average of scores where race: true
        
        const newObj = {...team_race_object};
        
        delete newObj.team_id;
        delete newObj.selected;
        
        let count = 0;
        let total_points = 0;

        for (const race in newObj) {
            if (newObj[race]) {
                const points = +team_scores[race];      //to ensure that it will be an int
                total_points += points;
                count++;
            }
        };

        if (count) {                                    //to ensure correct rounding we use epsilon stuff
            return Math.round((total_points / count + Number.EPSILON) * 100) / 100;
        } else {
            return count;
        };

    }



}

export default DataManager;