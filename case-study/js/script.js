const products = [
    { id: 1, name: "Áo thun", price: 150000, img: "img/shirt.jpg" },
    { id: 2, name: "Quần jeans", price: 250000, img: "img/jeans.jpg"},
    { id: 3, name: "Giày thể thao", price: 500000, img: "img/giay-the-thao.jpg" },
    { id: 4, name: "Mũ lưỡi trai", price: 100000, img: "img/mu-luoi-trai.jpg" },
    { id: 5, name: "Đồng hồ", price: 300000, img: "img/dong-ho.jpg" },
    { id: 6, name: "Kính mát", price: 200000, img: "img/glasses.jpg" },
    { id: 7, name: "Balo", price: 400000, img: "img/bag.jpg" },
    { id: 8, name: "Thắt lưng", price: 120000, img: "img/belt.jpg" },
    { id: 9, name: "Dép sandal", price: 180000, img: "img/sandal.jpg" },
    { id: 10, name: "Áo khoác", price: 350000, img: "img/jacket.jpg" },
    { id: 11, name: "Váy", price: 200000, img: "img/dress.jpg" },
    { id: 12, name: "Áo sơ mi", price: 220000, img: "img/shirt2.jpg" },
    { id: 13, name: "Quần short", price: 180000, img: "img/shorts.jpg" },
    { id: 14, name: "Giày cao gót", price: 600000, img: "img/highheels.jpg" },
    { id: 15, name: "Áo len", price: 250000, img: "img/sweater.jpg" },
    { id: 16, name: "Quần thể thao", price: 220000, img: "img/sportpants.jpg" },
    { id: 17, name: "Áo hoodie", price: 300000, img: "img/hoodie.jpg" },
    { id: 18, name: "Giày boot", price: 700000, img: "img/boots.jpg" },
    { id: 19, name: "Áo phao", price: 400000, img: "img/puffer.jpg" },
    { id: 20, name: "Quần legging", price: 200000, img: "img/legging.jpg" }
  ];
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  function renderProducts() {
    const list = document.getElementById("product-list");
    products.forEach(p => {
      const item = document.createElement("div");
      item.className = "product";
      item.innerHTML = `
        <div class="content">
          <img src="${p.img}" width="100%" />
          <h3>${p.name}</h3>
          <p>${p.price.toLocaleString()} đ</p>
          <p>Đánh giá: ${"⭐".repeat(5)}</p>
        </div>
        <div class="product-actions" style ="justify-content: space-between; display: flex; margin-top: 10px;">
          <button onclick="addToCart(${p.id})">Thêm vào giỏ</button>
          <button onclick="buy(${p.id})">Mua ngay</button>
        </div>
      `;
      list.appendChild(item);
    });

  }
  function buy(id) {
    const isLogin = localStorage.getItem("isLogin");
    if (checkLogin()) {
      addToCart(id);
      window.location.href='./cart.html'; // Chuyển hướng đến trang giỏ hàng
    }
  }
  function checkLogin() {
    const isLogin = localStorage.getItem("isLogin");
    if (isLogin === "true") {
      return true;
    }else {
      alert("Bạn cần đăng nhập để tiếp tục mua sắm.");
     return false;
    }
  }

  function addToCart(id) {
    if (!checkLogin()) {
      return;
    }
    const index = cart.findIndex(item => item.id === id);
    if (index !== -1) {
      cart[index].qty += 1;
    } else {
      const product = products.find(p => p.id === id);
      cart.push({ ...product, qty: 1 });
    }
    saveCart();
    updateCartCount();
  }
  
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  
  function updateCartCount() {
    document.getElementById("cart-count").textContent = cart.reduce((a, b) => a + b.qty, 0);
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const list = document.getElementById("product-list");
    if (list) {
        renderProducts();
        updateCartCount();
    } else {
        console.warn("Phần tử với id='product-list' không tồn tại trong DOM.");
    }
  });
    
    