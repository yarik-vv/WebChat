function logout(){
  let request = new XMLHttpRequest();
    request.open('POST', '/logout');
    request.send();
  location.href = "/";
}

module.exports = logout;