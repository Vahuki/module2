class user {
    name;
    pass;
    constructor(name, pass) {
        this.name = name;
        this.pass = pass;
    }

    check(otherUser) {
        return this.name === otherUser.name && this.pass === otherUser.pass;
    }
}
let islogin = false; // Biến toàn cục lưu trạng thái đăng nhập
let registeredUser = null; // Biến toàn cục lưu người dùng đã đăng ký

function loginStore() {
    const name = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    const user1 = new user(name, pass);

    const savedUser = JSON.parse(localStorage.getItem("user")); // Lấy user đã đăng ký
    const msg = document.getElementById("message");

    if (savedUser) {
        const user2 = new user(savedUser.name, savedUser.pass);
        if (user1.check(user2)) {
            msg.innerText = "Đăng nhập thành công";
            localStorage.setItem("isLogin", "true"); // Đánh dấu đã đăng nhập
            setTimeout(() => {
                msg.innerText = "chuyển hướng đến trang chủ sau 3s";
            }, 2000);
            setTimeout(() => {
                window.location.href = "index.html"; // Chuyển hướng đến trang chủ
            }, 5000); // 3 giây
        } else {
            msg.innerText = "Sai tên đăng nhập hoặc mật khẩu";

            // Ẩn sau 2 giây
            setTimeout(() => {
                msg.innerText = "";
            }, 2000);
        }
    } else {
        msg.innerText = "Chưa có tài khoản nào được đăng ký";

        // Ẩn sau 2 giây
        setTimeout(() => {
            msg.innerText = "";
        }, 2000);
    }
}



function registerStore() {
    const name = document.getElementById("register-name").value;
    const pass = document.getElementById("register-pass").value;
    const repass = document.getElementById("register-repass").value;

    if (name == "" || pass == "" || repass == "") {
        document.getElementById("register-message").innerText = "Vui lòng nhập đầy đủ thông tin";
    } else if (pass != repass) {
        document.getElementById("register-message").innerText = "Mật khẩu không khớp";
    } else {
        const user2 = new user(name, pass);
        localStorage.setItem("user", JSON.stringify(user2)); // Lưu vào localStorage
        document.getElementById("register-message").innerText = "Đăng ký thành công";
       
       
    } 
}


document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login");
    const registerForm = document.getElementById("register");

    window.register = function () {
        if (loginForm && registerForm) {
            loginForm.style.display = "none";
            registerForm.style.display = "block";
        }
    };

    window.login = function () {
        if (loginForm && registerForm) {
            loginForm.style.display = "block";
            registerForm.style.display = "none";
        }
    };
});
