// add scripts

$(document).on('ready', function() {
  console.log('sanity check!');
});

function outputUpdate(rat) {
	document.querySelector('#faderOutput').value = 'Rating: ' + rat + ' Stars';
}
