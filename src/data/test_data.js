const driver_table = [
    { driver_id: 'ver', race: 'eng', driver_score: 10 },
    { driver_id: 'ham', race: 'eng', driver_score: 34 },
    { driver_id: 'msc', race: 'eng', driver_score: 0 },
    { driver_id: 'lat', race: 'eng', driver_score: 0 },

    { driver_id: 'ver', race: 'por', driver_score: 36 },
    { driver_id: 'ham', race: 'por', driver_score: 21 },
    { driver_id: 'msc', race: 'por', driver_score: 0 },
    { driver_id: 'lat', race: 'por', driver_score: 0 },

    { driver_id: 'nor', race: 'eng', driver_score: 0 },
    { driver_id: 'sai', race: 'eng', driver_score: 18 },
    { driver_id: 'ver', race: 'eng', driver_score: 40 },
    { driver_id: 'oco', race: 'eng', driver_score: 7 },

    { driver_id: 'nor', race: 'por', driver_score: 16 },
    { driver_id: 'sai', race: 'por', driver_score: 6 },
    { driver_id: 'ver', race: 'por', driver_score: 33 },
    { driver_id: 'oco', race: 'por', driver_score: 1 }
];

const teams_overview = [
    { team_id: 1, driver_1: 'ham', driver_2: 'ver', driver_3: 'msc', driver_4: 'lat', average: 50.5 },
    { team_id: 2, driver_1: 'nor', driver_2: 'sai', driver_3: 'ver', driver_4: 'oco', average: 66.5 }
];

const team_scores = [
    { team_id: 1, race: 'eng', team_score: 44 },
    { team_id: 1, race: 'por', team_score: 57 },

    { team_id: 2, race: 'eng', team_score: 77 },
    { team_id: 2, race: 'por', team_score: 56 }
];

export {driver_table, teams_overview, team_scores};