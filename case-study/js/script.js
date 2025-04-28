export const products = [
    { id: 1,group:"ao", name: "Áo thun", price: 150000,sl: 11, img: "img/shirt.jpg" },
    { id: 2,group:"quan", name: "Quần jeans", price: 250000,sl: 11, img: "img/jeans.jpg"},
    { id: 3,group:"giay", name: "Giày thể thao", price: 500000,sl: 11, img: "img/giay-the-thao.jpg" },
    { id: 4,group:"phukien", name: "Mũ lưỡi trai", price: 100000,sl: 11, img: "img/mu-luoi-trai.jpg" },
    { id: 5,group:"phukien", name: "Đồng hồ", price: 300000,sl: 11, img: "img/dong-ho.jpg" },
    { id: 6,group:"phukien", name: "Kính mát", price: 200000,sl: 11, img: "img/glasses.jpg" },
    { id: 7,group:"phukien", name: "Balo", price: 400000,sl: 11, img: "img/bag.jpg" },
    { id: 8,group:"phukien", name: "Thắt lưng", price: 120000,sl: 11, img: "img/belt.jpg" },
    { id: 9,group:"giay", name: "Dép sandal", price: 180000,sl: 11, img: "img/sandal.jpg" },
    { id: 10,group:"ao", name: "Áo khoác", price: 350000,sl: 11, img: "img/jacket.jpg" },
    { id: 11,group:"ao", name: "Váy", price: 200000,sl: 11, img: "img/dress.jpg" },
    { id: 12,group:"ao", name: "Áo sơ mi", price: 220000,sl: 11, img: "img/shirt2.jpg" },
    { id: 13,group:"quan", name: "Quần short", price: 180000,sl: 11, img: "img/shorts.jpg" },
    { id: 14,group:"giay", name: "Giày cao gót", price: 600000,sl: 11, img: "img/highheels.jpg" },
    { id: 15,group:"ao", name: "Áo len", price: 250000,sl: 11, img: "img/sweater.jpg" },
    { id: 16,group:"quan", name: "Quần thể thao", price: 220000,sl: 11, img: "img/sportpants.jpg" },
    { id: 17,group:"ao", name: "Áo hoodie", price: 300000,sl: 11, img: "img/hoodie.jpg" },
    { id: 18,group:"giay", name: "Giày boot", price: 700000,sl: 11, img: "img/boots.jpg" },
    { id: 19,group:"ao", name: "Áo phao", price: 400000,sl: 11, img: "img/puffer.jpg" },
    { id: 20,group:"quan", name: "Quần legging", price: 200000,sl: 11, img: "img/legging.jpg" },
    { id: 21,group:"phukien", name: "Người yêu", price: 9999999999,sl: 11, img: "img/ny.jpg"},
  ];
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let order = JSON.parse(localStorage.getItem("order")) || [];
  
  const searchInput = document.getElementById("search-input");
  function findProducts() {
      const query = searchInput.value.toLowerCase();
      const found = products.filter(product => product.name.toLowerCase().includes(query));
      renderFoundProducts(found);
  }
  // Gắn sự kiện keydown vào phần tử DOM
  if (searchInput) {
    searchInput.addEventListener("keydown", findProducts);
  } else {
    console.warn("Phần tử với id='search-input' không tồn tại trong DOM.");
  }
  window.showAo = function (){
     const found = products.filter(product => product.group.toLowerCase().includes("ao"));
     renderFoundProducts(found);
  };
  window.showQuan = function (){
    const found = products.filter(product => product.group.toLowerCase().includes("quan"));
    renderFoundProducts(found);
  };
 window.showGiay = function (){
  const found = products.filter(product => product.group.toLowerCase().includes("giay"));
  renderFoundProducts(found);
  };
 window.showPhukien = function (){
  const found = products.filter(product => product.group.toLowerCase().includes("phukien"));
  renderFoundProducts(found);
  };

  
  function renderFoundProducts(foundProducts) {
      const list = document.getElementById("product-list");
      list.innerHTML = ""; // Xóa danh sách sản phẩm hiện tại
      foundProducts.forEach(p => {
          const item = document.createElement("div");
          item.className = "product";
          item.innerHTML = `
              <div class="content" onclick="showProduct(${p.id})">
                  <img src="${p.img}" width="100%" />
                  <h3>${p.name}</h3>
                  <p>${p.price.toLocaleString()} đ</p>
                  <p>Đánh giá: ${"⭐".repeat(5)}</p>
              </div>
              <div class="product-actions" style="justify-content: space-between; display: flex; margin-top: 10px;">
                  <button onclick="addToCart(${p.id},this)">Thêm vào giỏ</button>
                  <button onclick="buy(${p.id},this)">Mua ngay</button>
              </div>
          `;
          list.appendChild(item);
      });
  }

  

  function renderProducts() {
    const list = document.getElementById("product-list");
    products.forEach(p => {
      const item = document.createElement("div");
      item.className = "product";
      item.innerHTML = `
        <div class="content" onclick="getID(${p.id})  ">
          <img src="${p.img}" width="100%" />
          <h3>${p.name}</h3>
          <p>${p.price.toLocaleString()} đ</p>
          <p>Đánh giá: ${"⭐".repeat(5)}</p>
        </div>
        <div class="product-actions" style ="justify-content: space-between; display: flex; margin-top: 10px;">
          <button onclick="addToCart(${p.id},this)">Thêm vào giỏ</button>
          <button onclick="buy(${p.id},this)">Mua ngay</button>
        </div>
      `;
      list.appendChild(item);
    });

  }
  window.getID = function (id){
    window.location.href = `./product.html?id=${id}`;
  }
  window.buy = function (id,button) {
    const isLogin = localStorage.getItem("isLogin");
    if (checkLogin()) {
      addToCart(id,button);
      window.location.href='./cart.html'; // Chuyển hướng đến trang giỏ hàng
    }else{
      Swal.fire({
        title: 'Bạn cần đăng nhập để tiếp tục mua sắm.',
        icon: 'error',
        showConfirmButton: true,   // Ẩn nút OK
        confirmButtonText: "Đăng Nhập", // Đổi tên nút
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = './login.html';
        }
      });
      return;
    }
  }
  export function checkLogin() {
    const isLogin = localStorage.getItem("isLogin");
    if (isLogin === "true") {
      return true;
    }else {
     return false;
    }
  }

  window.addToCart = function(id,button) {
    if (!checkLogin()) {
      Swal.fire({
        title: 'Bạn cần đăng nhập để tiếp tục mua sắm.',
        icon: 'error',
        showConfirmButton: true,   // Ẩn nút OK
        confirmButtonText: "Đăng Nhập", // Đổi tên nút
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = './login.html';
        }
      });
      return;
    }
    const index = cart.findIndex(item => item.id === id);
    if (index !== -1) {
      cart[index].qty += 1;
    } else {
      const product = products.find(p => p.id === id);
      cart.push({ ...product, qty: 1 });
    }
    showPlusOne(button);
    saveCart();
    updateCartCount();
  }
  window.showPlusOne = function(button) {
    const plusOne = document.createElement('span');
    plusOne.classList.add('plus-one');
    plusOne.innerText = '+1';
    button.appendChild(plusOne);
    // Thiết lập vị trí tương đối cho button nếu chưa có
    if (getComputedStyle(button).position === 'static') {
      button.style.position = 'relative';
    }

    setTimeout(() => {
      plusOne.remove();
    }, 1000); // thời gian giống với animation
  }
  
  
  export function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  
  export function updateCartCount() {
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
        cartCountElement.textContent = cart.reduce((a, b) => a + b.qty, 0);
    } else {
        console.warn("Phần tử với id='cart-count' không tồn tại trong DOM.");
    }
  }
  
  
 
document.addEventListener("DOMContentLoaded", () => {
    

    if(checkLogin()){
      document.getElementById("header-navbar").style.display = "none";

      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      document.getElementById("user-name").innerText = currentUser.name;
      


    }else{
      document.getElementById("userOptions").style.display = "none";
      document.getElementById("user-icon").style.fontSize = "35px";
      document.getElementById("user-icon").style.marginTop = "20px";
    }
    const list = document.getElementById("product-list");
    if (list) {
        renderProducts();
        updateCartCount();
    } else {
        console.warn("Phần tử với id='product-list' không tồn tại trong DOM.");
    }
  });

