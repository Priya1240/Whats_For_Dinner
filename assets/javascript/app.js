$(document).ready(function() {
    $("body").fadeIn(2000);
    $(".navbar").hide();
    $("#steps").hide();
    $("#yourRecipes").hide();
    $("#trending").hide();

    $( "#start" ).click(function() {
        $(".splash").fadeOut(1000);
        $(".navbar").delay(1000).fadeIn(1000);
        $("#steps").delay(1000).fadeIn(1000);
        $("#trending").delay(1000).fadeIn(3000);
    });
});

$("#trendButton").on("click", function() {
  $("#yourRecipes").hide();
  $("#trending").delay(1000).fadeIn(3000);
});

$(".addItem").focus();

// show reccommended recipes when page first loaded
$(function() {
    console.log("page loaded, show reccommended recipes in div #recipePreview");
});

var idNum = "";
var searchTerms = "";
var ingredientCode = 0
$('#ingSubmit').on('click', function() {
    event.preventDefault();
    var userInp = $('#addItem').val().trim();
    $(".form-control").val("");
    // add user input ingredients to searchTerms in queryURL
    if (searchTerms === "") {
        searchTerms = userInp;
    } else if (searchTerms !== "") {
        searchTerms = searchTerms + "%2C" + userInp; //"%2C" means ","
    }

    console.log("searchTerms: " + searchTerms);
    var list = $("<button>");
    list.attr("data-type", userInp);
    var x = "\u2715";
    var blank = "\u00A0\u00A0";
    ingredientCode++;
    console.log("ingredientCode: " + ingredientCode);
    list.addClass("ingredientButton");
    list.text(userInp + blank + x);
    $(".list").append(list);
    console.log("list: " + list);
});

// If user decides to remove item, amend the searchTerms in URL
$(document).on('click', ".ingredientButton", function(event) {
    event.preventDefault();
    $(this).remove();
    var type = $(this).data("type");
    if (searchTerms === type) {
        searchTerms = ""; //only one search term
    } else if (searchTerms.startsWith(type)) {
        searchTerms = searchTerms.replace(type + "%2C", ""); //delete the first seach term
    } else {
        searchTerms = searchTerms.replace("%2C" + type, ""); // delete search term(s) located not in the first place
    }
    console.log("searchTerms: " + searchTerms);
});

// show search results of recipe preview: image, title, and likes
$('#getRecipe').on('click', function showResults() {
    event.preventDefault();
    $("#trending").hide();
    $("#yourRecipes").delay(1000).fadeIn(1000);
    $("#recipePreview").empty();
    var recipeResults = $(this).attr("data-results");
    var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=" + searchTerms + "&limitLicense=false&number=5&ranking=1";
    $.ajax({
            url: queryURL,
            method: "GET",
            dataType: "JSON",
            headers: { "X-Mashape-Key": "VS2DQ1Z8NsmshinFxHOYEzkSKA9Hp1dqzxFjsnBjVYMArEc4Ez" }
        })
        .done(function(response) {
            //console.log(response);
            var recipedata = response;
            console.log(recipedata);
            var image;
            var title;
            var likes;

            // Display the Recipe Results in the Div
            for (var i = 0; i < recipedata.length; i++) {
                var featureHead = $("<hr>")
                featureHead.addClass("featurette-divider")
                var resultRecipe = $("<div>");
                resultRecipe.addClass("row featurette")
                var recipeImage = $("<div>")
                recipeImage.addClass("col-md-5")
                var recipeThumb = $("<div>")
                recipeThumb.addClass("col-md-7")
                image = $("<img>");
                image.addClass("featurette-image img-fluid mx-auto");
                image.attr("src", recipedata[i].image);
                title = $("<h2>").text(recipedata[i].title);
                likes = $("<p>").text("Likes: " + recipedata[i].likes);
                showMeRecipe = $("<button>")
                showMeRecipe.attr("target", "blank")
                showMeRecipe.addClass("btn")
                showMeRecipe.addClass("recipeButton")
                showMeRecipe.text("Show Me This Recipe")
                showMeRecipe.attr("recipeID", recipedata[i].id) // add id to button, #recipeID will be used in full recipe URL
                idNum = recipedata[i].id;
                recipeImage.prepend(image)
                recipeThumb.prepend(showMeRecipe)
                recipeThumb.prepend(likes)
                recipeThumb.prepend(title)
                resultRecipe.prepend(recipeImage)
                resultRecipe.prepend(recipeThumb)
                resultRecipe.prepend(featureHead)
                $("#recipePreview").append(resultRecipe);
            }
        });

    $(document).on("click", ".recipeButton", function(event) {
        event.preventDefault();
        $.ajax({
            url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + $(this).attr("recipeID") + "/information?includeNutrition=false",
            method: "GET",
            dataType: "JSON",
            headers: {
                "X-Mashape-Key": "VS2DQ1Z8NsmshinFxHOYEzkSKA9Hp1dqzxFjsnBjVYMArEc4Ez"
            },
             success: function(recipes) {
               var chosenRecipe = recipes.sourceUrl;
               window.open(recipes.sourceUrl);
             }
        });
    })
});


// Get the modal
var modal = $('#myModal')[0];
// Get the button that opens the modal
var mapbtn = $("#openmap")[0];
// Get the <span> element that closes the modal
var span = $(".close")[0];
// When the user clicks on the button, open the modal
$("#openmap").on("click", function(event) {
    event.preventDefault();
    modal.style.display = "block";
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

$("#searchZip").on("click", function() {
    zipCode = $("#addZip").val().trim();
    userurl = "https:www.google.com/maps/embed/v1/search?key=AIzaSyBGnB25L1jvt7LwgV8_YnEQoFx6SAcR048&q=grocery+stores+near+" + zipCode;
    $("#storeMap").attr("src", userurl);
});