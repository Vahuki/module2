// Lấy dữ liệu giỏ hàng từ localStorage hoặc khởi tạo mảng rỗng
let cart = JSON.parse(localStorage.getItem("cart")) || [];
function openCartMobile(){
    let tableBody = document.getElementById("cart-mobile");
    if (!tableBody) {
        console.error("Phần tử với id='cart-mobile' không tồn tại trong DOM.");
        return;
    }
    tableBody.innerHTML = ""; // Clear previous items
    let total = 0;
    cart.forEach(item => {
        document.getElementById("cart-table").style.display = "none"; // Ẩn thông báo giỏ hàng rỗng
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
                </div>
            </div>
            <br>
           `;
        tableBody.appendChild(content);
        total += item.price * item.qty;
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
            <td style="display: flex; justify-content: space-between; align-items: center;"> 
                ${item.name}
                <img src="${item.img}" width="25%" />
            </td>
            <td>${item.price.toLocaleString()} đ</td>
            <td>${item.qty}</td>
            <td>${(item.price * item.qty).toLocaleString()} đ</td>
            <td>
                <button class="btn btn-danger" onclick="removeItem(${item.id})">Xóa</button>
            </td>
            `;
        tableBody.appendChild(row);
        total += item.price * item.qty;
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

document.addEventListener("DOMContentLoaded", () => {
    if (window.innerWidth <= 768) {
        openCartMobile(); // Gọi hàm mở giỏ hàng cho mobile
    }
    else {
        openCart(); // Gọi hàm mở giỏ hàng cho desktop
    }
});