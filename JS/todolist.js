//---------------todolist---------------//
let text = document.querySelector('.text');
let save = document.querySelector('.save');
let list = document.querySelector('.list');
let check = document.querySelector('.check');
let count = document.querySelector('.count');
let data = [];
let authorization = localStorage.getItem('authorization');
let nickname = localStorage.getItem('nickname');
let name=document.querySelector('.nickname').innerHTML=nickname;
let signOut = document.querySelector('.signOut');
signOut.addEventListener('click',out)
function out(e){
  e.preventDefault();
  console.log('123');
  localStorage.removeItem('nickname');
  localStorage.removeItem('authorization');
  location.href = 'index.html';
}
checkLocal();
function checkLocal(){
  if(authorization==null||nickname==null){
    location.href = 'index.html';
  }
  start();
}

function start() {
  axios
    .get('https://todoo.5xcamp.us/todos', { headers: { authorization } })
    .then(function (response) {
      data = response.data.todos;
      init();
    });
}

text.addEventListener('keydown', enter);
function enter(e) {
  if (e.keyCode !== 13) {
    return;
  }
  saveData();
}

//重新整理資料
function init() {
  let str = '';
  let remain = 0;
  let check = '';
  let finish = '';
  data.forEach(function (items, index) {
    if (typeof items.completed_at == 'object') {
      check = '';
      finish = '';
    } else if (items.changeList_at !== 'string') {
      check = 'confirm-finished';
      finish = 'finished';
    }
    str += `<li class="${finish}"><a  href="#"><img  class="check ${check}"  data-num=${index} src="images/check_box_outline_blank_black_24dp.svg"></a>${items.content}<a  data-num=${index} href="#" class="del"></a></li>`;
    if (items.completed_at == null) {
      remain += 1;
    }
  });
  count.innerHTML = `${remain} 個待完成項目`;
  list.innerHTML = str;
}
//新增
save.addEventListener('click', saveData);
function saveData(e) {
  let obj = {
    todo: {},
  };
  if (text.value == '') {
    return;
  }
  obj.todo.content = text.value;
  axios
    .post('https://todoo.5xcamp.us/todos', obj, { headers: { authorization } })
    .then(function (response) {
      start();
    });
  text.value = '';
}
//修改
list.addEventListener('click', remove);
function remove(e) {
  if (e.target.nodeName == 'LI') {
    return;
  }
  e.preventDefault();
  let num = e.target.dataset.num;
  let id = data[num].id;
  if (e.target.nodeName == 'IMG' && e.target.nodeName !== 'A') {
    axios
      .patch(
        `https://todoo.5xcamp.us/todos/${id}/toggle`,
        {},
        { headers: { authorization } }
      )
      .then(function (response) {
        start();
      });
    return;
  }
  //刪除
  if (e.target.nodeName == 'A') {
    axios
      .delete(`https://todoo.5xcamp.us/todos/${id}`, {
        headers: { authorization },
      })
      .then(function (response) {
         start();
      });

  }
}

let select = document.querySelector('.select');

select.addEventListener('click', changeList);
function changeList(e) {
  let choose = e.target.value;
  let str = '';
  if (choose == '全部') {
    init();
  }
  if (choose == '待完成') {
    let check = '';
    let finish = '';
    data.forEach(function (items, index) {
      if (typeof items.completed_at == 'object') {
        str += `<li class="${finish}"><a  href="#"><img  class="check ${check}"  data-num=${index} src="images/check_box_outline_blank_black_24dp.svg"></a>${items.content}<a  data-num=${index} href="#" class="del"></a></li>`;
      }
    });
    list.innerHTML = str;
  }
  if (choose == '已完成') {
    check = 'confirm-finished';
    finish = 'finished';
    data.forEach(function (items, index) {
      if (typeof items.completed_at == 'string') {
         str += `<li class="${finish}"><a  href="#"><img  class="check ${check}"  data-num=${index} src="images/check_box_outline_blank_black_24dp.svg"></a>${items.content}<a  data-num=${index} href="#" class="del"></a></li>`;
      }
    });
    list.innerHTML = str;
  }
}
$(document).ready(function () {
  $('.select li').click(function (e) {
    $(this).addClass('underline').siblings().removeClass('underline');
  });

  $('.list li a img').click(function (e) {
    console.log('123');
  });
});
//---------------todolist---------------//
