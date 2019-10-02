const userTestResults = {
    user_lat:0,
    user_lon:0,
    good_markers: [],
    bad_markers: [],
    showGraphResult: false
};

export default (state = userTestResults, action) => {
    switch(action.type) {
        case 'EDIT_USER_TEST_MARKERS': 
            return {
                ...state,
                ...action.data
            };
        default: 
            return state;
    }
};