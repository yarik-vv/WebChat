function AJAXrequest(id){
  return new Promise(function(resolve, reject) {
    
    if(process.env.NODE_ENV == 'test'){
      const xhr = require('xhr2');
      var request = new xhr();
    }
    else{
      var request = new XMLHttpRequest();
    }

    if(id==='login'){
      var form = document.forms['login'];
      var data = serialize(form);
      var path = '/';
    }
    else if(id==='logout'){
      var data = '';
      var path = '/logout';
    }
    else if(process.env.NODE_ENV == 'test' && id==='test'){
      var data = 'id=test';
      var path = 'http://127.0.0.1:4000/';
    }
    else{
      var data = "id=" + encodeURIComponent(id);
      var path = '/users';
    }

    request.onreadystatechange = function() {
      if(request.readyState === 4) {
        if(request.status === 200){
          resolve();
        }
        else{
          reject(new Error(request.responseText));
        }
      }
    };
    request.open('POST', path);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded', "text/html");
    request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    request.send(data);
  });
}

function serialize(selectForm) {
  let string = [];
  for(let i=0; i<2; i++) {
    string.push(selectForm.elements[i].name + "=" + encodeURIComponent(selectForm.elements[i].value));
  }
  return string.join("&");
};

module.exports = AJAXrequest;