//! Variables
let redFlag = 0;
let newAccount = {}

// HTML elements
const txtNewEmail = document.querySelector("#newEmail");
const txtNewPassword = document.querySelector("#newPassword");
const txtNewPasswordConfirm = document.querySelector("#newPasswordConfirm");
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
    desactivateTextBoxWarning("user");
    desactivateTextBoxWarning("email");
    desactivateTextBoxWarning("password");
    desactivateTextBoxWarning("passwordConfirm");
}

function activateTextBoxWarning(element){
    if(element == "email"){
        txtNewEmail.className = "loginBoxTxt loginBoxTxt--Error";
        txtNewEmail.focus();
    }
    
    if(element == "password"){
        txtNewPassword.className = "loginBoxTxt loginBoxTxt--Error";
        txtNewPassword.focus();
    }

    if(element == "passwordConfirm"){
        txtNewPasswordConfirm.className = "loginBoxTxt loginBoxTxt--Error";
        txtNewPasswordConfirm.focus();
    }
    
    if(element == "confirmation"){
        txtNewPassword.className = "loginBoxTxt loginBoxTxt--Error";
        txtNewPasswordConfirm.className = "loginBoxTxt loginBoxTxt--Error";
        txtNewPassword.focus();
    }
}

function desactivateTextBoxWarning(element){

    if(element == "email"){
        txtNewEmail.className = "loginBoxTxt";
    }
    
    if(element == "password"){
        txtNewPassword.className = "loginBoxTxt";
    }

    if(element == "passwordConfirm"){
        txtNewPasswordConfirm.className = "loginBoxTxt";
    }
}

function createAccount(){
    hideWarnings();

    do{
        // Avoid empty spaces
        if(!txtNewEmail.value){
            activateTextBoxWarning("email");
            writeError("Falta un Correo Electronico");
            break;
        }

        if(!txtNewPassword.value){
            activateTextBoxWarning("password");
            writeError("Falta una contraseña");
            break;
        }

        if(!txtNewPasswordConfirm.value){
            activateTextBoxWarning("passwordConfirm");
            writeError("Falta que confirme su contraseña");
            break;
        }

        if(txtNewPassword.value != txtNewPasswordConfirm.value){
            activateTextBoxWarning("confirmation");
            writeError("Las contraseñas no coinciden");
            break;
        }

        //? Call Python
        let username = txtNewEmail.value;
        let password = txtNewPassword.value;

        fetch("http://127.0.0.1:5000/registro", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => alert(data.mensaje || data.error))
        .catch(error => console.error("Error:", error));

        window.location.href = "index.html";
        break;  // Security Break, avoid loops
    } while(true);
}