//Seleção dos elementos html.
    //Botões
    const btnGerarSenha = document.querySelector('#generate'); 
    const btnCopiar = document.querySelector('#copy');

    //Senha
    const passwordContainer = document.querySelector('#password_container'); 
    const password = document.querySelector('#password');

    //Checkboxs 
    const checkboxIncludeUpperCase = document.querySelector('#include_uppercase');
    const checkboxIncludeLowerCase = document.querySelector('#include_lowercase');
    const checkboxIncludeNumber = document.querySelector('#include_number');
    const checkboxIncludeSpecialCharactere = document.querySelector('#include_special_charactere');

    //Constantes dos tipos de caracteres.
    const UPPER_CASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; 
    const LOWER_CASE = 'abcdefghijklmnopqrstuvwxyz';
    const NUMBER = '123456789';
    const SPECIAL_CHARACTERS = '!@#$%¨&*()-+=\\{}[]´~^\'';

    // Função que verifica quais os tipos de caracteres selecionados.
    function getCharTypes(){

        const charTypes = []; 

        if(checkboxIncludeUpperCase.checked){
            charTypes.push(UPPER_CASE);
        }
        if(checkboxIncludeLowerCase.checked){
            charTypes.push(LOWER_CASE);
        }
        if(checkboxIncludeNumber.checked){
            charTypes.push(NUMBER);
        }

        if(checkboxIncludeSpecialCharactere.checked){
            charTypes.push(SPECIAL_CHARACTERS); 
        }
        return charTypes;
    }
    //Função para "pegar" o tamanho da senha. 
    function getPasswordSize(){
        const size = parseInt(document.querySelector('#size').value);
        if(isNaN(size) || size < 4 || size > 120){
            message('Tamanho inválido, digite um número entre 4 e 120.', 'error');
            return;
        }

        return size;


    }

    //Função que seleciona aleatoriamente um caractere dos tipos de caracteres selecionados. 
    function randomChartype(charTypes){
        const randomIndex = Math.floor(Math.random() * charTypes.length); 
        const selectedType = charTypes[randomIndex];
        const randomCharIndex = Math.floor(Math.random() * selectedType.length);

        return selectedType[randomCharIndex]; 
    }

    //Função que gera a senha.
    function generatePassword(size, charTypes) {
        let passwordGenerated = '';
        const charTypeLengths = charTypes.map(type => type.length);
        
        for (let i = 0; i < size; i++) {
            const randomCharTypeIndex = Math.floor(Math.random() * charTypes.length);
            const selectedType = charTypes[randomCharTypeIndex];
            const randomCharIndex = Math.floor(Math.random() * selectedType.length);
            passwordGenerated += selectedType[randomCharIndex];
            }
        
            return passwordGenerated;
        }
    //Função que exibe feedbacks aos usuários.
    function message(text, status = 'success'){
        Toastify({
            text: text, 
            duration: 3000,
            style: {
                background: status === 'success'?'#8bc34a':'#dc2626',
                boxShadow: 'none'
            }
        }).showToast();
    }

//Eventos:

/* Ao clicar no botão "Gerar Senha", são executadas as funções "getPasswordSize" e "getCharTypes"
   para obter o tamanho desejado da senha e os tipos de caracteres selecionados. Em seguida, são
   realizadas duas validações: uma para verificar se o tamanho da senha é válido e outra para 
   garantir que pelo menos um tipo de caractere tenha sido selecionado. Se ambas as condições forem
   atendidas, a função "generatePassword" é chamada para gerar a senha utilizando o tamanho e os
   tipos de caracteres obtidos. Após gerar a senha, a classe "show" é adicionada à div que contém
   o campo de senha (passwordContainer) para exibir a senha gerada na interface. */ 
    btnGerarSenha.addEventListener('click', ()=>{
        const size = getPasswordSize();
        const charType = getCharTypes();
        

        if(!size){
            return;
        }
        if(!charType.length){
            message('Selecione, ao menos, um tipo de caractere', 'error'); 
            return;
        }
            
            
        const passwordGenerated = generatePassword(size,charType);
        passwordContainer.classList.add('show');
        password.textContent = passwordGenerated;

            
    
    }); 

    btnCopiar.addEventListener('click', ()=>{
        navigator.clipboard.writeText(password.textContent);
        message('Copiado para área de transferência.', 'success');
    });