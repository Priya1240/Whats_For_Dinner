// show reccommended recipes when page first loaded
$(function(){
  console.log("page loaded, show reccommended recipes in div #recipePreview");
});

var searchTerms = "";
var ingredientCode = 0
$('#ingSubmit').on('click', function() {
    event.preventDefault();
    var userInp = $('#addItem').val().trim();
    $(".form-control").val("");
    // add user input ingredients to searchTerms in queryURL
    if (searchTerms==""){
      searchTerms = userInp;
    } else if (searchTerms!=""){
      searchTerms = searchTerms + "%2C" + userInp; //"%2C" means ","
    }
    console.log("searchTerms:" + searchTerms);

    // add user input ingredients to list
    // var list = $('<ul>');
    // list.append('<li>' + userInp + '</li>');
    // $('.list').append(list);
    // $('#addItem').val('');


    // add user input ingredient as a button
    var list = $("<button>");
    var x = "\u2715"
    var blank = "\u00A0\u00A0"
    ingredientCode++
    console.log(ingredientCode)
    list.addClass("btn btn-default ingredientButton");
    list.text(userInp + blank + x);
    $(".list").append(list);
    console.log(list)

    // If user decides to remove item, ammend the list and string
    $('.ingredientButton').on('click', function(event) {
      $(this).remove();
      console.log(removedItem)
    });
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
    var showMeRecipe;

    // Display the Recipe Results in the Div
    for (var i=0; i<recipedata.length; i++) {
      var resultRecipe = $("<div>");
      resultRecipe.addClass("col-sm-2")
      var recipeThumb = $("<div>")
      recipeThumb.addClass("thumbnail")
      image = $("<img>").attr("src", recipedata[i].image);
      title = $("<h3>").text(recipedata[i].title);
      likes = $("<p>").text("Likes: " + recipedata[i].likes);
      showMeRecipe = $("<a>").attr("href", "recipe.html")
      showMeRecipe.attr("role", "button")
      showMeRecipe.attr("target", "blank")
      showMeRecipe.addClass("btn btn-primary")
      showMeRecipe.id("recipeButton")
      showMeRecipe.text("Show Me This Recipe")
      idNum = recipedata[i].id;
      recipeThumb.prepend(showMeRecipe)
      recipeThumb.prepend(likes)
      recipeThumb.prepend(title)
      recipeThumb.prepend(image)
      resultRecipe.prepend(recipeThumb)
      $("#recipePreview").append(resultRecipe);
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

          //  console.log("error");

          //  // **display error message for user in html
          // }

         //    // Logging the URL for troubleshooting access
         //    console.log("URL: " + queryRecipe);

         //    // Logging recipes to console
         //    console.log(recipes.length);

         //    // Loop through and provide the correct number of recipes
         //    for (var i = 0; i < recipes.length; i++) {

         //     // append to HTML section for recipes;
         //     var recipeSection = $("<div>");
         //     $("#unknown").append(recipes);
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
//  event.preventDefault();
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
//  $(".recent-list").html(snapshot.val().name);
// });