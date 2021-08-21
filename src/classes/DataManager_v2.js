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


    getTeamIds() {                          //returns [ {team_id: team_id, selected: false, race: true, race: true, ..., avg: avg_all_races},
                                                                  // {team_id: team_id, selected: false, race: true, race: true, ..., avg: avg_all_races}, ...]
        let arr = [];

        this.team_table.forEach( team => {
            let obj = {team_id: team.team_id, selected: false};
            this.race_array.forEach( race => obj[race] = true);
            obj.avg = Math.round((team.avg_all_races + Number.EPSILON) * 100) / 100;
            arr.push(obj);
        })

        // return arr.slice(0,amountOfTeams); 
        return arr
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

        const driver_object = this.driver_table.find( driver => 
            ( driver.driver_name === driver_name )
        );

        return driver_object[race];
    }   

    getAverage(team_race_object, team_scores) {         //returns average of scores where race: true
        
        const newObj = {...team_race_object};
        
        delete newObj.team_id;
        delete newObj.selected;
        delete newObj.avg; 
        
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

    getLogicalString(driver) { 
        return `(team.driver_1 == '${driver}' || team.driver_2 == '${driver}' || team.driver_3 == '${driver}' || team.driver_4 == '${driver}')`;
    }

    getPossibleTeamMates(driver_1,driver_2=null,driver_3=null,possible_teams_previously_returned=null) {

        const teams_to_check = possible_teams_previously_returned ? possible_teams_previously_returned : [...this.team_table]; //so you don't have to loop over the entire table every time

        //get logical expression depending on the amount of drivers known
        let logical_expression = this.getLogicalString(driver_1);
        logical_expression += driver_2 ? ` && ${this.getLogicalString(driver_2)}` : '';
        logical_expression += driver_3 ? ` && ${this.getLogicalString(driver_3)}` : '';
        
        //get the selection of teams with driver_1 & driver_2 enz
        const possible_teams = teams_to_check.filter(team => {
            if (eval(logical_expression)) {
                return team
            };
        });
        
        //get all possible team mates and put in array
        let possible_team_mates = [];
        possible_teams.forEach(team => {
            [team.driver_1,team.driver_2,team.driver_3,team.driver_4].forEach(driver => {
                if ( (! possible_team_mates.includes(driver) ) && (! [driver_1,driver_2,driver_3].includes(driver)) ) {
                    possible_team_mates.push(driver);
                };
            });
        });

        return [possible_team_mates,possible_teams];

    }

}

export default DataManager;