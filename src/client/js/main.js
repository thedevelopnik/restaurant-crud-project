// add scripts
var date = document.getElementById('date-picker');
if (date) {
  date.valueAsDate = new Date();
}


function delRes () {
  var thisUrl = window.location.href;
  $.ajax({
    url: thisUrl,
    method: 'DELETE',
    success: function(data) {
      console.log(data);
      alert('You deleted a restaurant!');
      window.location.href='/';
    }
  });
}

$('#delete-res').on('click', function(e){
  delRes();
});

$('#rateit1').on('click', function() {
  var ratingVal = $('#rateit1').rateit('value');
  console.log(ratingVal);
  $('#backing2').attr('value', ratingVal);
});

var truncated = $('.truncate');
console.log(truncated);
var truncLength = 35;

truncated.each(function() {
  var text = $(this).html();
  if (text.length > truncLength) {
    $(this).html(text.slice(0, truncLength) + '<a href="#" class="expand"><span>...</span></a>' +
  '<span style="display: none;">' + text.slice(truncLength, text.length));
  }
});

$('.expand').on('click', function() {
  event.preventDefault();
  $(this).hide();
  $(this).next().show();
});
