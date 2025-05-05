let books = [ 
    {masach: 10001, tensach: "Toán cao cấp", namxb: 2009, sl: 4,tinhtrang: true},
    {masach: 10002, tensach: "JavaScript", namxb: 2010, sl: 1,tinhtrang: true},
    {masach: 10003, tensach: "HTML CSS Basic", namxb: 2011, sl: 0,tinhtrang: false},
];
function showBooks() {
    let table = document.getElementById("books-table");
    table.innerHTML = ""; 
    books.forEach(book => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${book.masach}</td>
            <td>${book.tensach}</td>
            <td>${book.namxb}</td>
            <td>${book.sl}</td>
            <td>${book.tinhtrang ? "Còn hàng" : "Hết hàng"}</td>
        `;
        table.appendChild(row);
    });
}

showBooks();
function checkNSB(namxuatban) {
    if (isNaN(namxuatban) || namxuatban.toString().length !== 4) {
        return false; 
    }
    return true; 
}
function checkSL(soluong) {
    if (isNaN(soluong) || soluong <= 0) {
        books.tinhtrang = false;
        return false; 
    }
    return true; 
}
function addNewBook(){
    while (true) {
        let newBook = {
            masach: prompt("Nhập mã sách"),
            tensach: prompt("Nhập tên sách"),
            namxb: +prompt("Nhập năm xuất bản"),
            sl: +prompt("Nhập số lượng"),
            tinhtrang: confirm("Còn hàng?")
        };
        if(!checkNSB(newBook.namxb)){
            alert("Năm xuất bản không hợp lệ!");
        }else if(!/^[1-5][0-9]{4}$/.test(newBook.masach)){
            alert("Mã sách không hợp lệ! Vui lòng nhập mã sách có 5 chữ số, số đầu từ 1-5 và 4 số sau từ 0-9.");
        }else{
            books.push(newBook);
            break;
        }   
    }
    showBooks();
};
    
function addOldBook(){
    let masachmoi = +prompt("Nhập mã sách cần thêm");
    let book = books.find(b => b.masach === masachmoi);
    if (book) {
        book.sl += 1;
    } else {
        alert("Sách không tồn tại");
    }
    if (book.sl > 0) {
        book.tinhtrang = true;
    }
    showBooks();

}
function rentBook(){
    let masach = +prompt("Nhập mã sách cần thuê");
    let book = books.find(b => b.masach === masach);
    if (book) {
        if (checkSL(book.sl)) {
            book.sl -= 1;
            alert("Thuê sách thành công!");
        } else {
            alert("Sách đã hết hàng!");
        }
    } else {
        alert("Sách không tồn tại!");
    }
    showBooks();
}
function showMostBook(){
    let mostBook = books[0]; 
    books.forEach((book) => {
        if (book.sl > mostBook.sl) {
            mostBook = book;
        }
    });
    alert(`Sách có số lượng nhiều nhất là: ${mostBook.tensach} với ${mostBook.sl} quyển`);
}









 