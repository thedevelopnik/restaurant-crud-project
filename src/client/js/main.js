// add scripts

$(document).on('ready', function() {
  console.log('sanity check!');
  $('#cancel').on('click', function(e) {
    e.preventDefault();
    location.href = '/';
  });
});
