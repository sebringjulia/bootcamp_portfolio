// from data.js
var tableData = data;

// Select the table to display the data
var tableBody = d3.select("tbody"); 

// Iterate through data object to add rows and all data to table body
// for (i = 0; i < tableData.length; i++) {
//    index = tableData[i]; 
//    indexValue = Object.values(index);
//    var row = tableBody.append("tr");

//    for (x = 0; x < indexValue.length; x++) {
//        row.append("td").text(indexValue[x]);
//    };
// }
tableData.forEach(function(sighting) {
    var row = tableBody.append("tr");
    
    Object.values(sighting).forEach(function(value) {
        var cell = row.append("td");
        cell.text(value);
    });
});

// Create event to filter the table based on the user's date input

// Extract user's date input
// var dateInput = d3.select("input");
//var dateInput = "1/11/2010"

// Original function -----------------------
// function handleClick() {
//     console.log("Button clicked");
//     console.log(dateInput);
//     tableBody.remove()
//     return dateInput;       
// }
// -------------------------------------------

// Test function
function handleClick() {
    console.log("Button clicked");
    var dateInput = d3.select("input").property("value");
    var tableCell = tableBody.selectAll("tr");
    console.log(dateInput);
    tableCell.remove();
    
    var filteredSightings = tableData.filter(function(sighting) {
        console.log("Filtering");
        return sighting.datetime === dateInput;
    });       
    console.log("Where the filtered table will appear.");
    console.log(filteredSightings);

    for (i = 0; i < filteredSightings.length; i++) {
        index = filteredSightings[i]; 
        indexValue = Object.values(index);
        var row = tableBody.append("tr");
     
        for (x = 0; x < indexValue.length; x++) {
            row.append("td").text(indexValue[x]);
        };
     };
};

// Create button click event
var button = d3.select("#filter-btn");
button.on("click", handleClick);

// Display filtered data in console
//console.log(tableData.filter(handleClick));
// function filteredDate(sighting) {
//     return sighting.datetime === dateInput;
// }

// var filteredSightings = tableData.filter(filteredDate);

// console.log(filteredSightings);
// ------------------------------------------------
// ------------------------------------------------
// ------------------------------------------------
// Try to clear table with complete data

// for (i = 0; i < data.length; i++) {
//     index = data[i]; 
//     indexValue = Object.values(index);
    
//     for (x=0; x < indexValue.lenghth; x++) {
//         tableBody.deleteRow(index);
//     }
//  }
// tableBody.remove()
// ------------------------------------------------
// ------------------------------------------------
// ------------------------------------------------


// Create new filtered table

// for (i = 0; i < filteredSightings.length; i++) {
//     index = filteredSightings[i]; 
//     indexValue = Object.values(index);
//     var row = tableBody.append("tr");
 
//     for (x = 0; x < indexValue.length; x++) {
//         row.append("td").text(indexValue[x]);
//     };
//  }