import { products } from './script.js';

window.showProduct =function(id) {
    // window.location.href = './product.html';
      
    // Lấy container chính để hiển thị chi tiết
    const main = document.getElementById("product-main");
    main.innerHTML="";
    // Tìm sản phẩm theo ID
    const item = products.find(p => p.id == id);
    if (!item) {
        main.innerHTML = "<p style='color: red;'>Sản phẩm không tồn tại.</p>";
        return;
    }

    // Tạo nội dung HTML cho chi tiết sản phẩm
    const content = document.createElement("div");
    

    content.innerHTML = `
        <div style="">
                <img onclick="backToList()" src="./icon/arrow-left.svg" style="width: 30px;">
        </div>
        <div style="display:flex; gap:30px; margin-top:20px; flex-wrap:wrap;">
        <div style="flex: 1; min-width: 300px;">
            <img src="${item.img}" alt="${item.name}" style="width: 100%; border-radius: 10px;box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);" />
        </div>
        <div style="justify-content: space-evenly;display: flex;flex-direction: column;flex: 2; min-width: 300px;">
            <h2 style="margin-bottom: 10px;">${item.name}</h2>
            <p><strong>Giá:</strong> ${item.price.toLocaleString()} đ</p>
            <p><strong>Số lượng:</strong> ${item.sl}</p>
            <br><br>
            <div style="margin-top: 20px;display: flex;gap: 10px;">
                <button type="button" class="btn" onclick="addToCart(${item.id},this);" >Thêm vào giỏ hàng</button>
                <button type="button" class="btn" onclick="buy(${item.id},this)" >Mua Ngay</button>
            </div>
        </div>
        </div>
        <div>
        <br>
        <h3>Chi tiết sản phẩm</h3>
        <p></p>
        </div>
    `;

    main.appendChild(content);
}
window.backToList = function() {
    window.location.href = './index.html';
}

// showProduct(id);
// Hàm lấy giá trị của query param từ URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const id = getQueryParam("id");
if (id) {
    showProduct(id); // Gọi hàm đã có sẵn trong script.js của bạn
} else {
    document.getElementById("product-main").innerHTML = "<p style='color:red;'>Không tìm thấy sản phẩm.</p>";
}
