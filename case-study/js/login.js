// === Khởi tạo mảng users từ localStorage nếu có ===
let users = JSON.parse(localStorage.getItem("users")) || [];

class User {
  constructor(name, pass) {
    this.name = name;
    this.pass = pass;
  }

  check(otherUser) {
    return this.name === otherUser.name && this.pass === otherUser.pass;
  }
}

function loginStore() {
  const name = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  const msg = document.getElementById("message");

  const userLogin = new User(name, pass);
  const found = users.find(u => userLogin.check(u));

  if (found) {
    msg.innerText = "Đăng nhập thành công!";
    localStorage.setItem("isLogin", "true"); // Đánh dấu đã đăng nhập
    localStorage.setItem("currentUser", JSON.stringify(found)); // Lưu user đang đăng nhập
    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);
  } else {
    msg.innerText = "Sai tên đăng nhập hoặc mật khẩu!";
    setTimeout(() => {
        msg.innerText = "Vui lòng thử lại!";
      }, 2000);
  }
}

function registerStore() {
  const name = document.getElementById("register-name").value;
  const pass = document.getElementById("register-pass").value;
  const repass = document.getElementById("register-repass").value;
  const msg = document.getElementById("register-message");

  if (!name || !pass || !repass) {
    msg.innerText = "Vui lòng nhập đầy đủ thông tin";
    return;
  }

  if (pass !== repass) {
    msg.innerText = "Mật khẩu không khớp";
    return;
  }

  if (users.find(u => u.name === name)) {
    msg.innerText = "Tài khoản đã tồn tại!";
    return;
  }

  const newUser = new User(name, pass);
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users)); // Lưu lại danh sách user

  msg.innerText = "Đăng ký thành công!";

  // Xóa input sau khi đăng ký
  document.getElementById("register-name").value = "";
  document.getElementById("register-pass").value = "";
  document.getElementById("register-repass").value = "";
}

// Ẩn hiện form
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login");
  const registerForm = document.getElementById("register");

  registerForm.style.display = "none";

  window.register = function () {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
  };

  window.login = function () {
    loginForm.style.display = "block";
    registerForm.style.display = "none";
  };
});
