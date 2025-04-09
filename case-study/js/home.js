let tk = document.getElementById("user-name");

const isLogin = localStorage.getItem("isLogin");

if (isLogin === "true") {
    const registeredUser = JSON.parse(localStorage.getItem("user"));
    if (registeredUser) {
        tk.innerHTML = registeredUser.name;
    } 
    
} 
