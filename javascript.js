const wrapList = document.querySelector(".wrap__list");
const wrapModal = document.querySelector(".wrap");
const submitAddList = document.querySelector(".modal__add");
const listInput = submitAddList.querySelector("input");

const closeModal = document.querySelector(".modal__closed");
const clickAddList = document.querySelector(".modal__addbtn");
const listAllDelBtn = document.querySelector(".navbar__menu-remove");

const SHOPLIST = "shopp__list";

let thisList = [];

// 리스트 전부 삭제

function listAllremove() {
  const div = wrapList.querySelector("div");
  localStorage.removeItem("list");
  thisList = [];
  wrapList.style.display = "none";
  while (wrapList.firstChild) {
    wrapList.removeChild(wrapList.lastChild);
  }
}
listAllDelBtn.addEventListener("click", listAllremove);

// 로컬스토리지 저장

function saveList(value) {
  localStorage.setItem("list", JSON.stringify(thisList));
}

// html요소 생성/ push를 이용한 배열 저장 / 객체화를 통한 id 생성(개별로 지울 때)

function createList(value) {
  const wrapLists = document.querySelector(".wrap__list");
  const div = document.createElement("div");
  const span = document.createElement("span");
  span.innerText = "X";
  div.classList.add(SHOPLIST);
  div.appendChild(span);
  div.innerText = value;
  wrapLists.appendChild(div);
  let Id = thisList.length + 1;
  listObj = {
    text: value,
    id: Id,
  };
  thisList.push(listObj);
  saveList(value);
  wrapList.style.display = "block";
}

function init() {
  const loadList = localStorage.getItem("list");
  if (loadList === null) {
    wrapList.style.display = "none";
  } else {
    wrapList.style.display = "block";
    const loadedList = JSON.parse(loadList);
    loadedList.forEach((list) => {
      createList(list.text);
    });
  }
}

// 아.. forEach의 인자가 객체를 부르는 인자였다.. 깨달음.. 무릎을 탁

init();

// 모달창

function closedModal() {
  wrapModal.style.display = "none";
}

function submitAdd(event) {
  event.preventDefault();
  createList(listInput.value);
  listInput.value = "";
  closedModal();
}

function clickAdd(event) {
  submitAdd(event);
}

closeModal.addEventListener("click", closedModal);
submitAddList.addEventListener("submit", submitAdd);
clickAddList.addEventListener("click", clickAdd);

// 모달창 오픈
const addBtn = document.querySelector(".navbar__menu-add");

function showModal() {
  wrapModal.style.display = "block";
}

addBtn.addEventListener("click", showModal);
