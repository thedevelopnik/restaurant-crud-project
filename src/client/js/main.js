// add scripts

document.getElementById('date-picker').valueAsDate = new Date();

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
