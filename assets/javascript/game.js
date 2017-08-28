var topics = ["slyvester stallone", "taylor swift", "elvis presley", "beatles"];

$("document").ready(function(){
	renderButtons();

});

// Function for displaying categories data
function renderButtons() {
    $(".nav").empty();
    // Create the buttons for the categories
    topics.forEach(function(str) {
    	var buttonText = capitalizeStr(str);
       	var newItem = $("<li>");
     	var newBtn = $("<button>");
	    newBtn.addClass("btn btn-block topics");
	    newBtn.text(buttonText);
	    newBtn.attr("data-topics", str);
	    newItem.append(newBtn);
	   	$(".nav").append(newItem);
	});
}    

function capitalizeStr(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// This function handles events where one button is clicked
$("#add-topic").on("click", function(event) {
     event.preventDefault();
    // Add a new topic when button is clicked
    var topic =$("#topics-input").val();
    if(topic) {
	    $("#topics-input").val(""); 
        topics.push(topic);
        renderButtons();
    }
});