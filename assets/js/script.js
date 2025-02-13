//! Variables
let redFlag = 0;
let activeUser;
let activeEmail;
let rememberedMe;
let rememberedEmail = localStorage.getItem('rememberedEmail');

// HTML elements
const txtUsername = document.querySelector("#username");
const txtPassword = document.querySelector("#password");
const lblWarnings = document.querySelector("#loginWarnings");
const chkRemember = document.querySelector("#loginCheckRemember");

// Functions
function showWarnings(){
    lblWarnings.style.display = "flex";
}

function writeError(error){
    showWarnings();
    lblWarnings.innerHTML = '<div class="loginError"><img src="assets/icons/advice.png" class="loginIcon">' + error + '</div>';
}

function hideWarnings(){
    lblWarnings.style.display = "none";
    desactivateTextBoxWarning("username");
    desactivateTextBoxWarning("password");
}

function activateTextBoxWarning(element){
    if(element == "username"){
        txtUsername.className = "loginBoxTxt loginBoxTxt--Error";
        txtUsername.focus();
    }
    
    if(element == "password"){
        txtPassword.className = "loginBoxTxt loginBoxTxt--Error";
        txtPassword.focus();
    }
}

function desactivateTextBoxWarning(element){
    if(element == "username"){
        txtUsername.className = "loginBoxTxt";
    }
    
    if(element == "password"){
        txtPassword.className = "loginBoxTxt";
    }
}

function rememberPreferences(){
    if(rememberedEmail != null || rememberedEmail != undefined){
        chkRemember.checked = 'true';
    }
}

function rememberUser(){
    if(chkRemember.checked){
        txtUsername.value = rememberedEmail;
    }
}

function startSession(user, username){
    sessionStorage.setItem('activeUser', user);
    sessionStorage.setItem('activeEmail', username);
}

function travelTo(link){
    window.location.href = link;
}

function login(){
    hideWarnings();

    if(txtUsername.value && txtPassword.value){
        redFlag = 1;
        for(i= 0; i < accounts.length; i++){
            if(txtUsername.value == accounts[i].username){
                if(txtPassword.value == accounts[i].password){
                    redFlag = 0;
                    
                    hideWarnings();
                    startSession(accounts[i].user, accounts[i].username);

                    if(chkRemember.checked){
                        localStorage.setItem('rememberedEmail', accounts[i].username)
                    } else {
                        localStorage.removeItem('rememberedEmail');
                    }
                    
                    travelTo("sessionStarted.html");
                    break;
                } else {
                    redFlag = 2;
                }
                break;
            }
        }
    
        switch(redFlag){
            case 1:
                activateTextBoxWarning("username");
                writeError("El correo electrónico no existe");
                break;

            case 2:
                activateTextBoxWarning("password");
                writeError("Contraseña incorrecta");
                break;
        }
        
    } else {
        if(!txtUsername.value){
            activateTextBoxWarning("username");
            writeError("Ingrese su Correo Electronico");
        } else if(!txtPassword.value){
            activateTextBoxWarning("password");
            writeError("Falta su contraseña");
        }
    }
}

rememberPreferences();
rememberUser();