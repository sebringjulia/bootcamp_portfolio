// from data.js
var tableData = data;

// YOUR CODE HERE!
// Append table using data

// Select the table to populate with the data
var tableBody = d3.select("tbody"); 

// Iterate through data object to add row and data
for (i = 0; i < data.length; i++) {
   index = data[i]; 
   indexValue = Object.values(index);
   var row = tableBody.append("tr");

   for (x = 0; x < indexValue.length; x++) {
       row.append("td").text(indexValue[x]);
   };
}

// Filter the table based on the user's date input

// Extract user's date input
// var dateInput = d3.select("input");
var dateInput = "1/11/2010"

function handleClick() {
    console.log("Button clicked");
    console.log(dateInput);
    tableBody.remove()
    return dateInput;       
}

// Create button click event
var button = d3.select("#filter-btn");
button.on("click", handleClick);

// Display filtered data in console
//console.log(tableData.filter(handleClick));
function filteredDate(sighting) {
    return sighting.datetime === dateInput;
}

var filteredSightings = tableData.filter(filteredDate);

console.log(filteredSightings);

// Try to clear table with complete data

// for (i = 0; i < data.length; i++) {
//     index = data[i]; 
//     indexValue = Object.values(index);
    
//     for (x=0; x < indexValue.lenghth; x++) {
//         tableBody.deleteRow(index);
//     }
//  }
// tableBody.remove()


// Create new filtered table

for (i = 0; i < filteredSightings.length; i++) {
    index = filteredSightings[i]; 
    indexValue = Object.values(index);
    var row = tableBody.append("tr");
 
    for (x = 0; x < indexValue.length; x++) {
        row.append("td").text(indexValue[x]);
    };
 }

// Q's
// typos in the data -- clean it?
// make the data format have consistent capitalization?
