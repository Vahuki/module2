function login() {
    
    var username = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var tel = document.getElementById('tel').value;
    let gender = document.querySelector('input[name="gender"]:checked');
    document.getElementById('_name').innerHTML = username;
    document.getElementById('_email').innerHTML = email;
    document.getElementById('_tel').innerHTML = tel;
    document.getElementById('_gender').innerHTML=gender.value;
    document.getElementById('tb').innerHTML = 'Đăng kí thành công';
};
function reset() {
    document.getElementById('_name').innerHTML = '';
    document.getElementById('_email').innerHTML = '';
    document.getElementById('_tel').innerHTML = '';
    document.getElementById('_gender').innerHTML = '';
    document.getElementById('tb').innerHTML = 'Reset thành công';  
};