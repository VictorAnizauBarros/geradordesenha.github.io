const btnGerarSenha = document.querySelector('#generate'); 

function getCharTypes(){
    const upperCase = document.querySelector('#include_uppercase').checked;
    const lowerCase = document.querySelector('#include_lowercase').checked;
    const number = document.querySelector('#include_number').checked;
    const specialCharactere = document.querySelector('#include_special_charactere').checked;

    const charTypes = []; 

    if(upperCase){
        charTypes.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    }
    if(lowerCase){
        charTypes.push('abcdefghijklmnopqrstuvwxyz');
    }
    if(number){
        charTypes.push('123456789');
    }

    if(specialCharactere){
        charTypes.push('!@#$%¨&*()-+=\\{}[]´~^\'')
    }


    return charTypes;
}

function getPasswordSize(){
    const size = document.querySelector('#size').value;
    if(isNaN(size) || size < 4 || size > 120){
        alert('Tamanho inválido, digite um valor entre 4 e 120')
    }

    return size;
}
function randomChartype(charTypes){
    const randomIndex = Math.floor(Math.random() *charTypes.length);
    return charTypes[randomIndex][Math.floor(Math.random()* charTypes[randomIndex].length)];
}

function generatePassword(size, charTypes){
    let passwordGenerated = ''; 

    while(passwordGenerated.length < size){
        passwordGenerated += randomChartype(charTypes);
    }

    return passwordGenerated;
}

btnGerarSenha.addEventListener('click', ()=>{
    const password = document.querySelector('#password');
    const size = getPasswordSize();
    const charType = getCharTypes();
    const passwordGenerated = generatePassword(size,charType); 
    password.innerHTML = `${passwordGenerated}`;
})