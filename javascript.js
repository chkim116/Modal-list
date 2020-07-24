const wrapList = document.querySelector(".wrap__list");
const wrapModal = document.querySelector(".wrap");
const submitAddList = document.querySelector(".modal__add");
const listInput = submitAddList.querySelector("input");
const closeModal = document.querySelector(".modal__closed");
const clickAddList = document.querySelector(".modal__addbtn");
const listAllDelBtn = document.querySelector(".navbar__menu-remove");
const section = document.querySelector("#section");
const SHOPLIST = "shopp__list";

let thisList = [];

// 리스트 전부 삭제

function listAllRemove() {
  while (wrapList.firstChild) {
    wrapList.removeChild(wrapList.lastChild);
  }
  localStorage.removeItem("list");
  thisList = [];
  wrapList.style.display = "none";
}
listAllDelBtn.addEventListener("click", listAllRemove);

// 하나만 삭제

function listRemove(e) {
  const delNode = e.target.parentNode;
  wrapList.removeChild(delNode);
  const cleanToDos = thisList.filter(function (list) {
    return list.id !== parseInt(delNode.id);
  });
  console.log(cleanToDos);
  thisList = cleanToDos;
  saveList();
}

// 로컬스토리지 저장
function saveList() {
  localStorage.setItem("list", JSON.stringify(thisList));
}
// html요소 생성/ push를 이용한 배열 저장 / 객체화를 통한 id 생성(개별로 지울 때)

function createList(value) {
  const wrapLists = document.querySelector(".wrap__list");
  const div = document.createElement("div");
  const span = document.createElement("span");
  div.classList.add(SHOPLIST);
  wrapLists.appendChild(div);
  span.innerText = "X";
  span.addEventListener("click", listRemove);
  div.innerText = value;
  div.appendChild(span);
  // 문자열에는 innerText 후 child를 추가하는 거다.
  let Id = thisList.length + 1;
  listObj = {
    text: value,
    id: Id,
  };
  thisList.push(listObj);
  saveList();
  wrapList.style.display = "block";
}

function init() {
  const loadList = localStorage.getItem("list");
  if (loadList === null || loadList === "{}") {
    wrapList.style.display = "none";
  } else {
    wrapList.style.display = "block";
    const loadedList = JSON.parse(loadList);
    loadedList.forEach((list) => {
      createList(list.text);
    });
  }
}

init();
// 아.. forEach의 인자가 객체를 부르는 인자였다.. 깨달음.. 무릎을 탁

// 모달창

function closedModal() {
  wrapModal.style.display = "none";
}

function submitAdd(event) {
  event.preventDefault();
  if (listInput.value !== "") {
    createList(listInput.value);
    listInput.value = "";
    closedModal();
  } else {
    alert("입력해 주세요");
  }
}

function clickAdd(event) {
  submitAdd(event);
}

closeModal.addEventListener("click", closedModal);
submitAddList.addEventListener("submit", submitAdd);
clickAddList.addEventListener("click", clickAdd);

// 모달창 오픈
const showBtn = document.querySelector(".navbar__menu-add");

function showModal() {
  wrapModal.style.display = "block";
}

showBtn.addEventListener("click", showModal);
