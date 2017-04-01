module.exports = {
document.getElementById('logout').onclick = function(){
  let request = new XMLHttpRequest();
  request.open('POST', '/logout');
  request.send();
};
}