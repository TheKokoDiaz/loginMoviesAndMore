// Variables
let activeUser = sessionStorage.getItem('activeUser');
let activeEmail = sessionStorage.getItem('activeEmail');
let lblWelcome = document.querySelector('.logedWelcome');

if(activeUser == null || activeUser == undefined){
    window.location.href = "index.html";
}

function writeWelcome(){
    lblWelcome.innerText = "¡Bienvenido " + activeUser + "!";
}

writeWelcome();