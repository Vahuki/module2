function logout() {
    localStorage.setItem("isLogin", "false");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("cart");
    window.location.href = "index.html"; // chuyển hướng về trang chính
    document.getElementById("logout-btn").style.display = "none";
}

if(checkLogin()){
    document.getElementById("login").style.display = "none";
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    document.getElementById("user-name").innerText = currentUser.name;
}else{
    document.getElementById("logout").style.display = "none";
}
  