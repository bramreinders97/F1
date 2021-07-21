class DataManager {

    constructor(data) {
        this.driver_table = data.driver_table;
        this.team_table = data.team_table;
        this.team_scores = data.team_scores;
        this.race_table = data.race_table;

        this.race_array = [];
        
        this.sortTeams();               
        this.createRaceArray();
    
    }

    sortTeams() {                       //sort teams based on average
        this.team_table = this.team_table.sort( (a,b) => (a.average > b.average) ? -1 : 1);
    }

    getTeamIds () {                     //returns [team_id, team_id, ...]
        let array = [];
        this.team_table.map( team => array.push( team.team_id ) );
        return array;
    }
    

    getDriverIds(team_id) {             //returns [driver_1, driver_2, driver_3, driver_4]
        const team = this.team_table.find( team => team.team_id === team_id );
        return [ team.driver_1, team.driver_2, team.driver_3, team.driver_4 ];
    }

    createRaceArray() {                 //return [race, race, ...]
        this.race_array = this.race_table.map( race => race.race);
    }

    getRaces() {                        //returns [race, race, ...]
        // const aTeamId = this.team_table[0].team_id;
        // return this.team_scores.filter( team => team.team_id === aTeamId ).map( team => team.race );

        return this.race_array;
    }

    getTeamScores(team_id) {            //returns {race: team_score, race: team_score, ...}
        let obj = {};
        
        this.race_array.map( race => obj[race] = 
            this.team_scores.find(team_score => team_score.team_id === team_id && team_score.race === race).team_score
            );

        return obj;
      
    }

    getDriverScores(driver_id) {        //returns {race: driver_score, race: driver_score, ...}
        let obj = {};   
        
        this.race_array.map( race => obj[race] = 
            this.driver_table.find(driverAndRace => driverAndRace.driver_id === driver_id && driverAndRace.race === race).driver_score
            );

        return obj;
    }   


}

export default DataManager;