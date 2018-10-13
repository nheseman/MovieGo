$("#searchMovie").on("click", function(event){
    event.preventDefault();
    var movie = $("#user-input").val();
    //variables for API URLS    
    var OMDBURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=88ef9d01";
    var giphyURL =  "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=Yqwe8ISj3NU74ZnryO8nS98c8OFs880Q&limit=15" ;
    //First AJAX call for OMDB
    $.ajax({
        url: OMDBURL,
        method: "GET"
    }).then(function(response){
        $("#infoDisp").empty();
    //Variables for selected responses
    console.log(response);
        var title = response.Title;
        var plot = response.Plot;
        var actors = response.Actors;
        var rating = response.Rated;
        var year= response.Year;
        var poster= response.Poster;
       
    //Creating new objects for the responses to attach to
        var newDiv = $("<div class= movieStats>");
        var p1 = $("<img>").attr("src", poster)
        var p2 = $("<h2>").text(title);
        var p3 = $("<h3>").text(year);
        var p4 = $("<p>").text(plot);
        var p5 = $("<p>").text(actors);
        var p6 = $("<p>").text(rating);
        
    //appending all new objects to newDiv, then attaching newDiv to the page
        newDiv.append(p1,p2,p3,p4,p5,p6);
        $("#infoDisp").prepend(newDiv);
    
    })
    //AJAX call for GIPHY API
    $.ajax({
        url: giphyURL,
        method: "GET"
    }).then(function(response){
        $("#gifDisp").empty();
        console.log(response);
        //Looping through responses to append images to newGDiv, then attaching them to the page
        var gifs = response.data;
        for (let i = 0; i < gifs.length; i++) {
            var newGDiv = $("<div>");
            var gifImg= $("<img>");
            gifImg.addClass('gifImg');
            
            gifImg.attr("src",gifs[i].images.fixed_height.url);
            
            newGDiv.append(gifImg);
            $("#gifDisp").prepend(newGDiv)
            
        }
    })

});

$(document).ready(function () {
	// Firebase
	var userData = new Firebase("https://moviego-ku.firebaseio.com/");

	$("#userSubmit").on("click", function () {

		// User input and variables
		var firstName = $("#inputFirstName").val().trim();
		var lastName = $("#inputLastName").val().trim();	
		var userEmail = $("#inputEmail").val().trim();

		var newUser = {
			firstName: firstName,
			lastName: lastName,
            userEmail: userEmail,
        		}

		userData.push(newUser);		
		$("#inputFirstName").val("");
		$("#inputLastName").val("");
		$("#inputEmail").val("");
        
	/*	return false;  */
    });
});