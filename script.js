'use strict';

const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2")

//Functions
function checkEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(String(email.value.trim()).toLowerCase())){
        showSuccess(email);
    }
    else{
        showError(email,'Email is not valid')
    }
}

const checkPasswordMatch = function(input1,input2){
    if(input1.value != input2.value){
        showError(input2,'Passwords do not match')
    }
    else{
        showSuccess(input2)
    }
} 

const showError = function(input,message){
    const formControl = input.parentElement;
    formControl.classList.add('error');
    const small = formControl.querySelector('small');
    small.innerText = message;
}

const showSuccess = function(input){
    const formControl = input.parentElement;
    formControl.classList.remove('error');
    formControl.classList.add('success')
}

const getFieldName = function(name){
    return (`${name.id[0].toUpperCase()}${name.id.slice(1)}`);
}

const checkRequired = function(inputArr){
    inputArr.forEach(function(input){
        if(input.value.trim() === ''){
            showError(input,`${getFieldName(input)} is required!`);
        }
        else{
            showSuccess(input)
        }
    })
}

const checkLength = function(input, min,max){
    if(input.value.length > max || input.value.length < min){
        showError(input,`${getFieldName(input)} should be between ${min} to ${max} characters.`)
    }
}

//Event Listeners
form.addEventListener('submit',function(e){
    e.preventDefault();
    checkRequired([username,email,password]);
    checkLength(username,3,15);
    checkLength(password,6,25);
    checkEmail(email);
    checkPasswordMatch(password,password2)
})

