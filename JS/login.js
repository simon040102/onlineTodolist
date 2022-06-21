//---------------登入畫面star---------------//
let loginEmail = document.querySelector('.login-email');
let loginPassword = document.querySelector('.login-password');
let loginConfirm = document.querySelector('.login-confirm');
let authorization = localStorage.getItem('authorization');
let nickname = localStorage.getItem('nickname');
loginPassword.addEventListener('keydown', enter);
function enter(e) {
  if (e.keyCode !== 13) {
    return;
  }
  login();
}
init();
function init(){
  if(authorization!==null|| nickname !==null)
  location.href='todolist.html';
  else{return}
}

loginConfirm.addEventListener('click', login);
function login(e) {
  let obj = {
    user: {},
  };
  obj.user.email = loginEmail.value;
  obj.user.password = loginPassword.value;
   if (obj.user.email == '' || obj.user.password == '') {
     alert('請輸入正確資訊');
     return
   }
  axios
    .post('https://todoo.5xcamp.us/users/sign_in', obj)
    .then(function (response) {
      console.log(response);
      alert(response.data.message);
      let authorization = response.headers.authorization;
      let nickname= response.data.nickname;
      localStorage.setItem('authorization', authorization);
      localStorage.setItem('nickname', nickname);
       location.href = 'todolist.html';
    });
}
//---------------登入畫面end---------------//
