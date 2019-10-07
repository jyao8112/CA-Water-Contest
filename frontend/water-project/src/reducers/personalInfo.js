const personalInfoDefaultState = {
    addressLineOne: '3737 North Blackstone',
    addressLineTwo: '',
    city: 'Fresno',
    state: 'CA',
    postal: '93726'
};

export default (state = personalInfoDefaultState, action) => {
    switch(action.type) {
        case 'ADD_INFO': 
            return {
                ...action.data
            };
        default: 
            return state;
    }
};