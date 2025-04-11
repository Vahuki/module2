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
                    <br>
                    <input type="checkbox" class="checkbox-buy" data-id="${item.id}" style="width:50px;height:30px" />
                </div>
            </div>
            <br>
           `;
        tableBody.appendChild(content);
        total += item.price * item.qty;
        let btnBuy = document.getElementById("buy-btn");
        btnBuy.innerText += `onclick="buy(${p.id})"`;
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
                <input type="checkbox" class="checkbox-buy" data-id="${item.id}" style="width: 100%;height: 50px;" />
            </td>
            <td>
                <button class="btn-remove" onclick="removeItem(${item.id})">Xóa</button>
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
function pay() {
    let checkboxes = document.querySelectorAll(".checkbox-buy:checked");
    if (checkboxes.length === 0) {
        alert("Vui lòng chọn ít nhất một sản phẩm!");
        return;
    }

    checkboxes.forEach(cb => {
        let id = parseInt(cb.dataset.id);
        const index = cart.findIndex(item => item.id === id);
        if (index !== -1) {
            // Ở đây bạn có thể xử lý mua hàng hoặc gửi dữ liệu đi server nếu cần
            console.log(`Mua sản phẩm: ${cart[index].name} - SL: ${cart[index].qty}`);
        }
    });

    // Sau khi xử lý mua hàng, bạn có thể xóa các sản phẩm đó khỏi giỏ:
    cart = cart.filter(item => {
        return !Array.from(checkboxes).some(cb => parseInt(cb.dataset.id) === item.id);
    });

    //saveCart();
    alert("Đặt hàng thành công!");
    
    // Cập nhật lại giao diện
    if (window.innerWidth <= 768) {
        openCartMobile();
    } else {
        openCart();
    }
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

document.addEventListener("DOMContentLoaded", () => {
    if (window.innerWidth <= 768) {
        openCartMobile(); // Gọi hàm mở giỏ hàng cho mobile
    }
    else {
        openCart(); // Gọi hàm mở giỏ hàng cho desktop
    }
});