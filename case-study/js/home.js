const isLogin = localStorage.getItem("isLogin");
if (isLogin === "true") {
    // đã đăng nhập, hiển thị tên người dùng, ví dụ:
    document.getElementById("header-navbar").style.display = "none";
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    document.getElementById("user-name").innerText = currentUser.name;
    document.getElementById("logout-btn").style.display = "block";  
    if (window.innerWidth<768){
        document.getElementsByClassName("header-container")[0].style.padding = "20px 0px 0px 0px";
        document.getElementById("ic-user").style.width = "75%";
    }
}else {
    // chưa đăng nhập, ẩn tên người dùng
    document.getElementById("header-navbar").style.display = "flex";

    document.getElementById("logout-btn").style.display = "none";  
    localStorage.removeItem("cart");
    if (window.innerWidth<768){
        document.getElementById("ic-user").style.width = "100%";
    }

}

function logout() {
    localStorage.setItem("isLogin", "false");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("cart");
    document.getElementById("logout-btn").style.display = "none";
    window.location.href = "index.html"; // chuyển hướng về trang chính
}
  