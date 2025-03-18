
document.querySelectorAll("input").forEach(button => {
    button.addEventListener("click", function () {
        let value = this.value; // Lấy giá trị của button
        document.getElementById("output").value += value; // Nối giá trị vào ô input
    });
});

function cal() {
    let result = document.getElementById("output").value;
    document.getElementById("output").value = eval(result);
    document.getElementById("output").value = 0;
}