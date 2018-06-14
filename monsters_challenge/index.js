//Global Variables

let monsterApiPage = 1;

//Event Listeners

function setNewMonsterButtonListener() {
  document
    .querySelector("#monster-button")
    .addEventListener("click", function(e) {
      monsterApiPage += 1;
      loadMonsters(monsterApiPage);
    });
}

function setCharacterFormListener() {
  document
    .querySelector(".character-form")
    .addEventListener("submit", function(e) {
      e.preventDefault();
      createNewMonster();
    });
}

//Monster Form

function getMonsterData() {
  let name = document.querySelector("#monster-name").value;
  let age = document.querySelector("#monster-age").value;
  let description = document.querySelector("#monster-description").value;
  return { name: name, age: age, description: description };
}

function clearMonsterData() {
  document.querySelector(".character-form").reset();
}

//Monster Creation & Appending

function getMonstersUl() {
  return document.querySelector(".monsters-ul");
}

function appendMonster(monster) {
  console.log(monster.name, monster.id);
  let li = createMonsterLi(monster);
  getMonstersUl().appendChild(li);
}

function loadMonsters(monsterApiPage) {
  getFiftyMonster(monsterApiPage).then(monstersArray =>
    monstersArray.forEach(monster => {
      appendMonster(monster);
    })
  );
}

function createNewMonster() {
  let monster = getMonsterData();
  postMonster(monster);
  clearMonsterData();
}

function createMonsterLi(monster) {
  let li = document.createElement("li");
  li.setAttribute("class", "monster-list-item");
  li.innerHTML = `<strong>${monster.name}</strong><br>
                Age: ${monster.age}<br>
                Description: ${monster.description}<br><br>`;
  li.addEventListener("click", function() {
    alert(`I'm a scary monster named ${monster.name}`);
  });
  return li;
}

//Fetching Data

function getFiftyMonster(monsterApiPage) {
  return fetch(
    `http://localhost:3000/monsters?_limit=50&_page=${monsterApiPage}`
  ).then(response => response.json());
}

function postMonster(data) {
  fetch("http://localhost:3000/monsters", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
      Accept: "application/json"
    }
  })
    .then(response => response.json())
    .then(monster => appendMonster(monster));
}

//Initialize

function initialize() {
  console.log("dom loaded in index.js");
  loadMonsters(1);
  setCharacterFormListener();
  setNewMonsterButtonListener();
}

document.addEventListener("DOMContentLoaded", initialize);
