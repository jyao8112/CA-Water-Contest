const waterQualitySummaryDefaultState = {
    score:'-',
    improveRate: '-',
    population: '-',
    yearsInService: '-',
    zipcode: '-',
    waterSystemNumber: '-',
    waterSystemName: '-',
    showSummary: false
};

export default (state = waterQualitySummaryDefaultState, action) => {
    switch(action.type) {
        case 'EDIT_WATER_QUALITY_SUMMARY': 
            return {
                ...state,
                ...action.data
            };
        default: 
            return state;
    }
};