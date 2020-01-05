var index = 0;
var metadataObject = []; 
var sample_values = [];
var otu_ids = [];
var otu_labels = [];

// Load data from json object
d3.json("data/samples.json").then((data) => {


    // Extract id and add to drop-down
    // var metadataObject = []; 
    data.metadata.forEach((element, index) => {
        metadataObject.push(element);  

        d3.select("#selDataset").append("option")
            .data([[element.id]])
            .attr("value", function(d) {
                return d;
                })
            .text(function(d) {
                return d;
                    })
            .enter() 
    }); 
    


// Display the sample metadata, i.e., an individual's demographic information.
// Display each key-value pair from the metadata JSON object somewhere on the page.
// Variables for metadata

        var ethnicity = `Ethnicity: ${metadataObject[index].ethnicity}`;
        var gender = `Gender: ${metadataObject[index].gender}`;
        var age = `Age: ${metadataObject[index].age}`;
        var location = `Location: ${metadataObject[index].location}`;
        var bbtype = `BB Type: ${metadataObject[index].bbtype}`;
        var wfreq = `WFreq: ${metadataObject[index].wfreq}`;    

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


    data.samples.forEach((element, index) => {
        sample_values.push(element.sample_values.slice(0,10).reverse());
        otu_ids.push(element.otu_ids.slice(0, 10));
        otu_labels.push(element.otu_labels.slice(0, 10));
    })

    var trace1 = {
        x: otu_ids[index],
        x: sample_values[index],
    
        type: "bar",
        text: otu_labels[index],
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
        x: otu_ids[index],
        y: sample_values[index],
        mode: 'markers',
        marker: { 
            size: sample_values[index],
            color: otu_ids[index]},
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

d3.selectAll("body").on("change", optionChanged);

function optionChanged() {
    // Scrub unordered list items

    

    var dropdownMenu = d3.select("#selDataset");

    var dataset = dropdownMenu.node().value;

    var barCHART = d3.selectAll("#bar").node();
    var bubbleCHART = d3.selectAll("#bubble").node();
    // console.log(barCHART);
    var x = [];
    var y = [];

    // var indexTicker = 2;
    // console.log("Index Ticker:", indexTicker);
    // console.log("Data selected", data.samples[indexTicker].id);
    // console.log("otu_ids", otu_ids[indexTicker]);
    // console.log("sample_values:", sample_values[indexTicker]);

    switch(dataset) {

        case "941":
            x = otu_ids[1];
            y = sample_values[1];
            break;
        case "943":
            x = otu_ids[2];
            y = sample_values[2];
            break;
        case "944":
            x = otu_ids[3];
            y = sample_values[3];
            break;   
        case "945":
        x = otu_ids[4];
        y = sample_values[4];
            break; 
        // case data.samples[indexTicker].id:
        //     x = otu_ids[indexTicker];
        //     y = sample_values[indexTicker];    
        // case "940":
        //     x = otu_ids[0];
        //     y = sample_values[0];
        default:
            x = otu_ids[0];
            y = sample_values[0];
    }
    Plotly.restyle(barCHART, "x", [x]);
    Plotly.restyle(barCHART, "y", [y]);
    Plotly.restyle(bubbleCHART, "x", [x]);
    Plotly.restyle(bubbleCHART, "y", [y]);


}


}).catch(function(error) {
    console.log(error);
});


// init(); //Need to create this function


// Deploy your app to a free static page hosting service, such as GitHub Pages. 
// Submit the links to your deployment and your GitHub repo.