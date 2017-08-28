var topics = ["sylvester stallone", "taylor swift", "elvis presley", "beatles"];

$("document").ready(function(){
	renderButtons();

});

// Function for displaying categories data
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

$("body").on("click", ".topics", function(e) {
	if(e.target.id === "person"){
		$("#gifs-appear-here").empty();
    	var person = $(this).attr("data-topics");
    	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=dc6zaTOxFJmzC&limit=10";
   
       	$.ajax({
           url: queryURL,
           method: "GET"
        }).done(function(response) {
           console.log(response);
           var results = response.data;
           var gifDiv = $("<div class='row'>");
	       for (var i = 0; i < results.length; i++) {
      	   		var gifCol = $("<div>");
      	   		gifCol.addClass("col-4 gifBar");
		    	var rating = results[i].rating;
            	var p = $("<p>").text("Rating: " + rating);
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

// To add, click on the image to open in a modal window, filter by rating