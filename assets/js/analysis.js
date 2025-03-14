// Elementos del DOM
let optionPanel = document.querySelector('.optionPanel');
let userStats = document.querySelectorAll('.users');
let passwordStats = document.querySelectorAll('.password');
let interactionsStats = document.querySelectorAll('.interactions');


// VARIABLES
let showingMenu = true;

// Shows / Hides the panel side menu
function toggleMenu(){
    if(showingMenu == true){
        optionPanel.style.width = '4.2rem';
        showingMenu = false;
    } else {
        optionPanel.style.width = '15rem';
        showingMenu = true;
    }
}

// Change between stats
function showStats(stats){
    stats.forEach(element => {
        element.style.display = 'flex';
    });
}

function hideStats(stats){
    stats.forEach(element => {
        element.style.display = 'none';
    });
}

function changeStats(option){
    hideStats(userStats);
    hideStats(passwordStats);
    hideStats(interactionsStats);
    
    if(option == 'users'){
        showStats(userStats);
    }
    
    if(option == 'passwords'){
        showStats(passwordStats);
    }
    
    if(option == 'interactions'){
        showStats(interactionsStats);
    }
}