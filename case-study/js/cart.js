import { saveCart } from './script.js';
import { updateCartCount } from './script.js';
import { checkLogin } from './script.js';


// Lấy dữ liệu giỏ hàng từ localStorage hoặc khởi tạo mảng rỗng
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let order = JSON.parse(localStorage.getItem("order")) || [];

function openCartMobile(){
    let tableBody = document.getElementById("cart-mobile");
    if (!tableBody) {
        console.error("Phần tử với id='cart-mobile' không tồn tại trong DOM.");
        return;
    }
    tableBody.innerHTML = ""; // Clear previous items
    let total = 0;
    cart.forEach(item => {
        let content = document.createElement("div");
        content.className = "cart-item-mobile";
        content.innerHTML = `
            <div class="cart-item-mobile-left">
                <div style="flex:1">
                    <img src="${item.img}" width="100%" style="margin-top: 5px;" />
                </div>
                <div class="cart-item-mobile-info">
                    <h4 style="margin-top: 5px;">${item.name}</h4>
                    <p>${item.price.toLocaleString()} đ</p>
                    <p>Số lượng: ${item.qty}</p>
                </div>
                <div class="cart-item-mobile-remove">
                    <button class="btn-remove" onclick="removeItem(${item.id})">Xóa</button>
                    <br>
                    <input type="checkbox" class="checkbox-buy" data-id="${item.id}" style="width:50px;height:30px" />
                </div>
            </div>
            <br>
        `;
        tableBody.appendChild(content);
        total += item.price * item.qty;
    });

    // Gắn sự kiện change cho các checkbox
    document.querySelectorAll(".checkbox-buy").forEach(checkbox => {
        checkbox.addEventListener("change", updateCheckedTotal);
    });

    if (cart.length === 0) {
        let empty = document.getElementById("cart-emty");
        let cartTable = document.getElementById("cart-table");
        let pay = document.getElementById("cart-pay");
        if (pay) {
            pay.style.display = "none"; // Ẩn nút thanh toán
        }
        if (empty) {
            empty.style.display = "block"; // Hiển thị thông báo giỏ hàng rỗng
        }
        if (cartTable) {
            cartTable.style.display = "none"; // Ẩn bảng giỏ hàng
        }
       
    }
    // Hiển thị tổng tiền
    const totalElement = document.getElementById("total");
    if (totalElement) {
        totalElement.textContent = `Tổng cộng (${cart.length} sản phẩm): ${total.toLocaleString()} đ`;
    }
}
function openCart() {
    
    
    let tableBody = document.getElementById("cart-items");
    if (!tableBody) {
        console.error("Phần tử với id='cart-items' không tồn tại trong DOM.");
        return;
    }
    tableBody.innerHTML = ""; // Clear previous items
    let total = 0;
    cart.forEach(item => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${item.img}" width="105px" style="border:5px"/></td>
            <td>${item.name}</td>
            <td>${item.price.toLocaleString()} đ</td>
            <td>${item.qty}</td>
            <td>${(item.price * item.qty).toLocaleString()} đ</td>
            <td>
                <input type="checkbox" class="checkbox-buy" data-id="${item.id}" style="width: 100%;height: 50px;" />
            </td>
            <td>
                <button class="btn-remove" onclick="removeItem(${item.id})">Xóa</button>
            </td>
            `;  
        tableBody.appendChild(row);
        total += item.price * item.qty;
        
    });

    // Gắn sự kiện change cho các checkbox
    document.querySelectorAll(".checkbox-buy").forEach(checkbox => {
        checkbox.addEventListener("change", updateCheckedTotal);
    });

    if (cart.length === 0) {
        let empty = document.getElementById("cart-emty");
        let cartTable = document.getElementById("cart-table");
        let pay = document.getElementById("cart-pay");
        if (pay) {
            pay.style.display = "none"; // Ẩn nút thanh toán
        }
        
        if (empty) {
            empty.style.display = "block"; // Hiển thị thông báo giỏ hàng rỗng
        }
        if (cartTable) {
            cartTable.style.display = "none"; // Ẩn bảng giỏ hàng
        }
       
    }
    // Hiển thị tổng tiền
    const totalElement = document.getElementById("total");
    if (totalElement) {
        totalElement.textContent = `Tổng cộng (${cart.length} sản phẩm): ${total.toLocaleString()} đ`;
    }
    
}
function saveOrder() {
    localStorage.setItem("order", JSON.stringify(order));
}
function pay() {
    let checkboxes = document.querySelectorAll(".checkbox-buy:checked");
    if (checkboxes.length === 0) {
        alert("Vui lòng chọn ít nhất một sản phẩm!");
        return;
    }

    checkboxes.forEach(cb => {
        let id = parseInt(cb.dataset.id);
        const index = cart.findIndex(item => item.id === id);
        const now = new Date();
        const datetime = now.toLocaleString();
        if (index !== -1) {
            const product = cart[index]; // lấy sản phẩm từ giỏ hàng
            order.push({ ...product, qty: 1 ,date : `${datetime}`}); // thêm sản phẩm vào đơn mua
            saveOrder(); // hàm này bạn định nghĩa ở đâu đó để lưu đơn mua
            removeItem(id);
        }
    });

    Swal.fire({
        title: "Đặt hàng thành công.",
        icon: "success",
        confirmButtonText: "Xem đơn mua", // Đổi tên nút
        showCancelButton: true,            // Nếu muốn có thêm nút huỷ
        cancelButtonText: "Tiếp tục mua sắm",   // Tên nút huỷ
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = "/purchase.html"; // Link đến trang khác
        }else if (result.dismiss === Swal.DismissReason.cancel) {
            // Người dùng chọn "Về trang chủ"
            window.location.href = "/";
        }
    });
    
   
}

window.pay = pay;
// Gắn hàm removeItem vào đối tượng window để sử dụng trong HTML
window.removeItem = function (id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    if (window.innerWidth <= 768) {
        openCartMobile(); // Gọi hàm mở giỏ hàng cho mobile
    }
    else {
        openCart(); // Gọi hàm mở giỏ hàng cho desktop
    }
};

function updateCheckedTotal() {
    const checkboxes = document.querySelectorAll(".checkbox-buy:checked");
    let total = 0;

    checkboxes.forEach(cb => {
        const id = parseInt(cb.dataset.id);
        const item = cart.find(product => product.id === id);
        if (item) {
            total += item.price * item.qty;
        }
    });

    const totalElement = document.getElementById("total");
    if (totalElement) {
        totalElement.textContent = `Tổng cộng (${checkboxes.length} sản phẩm): ${total.toLocaleString()} đ`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (window.innerWidth <= 768) {
        openCartMobile(); // Gọi hàm mở giỏ hàng cho mobile
        document.getElementById("cart-table").style.display="none";
    }
    else {
        openCart(); // Gọi hàm mở giỏ hàng cho desktop
    }
});