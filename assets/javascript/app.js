
// show reccommended recipes when page first loaded
$(function(){
  console.log("page loaded, show reccommended recipes in div #recipePreview");
});

var searchTerms = "";
$('#ingSubmit').on('click', function() {
    event.preventDefault();
    var userInp = $('#addItem').val().trim();

    // add user input ingredients to searchTerms in queryURL
    if (searchTerms==""){
      searchTerms = userInp;
    } else if (searchTerms!=""){
      searchTerms = searchTerms + "%2C" + userInp; //"%2C" means ","
    }
    console.log("searchTerms:" + searchTerms);

    // add user input ingredients to list
    var list = $('<ul>');
    list.append('<li>' + userInp + '</li>');
    $('.list').append(list);
    $('#addItem').val('');
});

// show search results of recipe preview: image, title, and likes
$('#getRecipe').on('click', function showResults(){
  event.preventDefault();
  var recipeResults = $(this).attr("data-results");

  // var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=" + searchTerms;
  var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=" + searchTerms + "&limitLicense=false&number=5&ranking=1";

  $.ajax({
    url: queryURL,
    method: "GET",
    dataType: "JSON",
    headers: {"X-Mashape-Key": "VS2DQ1Z8NsmshinFxHOYEzkSKA9Hp1dqzxFjsnBjVYMArEc4Ez"}
  })
    .done(function(response){
      console.log(response);
    var recipedata = response;
    console.log(recipedata);

    var image;
    var title;
    var likes;
    var idNum;

    for (var i=0; i<recipedata.length; i++) {
      var resultRecipe = $("<div class='result'>");
      image = $("<img>").attr("src", recipedata[i].image);
      title = $("<p>").text("title: " + recipedata[i].title);
      likes = $("<p>").text("likes: " + recipedata[i].likes);
      idNum = recipedata[i].id;
      console.log(idNum);
    }
    function findRecipe(numRecipes, queryRecipe) {

        $.ajax({

            url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + idNum + "/analyzedInstructions?stepBreakdown=true",
            method: "GET",
            dataType: "JSON",
            headers: {
            	"X-Mashape-Key": "VS2DQ1Z8NsmshinFxHOYEzkSKA9Hp1dqzxFjsnBjVYMArEc4Ez"
            }

        }).done(function(recipes) {

        	console.log("recipes:", recipes);

        	// if (recipes.length = 0) {

        	// 	console.log("error");

        	// 	// **display error message for user in html
        	// }

         //    // Logging the URL for troubleshooting access
         //    console.log("URL: " + queryRecipe);

         //    // Logging recipes to console
         //    console.log(recipes.length);

         //    // Loop through and provide the correct number of recipes
         //    for (var i = 0; i < recipes.length; i++) {

         //    	// append to HTML section for recipes;
         //    	var recipeSection = $("<div>");
         //    	$("#unknown").append(recipes);
        });
    }

    findRecipe();

  });
});

// Get the modal
var modal = $('#myModal')[0];
// Get the button that opens the modal
var mapbtn = $("#openmap")[0];
// Get the <span> element that closes the modal
var span = $(".close")[0];
// When the user clicks on the button, open the modal
$("#openmap").on("click", function(event){
  event.preventDefault();
  modal.style.display = "block";
  zipCode = $("#addZip").val().trim();
  userurl = "https:www.google.com/maps/embed/v1/search?key=AIzaSyBGnB25L1jvt7LwgV8_YnEQoFx6SAcR048&q=grocery+stores+near+" + zipCode;
});
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


// // Initialize Firebase
// var config = {
//     apiKey: "AIzaSyB9zqrDimq0-II0wdrXEIga34C-dTJwoV0",
//     authDomain: "whats4dinner-eab75.firebaseapp.com",
//     databaseURL: "https://whats4dinner-eab75.firebaseio.com",
//     storageBucket: "whats4dinner-eab75.appspot.com",
//     messagingSenderId: "1061192161195"
// };
// firebase.initializeApp(config);

// var database = firebase.database();


// var recent = "";
// var favorite = "";
//
// $("#recentBtn").on("click", function(event){
// 	event.preventDefault();
//   recent =
//   firebase.database().push({
//     recent: recent
//   });
//
//   firebase.database().ref().on("child_added", function(snapshot){
//     $(".recent-list").append("<div>" + snapshot.val().recent + "</div>");
//   });
// });
//
// firebase.database().ref().orderByChild("dataAdded").limitToLast(1).on("value", function(snapshot){
// 	$(".recent-list").html(snapshot.val().name);
// });
