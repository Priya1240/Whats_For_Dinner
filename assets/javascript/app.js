$('#ingSubmit').on('click', function() {
    event.preventDefault();

    var userInp = $('#addItem').val().trim();

    var list = $('<ul>');
    list.append('<li>' + userInp + '</li>');
    $('.list').append(list);
     $('#addItem').val('');
});

$('#getRecipe').on('click', function(){
	event.preventDefault();

});