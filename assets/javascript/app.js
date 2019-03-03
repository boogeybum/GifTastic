// declare variables
var topics = ["Tommy Boy", "Holy Grail", "Caddy Shack", "Happy Gilmore"];

// update buttons on page from topics array
function renderButtons() {
    // clear buttons on the page before appending new to prevent adding same button twice
    $("#btn-view").empty();
    
    // run the array to add a button for each item in the array
    for (var i = 0; i < topics.length; i++) {
        var newBtn = $("<button>");
        newBtn.addClass("btn btn-primary");
        newBtn.attr("data-movie", topics[i]);
        newBtn.text(topics[i]);
        $("#btn-view").append(newBtn);
    }
};

// add buttons to topics array based on user input (need if else statement to prevent adding duplicate entries and empty buttons)
$("#add-movie").on("click", function(event) {
    event.preventDefault();

    var movie = $("#gifSearch-input").val().trim();
    topics.push(movie);
    renderButtons();
    //clear the search field 
    $("#gifSearch-input").val("");
});



// request data from giphy based on the button clicked and return random gif's that meet the requirements.

// prepend the returned gif's to add them to the page just below the buttons

renderButtons();