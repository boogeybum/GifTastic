// declare string variable to hold search terms
var topics = ["Tommy Boy", "Holy Grail", "Caddyshack", "Happy Gilmore"];

// update click and search buttons on page from topics array
function renderButtons() {
    // clear buttons on the page before appending new to prevent adding same button twice
    $("#btn-view").empty();
    
    // run the array to add a button and text for each item in the array
    for (var i = 0; i < topics.length; i++) {
        var newBtn = $("<button>");
        newBtn.addClass("btn btn-primary");
        newBtn.attr("data-movie", topics[i]);
        newBtn.text(topics[i]);
        $("#btn-view").append(newBtn);
        // console.log(newBtn);
    }
};

renderButtons();

// add buttons to topics array based on user input (need if else statement to prevent adding duplicate entries and empty buttons)
$("#add-movie").on("click", function(event) {
    event.preventDefault();

    var movie = $("#gifSearch-input").val().trim();
    topics.push(movie);
    renderButtons();
    //clear the search field 
    $("#gifSearch-input").val("");
});

// search for gif's based on button clicked
$(document).on("click","button", function() {
    var movieGif = $(this).attr("data-movie");
    console.log(movieGif);
    // link to giphy api
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    movieGif + "&api_key=TD2V1oeol0vQTK3C0op1DCFEbEknqsRW&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var results = response.data;

        // request data from giphy based on the button clicked and return random gif's that meet the requirements.
        for (var i = 0; i < results.length; i++) {
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                var gifDiv = $("<div>");

                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_width_still.url);
                gifImage.attr("still", results[i].images.fixed_width_still.url);
                gifImage.attr("moving", results[i].images.fixed_height.url);
                gifImage.attr("id", "gif-img");
                gifDiv.append(gifImage);
                gifDiv.append(p);

                // prepend the returned gif's to add them to the page just below the buttons
                $("#giftastic").prepend(gifDiv);
            }
        }
    });
});

// add data attributes for the still and motion versions of the gif defaulting to 'still'
// add function that 'plays' the gif when the user clicks on the picture.

$(document).on("click", "#gif-img", function() {
    if ($(this).attr("src") === $(this).attr("still")) {
        $(this).attr("src", $(this).attr("moving"))
    } else if ($(this).attr("src") === $(this).attr("moving")) {
        $(this).attr("src", $(this).attr("still"))
    }
});