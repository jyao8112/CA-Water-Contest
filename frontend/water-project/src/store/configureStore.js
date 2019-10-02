import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import personalInfoReducer from '../reducers/personalInfo';
import waterQualityDataReducer from '../reducers/waterQualityData';
import prevYearAvgReducer from '../reducers/prevYearAvg';
import waterQualitySummaryReducer from '../reducers/waterQualitySummary';
import userTestResultsReducer from '../reducers/userTestResults';

export default () => {
    const store = createStore(
        combineReducers({
            personalInfo: personalInfoReducer,
            waterQualityData: waterQualityDataReducer,
            prevYearAvg: prevYearAvgReducer,
            waterQualitySummary: waterQualitySummaryReducer,
            userTestResults: userTestResultsReducer
        }),
        applyMiddleware(thunk)
    );

    return store;
}
