const waterQualityDefaultState = {
    cu: 0,
    lead: 0,
    iron: 2,
    mercury: 0,
    chromium: 3,
    nitrate: 0,
    /* -1: bad; 1: good */
    cuStd: -1,
    leadStd: -1,
    ironStd: -1,
    mercuryStd: -1,
    chromiumStd: -1,
    nitrateStd: -1,
    showStdRes: false
};

export default (state = waterQualityDefaultState, action) => {
    switch(action.type) {
        case 'EDIT_QUALITY_DATA': 
            return {
                ...state,
                ...action.data
            };
        case 'EDIT_TEST_RESULT':
            return {
                ...state,
                ...action.data
            };
        default: 
            return state;
    }
};