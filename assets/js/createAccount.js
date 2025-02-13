//! Variables
let redFlag = 0;
let newAccount = {}

// HTML elements
const txtNewUser = document.querySelector("#newUser");
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
    if(element == "user"){
        txtNewUser.className = "loginBoxTxt loginBoxTxt--Error";
        txtNewUser.focus();
    }

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
    if(element == "user"){
        txtNewUser.className = "loginBoxTxt";
    }

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
        if(!txtNewUser.value){
            activateTextBoxWarning("user");
            writeError("Debe crear un Nombre de Usuario");
            break;
        }

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

        redFlag = 0;
        for(i = 0; i < accounts.length; i++){
            if(txtNewUser.value == accounts[i].user){
                activateTextBoxWarning("user");
                writeError("El usuario ya existe");
                redFlag = 1;
                break;
            }
            
            if(txtNewEmail.value == accounts[i].username){
                activateTextBoxWarning("email");
                writeError("El correo se ha utilizado en otra cuenta");
                redFlag = 1;
                break;
            }
        }

        if(redFlag == 1){ break; }

        if(txtNewPassword.value != txtNewPasswordConfirm.value){
            activateTextBoxWarning("confirmation");
            writeError("Las contraseñas no coinciden");
            break;
        }

        newAccount = {
            user: txtNewUser.value,
            username: txtNewEmail.value,
            password: txtNewPassword.value
        }

        accounts.push(newAccount);
        localStorage.setItem('accountsDB', JSON.stringify(accounts));

        window.location.href = "index.html";
        break;  // Security Break, avoid loops
    } while(true);
}