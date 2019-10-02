function buildSystemdata(Water_System_Number) {
    d3.json(`/bysystem/${Water_System_Number}`).then((data) => {
      // Use d3 to select the panel with id of `#sample-metadata`
      var PANEL = d3.select("#sample-metadata");
  
      // Use `.html("") to clear any existing metadata
      PANEL.html("");
  
      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
      Object.entries(data).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key}: ${value}`);
      });
  
      // BONUS: Build the Gauge Chart
    //   buildGauge(data.Total_Number_of_Finding_of_Lead_above_MCL_1819);
    });
  }

function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("/watersystem").then((sampleNames) => {
      sampleNames.forEach((Water_System_Number) => {
        selector
          .append("option")
          .text(Water_System_Number)
          .property("value", Water_System_Number);
      });
  
      // Use the first sample from the list to build the initial plots
      const firstSample = sampleNames[8];
      buildSystemdata(firstSample);
    });
}
  
function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildSystemdata(newSample);
}
  // Initialize the dashboard
init();