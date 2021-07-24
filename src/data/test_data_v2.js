const driver_table = [
    { driver_name: 'Ver', eng: 10, por: 36 },
    { driver_name: 'Ham', eng: 34, por: 21 },
    { driver_name: 'Msc', eng: 0,  por: 0 },
    { driver_name: 'Lat', eng: 0,  por: 0} ,

    { driver_name: 'Nor', eng: 0,  por: 16 },
    { driver_name: 'Sai', eng: 18, por: 6 },
    { driver_name: 'Oco', eng: 7,  por: 1 }
];

const team_table = [
    { team_id: 1, driver_1: 'Ham', driver_2: 'Ver', driver_3: 'Msc', driver_4: 'Lat', eng: 44, por: 57, avg_all_races: 50.5 }, //avg_all_races is used to sort the teams when loading the page
    { team_id: 2, driver_1: 'Nor', driver_2: 'Sai', driver_3: 'Ver', driver_4: 'Oco', eng: 77, por: 56, avg_all_races: 66.5 }
];

const race_array = ['eng', 'por'];

const data = {
    driver_table: driver_table,
    team_table: team_table,
    race_array: race_array
};

export {data};