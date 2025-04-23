let order = JSON.parse(localStorage.getItem("order")) || [];

  
function openPurchase(){
    let tableBody = document.getElementById("purchase-items");
    if (!tableBody) {
        console.error("Phần tử với id='purchase-items' không tồn tại trong DOM.");
        return;
    }
    tableBody.innerHTML = ""; // Clear previous items

    order.forEach(item => {
        let row = document.createElement("tr");
        let total = 0;
        total += item.price * item.qty;
        row.innerHTML += `
            <td style="display: flex; justify-content: space-between; align-items: center;"> 
                <img src="${item.img}" width="105px" style="border:5px"/>
                ${item.name}
            </td>
            <td>${item.qty}</td>
            <td>${total}</td>
            <td>${item.date}</td>
            `;  

        tableBody.appendChild(row);
        
        
    });
}
document.addEventListener("DOMContentLoaded", () => {
    
        openPurchase(); // Gọi hàm mở đơn mua cho desktop
    
});