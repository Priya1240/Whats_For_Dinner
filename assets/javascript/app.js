$('#ingSubmit').on('click', function() {
    event.preventDefault();

    var userInp = $('#addItem').val().trim();

    var list = $('<ul>');
    list.append('<li>' + userInp + '</li>');
    $('.list').append(list);
     $('#addItem').val('');
});




// Initialize Firebase
  var config = {
    apiKey: "AIzaSyB9zqrDimq0-II0wdrXEIga34C-dTJwoV0",
    authDomain: "whats4dinner-eab75.firebaseapp.com",
    databaseURL: "https://whats4dinner-eab75.firebaseio.com",
    storageBucket: "whats4dinner-eab75.appspot.com",
    messagingSenderId: "1061192161195"
  };
  firebase.initializeApp(config);


#addZip
#searchZip
#groceryStores

var zipCode;
var url;
$("#searchZip").on("click", function(event){
  event.preventDefault();
  zipCode = $("#addZip").val().trim();
  url = "https://www.google.com/maps/embed/v1/search?key=AIzaSyBGnB25L1jvt7LwgV8_YnEQoFx6SAcR048&q=grocery+stores+near+" + zipCode;
  $.ajax.({url: url, method: "GET"});


})



var recent = "";
var favorite = "";

$("#recentBtn").on("click", function(event){
	event.preventDefault();
  recent =
  firebase.database().push({
    recent: recent
  });

  firebase.database().ref().on("child_added", function(snapshot){
    $(".recent-list").append("<div>" + snapshot.val().recent + "</div>");
  });
});

firebase.database().ref().orderByChild("dataAdded").limitToLast(1).on("value", function(snapshot){
	$(".recent-list").html(snapshot.val().name);
});
