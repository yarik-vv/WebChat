$('#logout').click(function () {
  $('body').append('<form id=\'submitme\' method=\'POST\' action=\'/logout\'></form>');
  $('#submitme').submit();
  return false;
});