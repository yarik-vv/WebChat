document.getElementById('logout').onclick = () => {
  let request = new XMLHttpRequest();
    request.open('POST', '/logout');
    request.send();
};