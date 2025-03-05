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

    do{
        if(!txtUsername.value){
            activateTextBoxWarning("username");
            writeError("Ingrese su Correo Electronico");
            break;
        }
        
        if(!txtPassword.value){
            activateTextBoxWarning("password");
            writeError("Falta su contraseña");
            break;
        }

        hideWarnings();
        startSession(txtUsername.value, txtPassword.value);

        if(chkRemember.checked){
            localStorage.setItem('rememberedEmail', txtUsername.value);
        } else {
            localStorage.removeItem('rememberedEmail');
        }
        
        //? Call Python
        let username = txtUsername.value;
        let password = txtPassword.value;

        fetch("http://127.0.0.1:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.mensaje || data.error) // Muestra alerta si hay error
            } else {
                setTimeout(() => {
                    window.location.href = "sessionStarted.html"; // Cambia a otra ventana
                }, 1000); // Espera 2 segundos antes de redirigir
            }
        })
        break;
    } while(true);
} 
    
rememberPreferences();
rememberUser();