// Lấy dữ liệu giỏ hàng từ localStorage hoặc khởi tạo mảng rỗng
let cart = JSON.parse(localStorage.getItem("cart")) || [];

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
                <img src="${item.img}" width="10%" />
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
    // Hiển thị tổng tiền
    const totalElement = document.getElementById("cart-total");
    if (totalElement) {
        totalElement.textContent = `Tổng tiền: ${total.toLocaleString()} đ`;
    }
}

// Gắn hàm removeItem vào đối tượng window để sử dụng trong HTML
window.removeItem = function (id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    openCart(); // Cập nhật giỏ hàng sau khi xóa
};

document.addEventListener("DOMContentLoaded", () => {
    openCart(); // Chỉ gọi openCart() khi DOM đã sẵn sàng
});