let products = ["Sony Xperia", "Samsung Galaxy", "Nokia 6", "Xiaomi Redmi Note 4", "Oppo A37", "Vivo V5", "HTC U11", "LG G6", "Motorola Moto G5", "Huawei P10"];
// Hàm này sẽ được gọi khi trang được tải
window.onload = function() {
    // Hiển thị danh sách sản phẩm ban đầu
    displayProducts();
    // Cập nhật số lượng sản phẩm
    updateCount();
}

function updateCount() {
    document.getElementById("countPro").innerText = products.length + " Products";
}

function displayProducts() {
    let tableBody = document.getElementById("productList");
    let content = "";

    products.forEach((product, index) => {
        content += `
            <tr>
                <td>${product}</td>
                <td><button onclick="editProduct(${index})">Edit</button></td>
                <td><button onclick="deleteProduct(${index})">Delete</button></td>
            </tr>
        `;
    });

    tableBody.innerHTML = content;
    updateCount(); // Cập nhật số lượng sản phẩm
}

function addProduct() {
    let input = document.getElementById("productName");
    let name = input.value.trim();

    if (name) {
        products.push(name);
        input.value = "";
        displayProducts();
        showMessage("Đã thêm sản phẩm.");
    } else {
        alert("Vui lòng nhập tên sản phẩm.");
    }
}

function editProduct(index) {
    let newName = prompt("Nhập tên mới:", products[index]);
    if (newName !== null && newName.trim() !== "") {
        products[index] = newName.trim();
        displayProducts();
        showMessage("Đã cập nhật sản phẩm.");
    }
}

function deleteProduct(index) {
    if (confirm("Bạn có chắc chắn muốn xoá sản phẩm này?")) {
        products.splice(index, 1);
        displayProducts();
        showMessage("Đã xoá sản phẩm.");
    }
}

function showMessage(text) {
    let message = document.getElementById("message");
    message.innerText = text;
    setTimeout(() => { message.innerText = ""; }, 2000); // Ẩn thông báo sau 2 giây
}

displayProducts();
