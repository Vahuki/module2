function logout() {
    localStorage.setItem("isLogin", "false");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("cart");
    window.location.href = "index.html"; // chuyển hướng về trang chính
    document.getElementById("logout-btn").style.display = "none";
};


  