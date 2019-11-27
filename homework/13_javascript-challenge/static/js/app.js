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
var dateInput = d3.select("input");
var button = d3.select("#filter-btn");

function handleClick() {
    // Extract user's date input
    var dateInput = d3.select("input").property("value");
    return dateInput;
    console.log(dateInput);
}
    // Filter to the date input
/*     var sighting = data
    filteredData = sighting.filter(record => record.datetime === dateInput);
    console.log(filteredData);
    return filteredData; */

button.on("click", handleClick);

function filter() {
    
}

/* function selectDate(record) {
    var test = record.timedate === dateInput;
    return test;
}

var filteredSightings = data.filter(selectDate);

// Test
console.log(filteredSightings); */

// Q's
// typos in the data -- clean it?
// make the data format have consistent capitalization?
