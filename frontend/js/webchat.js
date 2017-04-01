$('#logout').click(function () {
  $.ajax({
    url: "/logout",
    method: "POST"
  });
});