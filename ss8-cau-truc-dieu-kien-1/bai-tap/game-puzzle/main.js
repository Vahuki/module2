var Images = {
    imgsDB: ["anh-1.jpg", "anh-2.jpg", "anh-3.jpg", "anh-4.jpg", "anh-5.jpg", "anh-6.jpg", "anh-7.jpg", "anh-8.jpg", "anh-9.jpg"],
    imgpos: new Array(9).fill(0) // Mảng trạng thái, ban đầu tất cả là 0
};

function placeImage(imgIndex, imgToggle) {
    Images.imgpos[imgIndex - 1] = imgToggle; // Cập nhật trạng thái ảnh
    let imageName = "#img" + imgIndex; // Tạo ID cho ảnh
    $(imageName).attr("src", `./img/${Images.imgsDB[imgToggle]}`); // Đổi ảnh dựa trên trạng thái
}

function setImagesRandom() {
    for (let i = 1; i <= 9; i++) {
        let randomIndex = Math.floor(Math.random() * Images.imgsDB.length);
        placeImage(i, randomIndex);
    }
}

function imageClick(imgIndex) {
    while (true){
        let imgToggle = Math.floor(Math.random() * Images.imgsDB.length); // Chọn ảnh ngẫu nhiên
        if (Images.imgpos[imgIndex - 1] !== imgToggle) { // Kiểm tra ảnh mới khác ảnh cũ
            placeImage(imgIndex , imgToggle);
            break;
        }
    }
}

function checkSet() {
    let allCorrect = Images.imgpos.every((pos, index) => pos === index);

    if (allCorrect) {
        $("img").css({
            "box-shadow": "0px 0px 20px rgb(21, 255, 0)",
            "border": "5px solid rgb(21, 255, 0)"
        });
    } else {
        $("img").css({
            "box-shadow": "2px 3px 3px black",
            "border": "2px solid black"
        });
    }
}


function main() {
    setImagesRandom(); // Khởi tạo ảnh ngẫu nhiên

    [...Array(9)].forEach((_, i) => {  // Lặp từ 0 đến 8
        $(`#img${i + 1}`).click(() => {
            imageClick(i+1);
            checkSet();
        });
    });
}


$(document).ready(main);
