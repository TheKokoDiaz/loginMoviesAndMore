let accounts;
let checkAccounts = JSON.parse(localStorage.getItem('accountsDB'));

if(checkAccounts == undefined || checkAccounts == null){
    // Accounts to make proofs
    accounts = [
        {
            user: "Administrador",
            username: "admin",
            password: "1234567890"
        },
        {
            user: "El Koko Díaz",
            username: "koko@gmail.com",
            password: "Pikachu2025"
        }
    ];
} else {
    accounts = checkAccounts;
}