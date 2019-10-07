export const setWaterQualitySummary = (object) => ({
    type: 'EDIT_WATER_QUALITY_SUMMARY',
    data: {
        ...object
    }
});