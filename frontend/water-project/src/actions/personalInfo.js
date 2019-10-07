const axios = require('axios');
import { setPrevYearAvg } from './prevYearAvg';
import { setWaterQualitySummary } from './waterQualitySummary';
import { setUserTestResults } from './userTestResults';

export const setPersonalInfo = (object) => ({
    type: 'ADD_INFO',
    data: {
        ...object
    }
});

export const submitPersonalInfo = info => 
    (dispatch) => {
        console.log("[PersonalInfoAction] Sending address and test data back to end...");
        axios({
            method: 'post',
            url: 'http://52.8.169.153//sendAddress',
            data: {
              address: info.address
            }
          })
        .then((response) => {
            console.log('[PersonalInfoAction] User data successfully submitted!');
            console.log('[PersonalInfoAction] Getting response from back:', response);
            const data = response.data;
            var yearStr = data.year;
            const year = yearStr.map((str) => str.substr(str.length - 4));
            const parseAvgData = {
                chromium_avg: data.chromium_avg, 
                copper_avg: data.copper_avg, 
                iron_avg: data.iron_avg, 
                lead_avg: data.lead_avg, 
                mercury_avg: data.mercury_avg, 
                nitrate_avg: data.nitrate_avg, 
                showAverage: true,
                year
            };
            const parseSummaryData = {
                score: data.water_quality_score,
                improveRate: data.improve_rate,
                population: data.served_population,
                yearsInService: data.years_in_service,
                zipcode: data.zip_code,
                waterSystemNumber: data.water_system_number,
                waterSystemName: data.water_system_name,
                showSummary: true
            }
            const parseUserPos = {
                user_lat: data.user_lat,
                user_lon: data.user_lon,
            }
            dispatch(setUserTestResults(parseUserPos));
            dispatch(setPrevYearAvg(parseAvgData));
            dispatch(setWaterQualitySummary(parseSummaryData));
        })
        .catch((e) => {
            console.log('[PersonalInfoAction] Error submitting user data: ', e);
        })
    }
