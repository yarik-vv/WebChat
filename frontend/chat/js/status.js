const chat = document.getElementById('chat');
const scrollHeight = 999999;

function printStatus(status, color){
  const statusMessage = document.createElement('li');
    
  statusMessage.className = 'log';
  statusMessage.style.backgroundColor = color;
  statusMessage.innerHTML = status;

  chat.appendChild(statusMessage);
  chat.scrollTop = scrollHeight;
}

module.exports = printStatus;