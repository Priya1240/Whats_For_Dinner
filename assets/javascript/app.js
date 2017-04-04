// $('#ingSubmit').on('click', function() {
//     event.preventDefault();

//     var userInp = $('#addItem').val().trim();

//     var list = $('<ul>');
//     list.append('<li>' + userInp + '</li>');
//     $('.list').append(list);
//     $('#addItem').val('');
// });

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

// // #addZip
// // #searchZip
// // #groceryStores

// var zipCode;
// var userurl;
// $("#searchZip").on("click", function(event) {
//     event.preventDefault();
//     zipCode = $("#addZip").val().trim();
//     userurl = "https://www.google.com/maps/embed/v1/search?key=AIzaSyBGnB25L1jvt7LwgV8_YnEQoFx6SAcR048&q=grocery+stores+near+" + zipCode;

//     $("iframe").attr("src", userurl);

//     console.log("zipcode: " + zipCode);
//     console.log("userurl: " + userurl);
// });



// var recent = "";
// var favorite = "";

// $("#recentBtn").on("click", function(event) {
//     event.preventDefault();
//     recent =
//         firebase.database().push({
//             recent: recent
//         });

//     firebase.database().ref().on("child_added", function(snapshot) {
//         $(".recent-list").append("<div>" + snapshot.val().recent + "</div>");
//     });
// });

// firebase.database().ref().orderByChild("dataAdded").limitToLast(1).on("value", function(snapshot) {
//     $(".recent-list").html(snapshot.val().name);
// });

// $('#getRecipe').on('click', function() {
//     event.preventDefault();

// });

// $.ajax({url: url, method: "GET"});
// .done(function(response){
//   var results = response.data;
//   for (var i=0; i<results.length; i++) {
//     var
//     restults[i]
//   }
// })

// var authKey;
// var ingredients;
// var queryRecipe = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=" + findByIngredients + "&limitLicense=false&number=10&ranking=1";


// curl --get --include 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=apples%2Cflour%2Csugar&limitLicense=false&number=5&ranking=1' \
//   -H 'X-Mashape-Key: VS2DQ1Z8NsmshinFxHOYEzkSKA9Hp1dqzxFjsnBjVYMArEc4Ez' \
//   -H 'Accept: application/json'

function findRecipe(numRecipes, queryRecipe) {

    $.ajax({
    	
        url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/324694/analyzedInstructions?stepBreakdown=true",
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