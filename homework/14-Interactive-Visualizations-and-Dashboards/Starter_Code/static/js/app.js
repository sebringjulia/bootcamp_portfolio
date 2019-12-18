
// Load data to DOM sample code------------------------------------------


// Initialize page with default plot
function init() {
    data = [{
        x: [1, 2, 3, 4, 5],
        y: [1, 2, 4, 8, 16] }];
    //.node() lets us access the value of the selected div
    var CHART = d3.selectAll("bar").node();

    Plotly.newPlot(CHART, data);
}


// Sample code to create switch function
// Make For Loop to create case for each test subject
function chooseLetter(letter) {
    switch(letter) {
        case "A":
          console.log(1);
          break;
        case "B":
          console.log(2);
          break;
        case "C":
          console.log(3);
          break;
        case "D":
          console.log(4);
          break;
        case "E":
          console.log(5);
          break;

        default:
          console.log(0);
          break;
    }
}

chooseLetter("F");

// End of sample code----------------------------------------------------


// Function to extract id from metadata object
function userId({id}) {
    return id;
}

// Load data from json object
d3.json("data/samples.json").then((data) => {


    // Extract id and add to drop-down
    var metadataObject = []; 
    data.metadata.forEach((element, index) => {
        metadataObject.push(element);  

        var arr = [element.id];
        var ul = d3.select("#selDataset").append("ul");
        var selection = ul.selectAll("li")
            .data(arr)
            .enter()
            .append("li")
            .text(function(d) {
                return d;})
    }); 

// Display the sample metadata, i.e., an individual's demographic information.
// Display each key-value pair from the metadata JSON object somewhere on the page.
// Variables for metadata

var ethnicity = `Ethnicity: ${metadataObject[0].ethnicity}`;
var gender = `Gender: ${metadataObject[0].gender}`;
var age = `Age: ${metadataObject[0].age}`;
var location = `Location: ${metadataObject[0].location}`;
var bbtype = `BB Type: ${metadataObject[0].bbtype}`;
var wfreq = `WFreq: ${metadataObject[0].wfreq}`;    

        var arrMeta = [ethnicity, gender, age, location, bbtype, wfreq];
        var ul = d3.select("#sample-metadata").append("ul");
        var selection = ul.selectAll("li")
            .data(arrMeta)
            .enter()
            .append("li")
            .text(function(d) {
                return d;
        })

// Create a horizontal bar chart with a dropdown menu 
// to display the top 10 OTUs found in that individual.

// Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart.
    var sample_values = [];
    var otu_ids = [];
    var otu_labels = [];

    data.samples.forEach((element, index) => {
        sample_values.push(element.sample_values.slice(0,10).reverse());
        otu_ids.push(element.otu_ids.slice(0, 10));
        otu_labels.push(element.otu_labels.slice(0, 10));
    })

// Need to toggle trace by subject!

    var trace1 = {
        x: otu_ids[0],
        x: sample_values[0],
    
        type: "bar",
        text: otu_labels[0],
        orientation: "h"
    };

    var data1 = [trace1];

    var layout1 = {
        title: "OTUs Detected",
        xaxis: { title: "OTU"},
        yaxis: { title: "Amount of bacteria present"}
    };

    Plotly.newPlot("bar", data1, layout1);
//  Create a bubble chart that displays each sample.

    var trace2 = {
        x: otu_ids[0],
        y: sample_values[0],
        mode: 'markers',
        marker: { 
            size: sample_values[0],
            color: otu_ids[0]},
        text: otu_labels,
        type: "scatter"
    };

    var data2 = [trace2];

    var layout2 = {
        title: 'Bubble Chart',
        height: 600,
        width: 600
    };

    Plotly.newPlot('bubble', data2, layout2);    



// // Update all of the plots any time that a new sample is selected.

// d3.selectAll("body").on("change", updatePlotly);

// function updatePlotly() {
//     var dropdownMenu = d3.select("#selDataset");

//     var dataset = dropdownMenu.node().value;

//     var CHART = d3.selectAll("#plot").node();

//     var x = [];
//     var y = [];

//     switch(dataset) {
//         case "dataset1":
//             x = otu_ids;
//             y = sample_value;
//             break;
//     }
// }

// Plotly.restyle(CHART, "x", [x]);
// Plotly.restyle(CHART, "y", [y]);


// });


}).catch(function(error) {
    console.log(error);
});



// Deploy your app to a free static page hosting service, such as GitHub Pages. 
// Submit the links to your deployment and your GitHub repo.