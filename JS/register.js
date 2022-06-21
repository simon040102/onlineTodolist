let registerEmail = document.querySelector('.register-email');
let registerNickname = document.querySelector('.register-nickName');
let registerPassword = document.querySelector('.register-password');
let registerPasswordCheck = document.querySelector('.register-password-check');
let checkPassword = document.querySelector('.check-result');
let register = document.querySelector('.register-register');

registerPasswordCheck.addEventListener('keydown', enter);
function enter(e) {
  if (e.keyCode !== 13) {
    return;
  }
  registerAPI();
}
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
  let emailRule =
    /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
     if (registerPassword.value !== registerPasswordCheck.value){
        alert('請輸入正確密碼')
     }
     if(registerPassword.value.length<5){
      alert('密碼需大於六個字元')
      return
     }
     if(!emailRule.test(registerEmail.value)){
      alert('Email格式不正確') 
      registerEmail.focus()
      return
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
