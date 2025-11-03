const login = document.getElementById('login'); 
const email = document.getElementById('email'); 
const pass = document.getElementById('pass'); 
const pass2 = document.getElementById('pass2');
const btnSubmit = document.querySelector('button.submit');
const btnClear = document.querySelector('button.clear');
const popUp = document.querySelector('div.popup');
const btnClose = document.querySelector('button.close')
const wrapper = document.querySelector('div.wrapper')
const toCheck = [login, email, pass, pass2];

const showError = (element,msg) => {
    element.parentElement.classList.add('error');
    element.parentElement.querySelector('p.error').textContent = msg;
}
const clearErrors = (element) => {
    element.parentElement.classList.remove('error');
    element.parentElement.querySelector('p.error').textContent = 'error';
};
const checkLength = (input,min) => {
    if (input.value.length<min && input.value.length) {
        showError(input,`${input.previousElementSibling.textContent.slice(0,-1)} musi składać się z co najmniej ${min} znaków`);
    };
};
const checkPass = (passw1,passw2) => {
    if (passw1 !== passw2) {
        showError(pass2,'Hasła nie są identyczne')
    }
};
const chceckEmail = (email) => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(!emailRegex.test(email.value) && email.value){
            showError(email,'Niepoprawny adres e-mail');
          }
      };
    const checkErrors = () => {
        const formBox = document.querySelectorAll('div.form-box.error');
        if (!formBox.length) {
            popUp.classList.add('active');
            wrapper.classList.add('active');
        };
    };
const submitForm = (e) => {
    e.preventDefault();
    toCheck.forEach((element) => {
        if(element.value) {
            clearErrors(element);
        }
        else {
            showError(element,element.placeholder)
        }
    })
    checkLength(login,3);
    checkLength(pass,8)
    checkPass(pass.value,pass2.value);
    chceckEmail(email);
    checkErrors();
}
const clearForm = (e) => {
    e.preventDefault();
    toCheck.forEach(element => {
        element.value = '';
        clearErrors(element);
    });
};

const removePopup = () => {
    popUp.classList.remove('active');
    wrapper.classList.remove('popup');
};

btnClear.addEventListener('click',clearForm);
btnSubmit.addEventListener('click',submitForm);
btnClose.addEventListener('click',removePopup)