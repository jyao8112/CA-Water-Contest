import { setUserTestResults } from './userTestResults';

const axios = require('axios');
import { WATERSTANDARD } from '../constants/waterStandard';

export const setWaterQualityData = (data) => ({
    type: 'EDIT_QUALITY_DATA',
    data: {
        ...data
    }
});

export const submitWaterQualityData = data => 
     (dispatch) => {
        console.log("[WaterQualityDataAction] Submiting user test data.");
        const {CUSTD, LEADSTD, IRONSTD, CRSTD, MERCURYSTD, NITRATESTD } = WATERSTANDARD;
        const cuStd = data.cu > CUSTD ? -1 : 1;
        const leadStd = data.lead > LEADSTD ? -1 : 1;
        const ironStd = data.iron > IRONSTD ? -1 : 1;
        const chromiumStd = data.crStd > CRSTD ? -1 : 1;
        const nitrateStd = data.nitrateStd > NITRATESTD ? -1 : 1;
        const mercuryStd = data.mercuryStd > MERCURYSTD ? -1 : 1;
        const waterTest = data.cu <= CUSTD && data.iron <= IRONSTD && data.lead <= LEADSTD  && data.chromium <= CRSTD && data.nitrate <= NITRATESTD && data.mercury <= MERCURYSTD ?
                1 : 0;
        const response = {cuStd, leadStd, ironStd, chromiumStd, nitrateStd, mercuryStd, showStdRes: true, ...data};
        dispatch({
            type: 'EDIT_QUALITY_DATA',
            data: response
        });

        // get map markers
        axios({
            method: 'post',
            url: 'http://52.8.169.153//testInput',
            data: {
              address: data.address,
              copper: data.cu,
              lead: data.lead,
              iron: data.iron,
              chromium: data.chromium,
              nitrate: data.nitrate,
              mercury: data.mercury,
              waterTest
            }
          })
        .then((res) => {
            console.log("[WaterQualityData] Getting map markers from back: ", res);
            const markerPosArr = res.data[0];
            var good_markers = [];
            var bad_markers = [];

            markerPosArr.forEach(element => {
                if (element[0] === 0) {
                    bad_markers.push(element);
                }
                else if (element[0] === 1) {
                    good_markers.push(element);
                }
            });
            console.log('Good markers are: ', good_markers);
            dispatch(setUserTestResults({good_markers, bad_markers, showGraphResult: true}));
            console.log('[PersonalInfoAction] Markers set up correctly.');
            
        })
        console.log("[WaterQualityDataAction] Successfully submit user test data.");
    }
