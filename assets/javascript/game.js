// Array of categories 
var topics = ["sylvester stallone", "taylor swift", "elvis presley", "beatles"];

$("document").ready(function(){
	renderButtons();
});

// Function creates buttons for each category in the array
function renderButtons() {
    $(".nav").empty();
    $(".nav").append('<li class="heading"><h5>Famous People</h5></li>');
    // Create the buttons for the categories
    topics.forEach(function(str) {
    	var buttonText = capitalizeStr(str);
       	var newItem = $("<li>");
     	var newBtn = $("<button>");
	    newBtn.addClass("btn btn-block topics");
	    newBtn.attr("id", "person");
	    newBtn.text(buttonText);
	    newBtn.attr("data-topics", str);
	    newItem.append(newBtn);
	   	$(".nav").append(newItem);
	});
}    

// Function to capitalize the first letter of each category
function capitalizeStr(str) {
	var strArray = str.split(" ");
	var newStr = "";
	strArray.forEach(function(item) {
		newStr += item.charAt(0).toUpperCase() + item.slice(1)+ " ";
	});
	return newStr;
}

// Function handles adding a new category entered by the user
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

// Builds the query url for giphy api for the ajax call, queries giphy's random 
// api endpoint and writes the resulting data to the document
$("body").on("click", ".topics", function(e) {
	if(e.target.id === "person"){
		$("#gifs-appear-here").empty();
    	var person = $(this).attr("data-topics");
    	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=2452eab7996d40a59ad5d50f7a44392a&limit=10";
   
       	$.ajax({
           url: queryURL,
           method: "GET"
        }).done(function(response) {
           var results = response.data;
           console.log(results);
           var gifDiv = $("<div class='row'>");
	       for (var i = 0; i < results.length; i++) {
      	   		var gifCol = $("<div>");
      	   		gifCol.addClass("col-4 col-sm gifBar");
		    	var rating = results[i].rating;
            	var p = $("<p>").text("Rating: " + rating.toUpperCase());
            	var personImage = $("<img>");
            	personImage.attr("src", results[i].images.fixed_width_still.url);
            	personImage.attr("data-state", "still");
            	personImage.attr("data-still", results[i].images.fixed_width_still.url);
            	personImage.attr("data-animate", results[i].images.fixed_width.url);
            	personImage.attr("id", "gif");
            	gifCol.prepend(p);
            	gifCol.prepend(personImage);
            	gifDiv.append(gifCol);
            	$("#gifs-appear-here").prepend(gifDiv);
         	};
    	});
    }
});

// Toggles the gif from still to animated
$("body").on("click", "#gif", function() {
    // Make a variable named state and then store the image's data-state into it.
    var state = $(this).attr("data-state");
    if(state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        }else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
    }
});
