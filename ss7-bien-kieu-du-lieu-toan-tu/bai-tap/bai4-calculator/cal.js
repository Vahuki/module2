

function btnclick(value){
    let x = document.getElementById('output').value;
    x += value;
    document.getElementById("output").value = x; // Nối giá trị vào ô output

}

function cal() {
    let result = document.getElementById("output").value;
    document.getElementById("output").value = eval(result);
}