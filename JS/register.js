let registerEmail = document.querySelector('.register-email');
let registerNickname = document.querySelector('.register-nickName');
let registerPassword = document.querySelector('.register-password');
let registerPasswordCheck = document.querySelector('.register-password-check');
let checkPassword = document.querySelector('.check-result');
let register = document.querySelector('.register-register');
//輸入正確密碼
registerPasswordCheck.oninput = match;
function match(e) {
  if (registerPassword.value == registerPasswordCheck.value) {
    checkPassword.innerHTML = '';
  } else {
    checkPassword.innerHTML = '請輸入正確密碼';
  }
}

register.addEventListener('click', registerAPI);
function registerAPI(e) {
     if (registerPassword.value !== registerPasswordCheck.value){
        alert('請輸入正確密碼')
     }
  let obj = { user: {} };
  obj.user.email = registerEmail.value;
  obj.user.nickname = registerNickname.value;
  obj.user.password = registerPassword.value;
  console.log(obj)
  axios.post('https://todoo.5xcamp.us/users',obj)
  .then(function (response) {
    console.log(response);
    alert(response.data.message);
    let authorization = response.headers.authorization;
    let nickname = response.data.nickname;
    console.log(authorization)
    console.log(nickname);
    localStorage.setItem('authorization', authorization);
    localStorage.setItem('nickname', nickname);
    location.href = 'todolist.html';
  });
}
