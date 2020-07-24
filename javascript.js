const wrapList = document.querySelector(".wrap__list");
const listAllDelBtn = document.querySelector(".navbar__menu-remove");
const section = document.querySelector("#section");
const SHOPLIST = "shopp__list";

let thisList = [];

// 리스트 전부 삭제

function listRemove() {
  const div = wrapList.querySelector("div");
  wrapList.removeChild(div);
  const cleanList = thisList.filter((list) => {
    return list.id !== parseInt(div.id);
  });
  thisList = cleanList;
  saveList();
}

function listAllRemove() {
  while (wrapList.firstChild) {
    wrapList.removeChild(wrapList.lastChild);
    localStorage.removeItem("list");
    thisList = [];
  }
  wrapList.style.display = "none";
}
listAllDelBtn.addEventListener("click", listAllRemove);

// 로컬스토리지 저장
function saveList() {
  localStorage.setItem("list", JSON.stringify(thisList));
}
// html요소 생성/ push를 이용한 배열 저장 / 객체화를 통한 id 생성(개별로 지울 때)

function createList(value) {
  const wrapLists = document.querySelector(".wrap__list");
  const div = document.createElement("div");
  div.innerText = value;
  wrapLists.appendChild(div);
  div.classList.add(SHOPLIST);
  const span = document.createElement("span");
  span.innerText = "X";
  div.appendChild(span);
  span.addEventListener("click", listRemove);
  // 문자열에는 innerText 후 child를 추가하는 거다.
  const Id = thisList.length + 1;
  div.id = Id;
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
  if (loadList !== null) {
    wrapList.style.display = "block";
    const loadedList = JSON.parse(loadList);
    loadedList.forEach((list) => {
      createList(list.text);
    });
  } else {
    wrapList.style.display = "none";
  }
}

init();
// 아.. forEach의 인자가 객체를 부르는 인자였다.. 깨달음.. 무릎을 탁

// 모달창

// 모달창 입력 값 관리
const wrapModal = document.querySelector(".wrap");
const submitAddList = document.querySelector(".modal__add");
const clickAddList = document.querySelector(".modal__addbtn");
const listInput = submitAddList.querySelector("input");

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

submitAddList.addEventListener("submit", submitAdd);
clickAddList.addEventListener("click", clickAdd);

// 모달창 오픈
const closeModal = document.querySelector(".modal__closed");
const showBtn = document.querySelector(".navbar__menu-add");

function closedModal() {
  wrapModal.style.display = "none";
}

function showModal() {
  wrapModal.style.display = "block";
}

closeModal.addEventListener("click", closedModal);
showBtn.addEventListener("click", showModal);
