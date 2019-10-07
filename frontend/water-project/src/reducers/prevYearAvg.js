const prevYearAvg = {
    copper_avg: [],
    lead_avg: [],
    iron_avg: [],
    chromium_avg: [],
    mercury_avg: [],
    nitrate_avg: [],
    year: [],
    showAverage: false
};

export default (state = prevYearAvg, action) => {
    switch(action.type) {
        case 'EDIT_PREV_YEAR_AVG': 
            return {
                ...state,
                ...action.data,
            };
        default: 
            return state;
    }
};