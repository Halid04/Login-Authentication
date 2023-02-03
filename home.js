let exitBtn = document.getElementById("ExitBtn")

const id = JSON.parse(localStorage.getItem("id"))

exitBtn.addEventListener("click", ()=>{
    
    window.location.replace("index.html");
    localStorage.setItem("id", JSON.stringify(id))

})