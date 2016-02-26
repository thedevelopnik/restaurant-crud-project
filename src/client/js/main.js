// add scripts

$(document).on('ready', function() {
  console.log('sanity check!');
});

$('#delete-res').on('click', function(e){
  var thisUrl = window.location.href;
  $.ajax({
    url: thisUrl,
    method: 'delete',
    success: function(data) {
      console.log('You deleted a restaurant!');
    }
  });
});
