//! Variables
let redFlag = 0;

// Accounts to make proofs
let accounts = [
    {
    username: "admin",
    password: "1234567890"
    },
    {
    username: "koko@gmail.com",
    password: "Pikachu2025"
    }
];

// HTML elements
const txtUsername = document.querySelector("#username");
const txtPassword = document.querySelector("#password");
const lblWarnings = document.querySelector("#loginWarnings");

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

function login(){
    hideWarnings();

    if(txtUsername.value && txtPassword.value){
        redFlag = 1;
        for(i= 0; i < accounts.length; i++){
            if(txtUsername.value == accounts[i].username){
                if(txtPassword.value == accounts[i].password){
                    redFlag = 0;
                } else {
                    redFlag = 2;
                }
                break;
            }
        }
    
        switch(redFlag){
            case 0:
                hideWarnings();
                window.location.href = "sessionStarted.html";
                break;

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