let password = document.getElementById("password");
let email = document.getElementById("email")
let emailControl = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let form = document.getElementById("form");
let sign = document.getElementById("sign");
let login = document.getElementById("login");

// localStorage.clear()

let oneTime = true;
let emailChecked = false;

email.addEventListener("input", ()=>{
    if(emailControl.test(email.value)){
        email.style.color = "white"
        emailChecked = true;
    }
    else{
        emailChecked = false;
        if(email.value !== ""){
            email.style.color = "red"
        }
    }
})


password.addEventListener("input", ()=>{
    let f=1;
    if(password.value === ""){
        let viewIcon = document.getElementsByClassName("viewButton");
        form.removeChild(viewIcon[0]); 
        oneTime = true;
        password.type = "password"
    }
    else if(oneTime == true){
        let viewIcon = document.createElement("button");
        viewIcon.classList.add("viewButton");
        form.appendChild(viewIcon);
        oneTime = false;
        
        viewIcon.addEventListener("click", ()=>{
            f++
            if(f%2==0){
              password.type = "text"  
            }
            else{
                password.type = "password"
            }
            viewIcon.classList.toggle("hideButton")
        })
    }
})

const id = JSON.parse(localStorage.getItem("id")) ?? { userEmail: [], userPassword: [] };


sign.addEventListener("click", ()=>{

    if(id){
        if(id.hasOwnProperty("userEmail")){
            if(id.userEmail.indexOf(email.value) !== -1){
                alert("This email has already been used, try to login")
                emailChecked = false;
            }
            else{
                emailChecked = true;
            }
        }
    }

    if(email.value!=="" && password.value!=="" && emailChecked==true){
        id.userEmail.push(email.value);
        id.userPassword.push(password.value); 

        window.location.replace("home.html");

        localStorage.setItem("id", JSON.stringify(id))

        
    }
    
})

login.addEventListener("click", ()=>{
    const getId = JSON.parse(localStorage.getItem("id"))

    if(getId){
        if(getId.hasOwnProperty("userEmail") && getId.hasOwnProperty("userPassword")){
            if(getId.userEmail.indexOf(email.value) !== -1 && getId.userPassword.indexOf(password.value) !== -1 && getId.userEmail.indexOf(email.value) === getId.userPassword.indexOf(password.value)){
                window.location.replace("home.html");
            }
            else if(getId.userEmail.indexOf(email.value) !== -1 && getId.userPassword.indexOf(password.value) === -1 || getId.userEmail.indexOf(email.value) !== getId.userPassword.indexOf(password.value)){
                alert("the password entered is incorrect")
            }
            else{
                alert("you are not registered yet, sign first")
            }
        }
    }
    else{
        alert("you are not registered yet, sign first")
    }
})

