console.log("Index.js is loaded");

let monsterApiPage = 1;

function getMonstersUl() {
  return document.querySelector(".monsters-ul");
}

function setCharacterFormListener() {
  document
    .querySelector(".character-form")
    .addEventListener("submit", function(e) {
      e.preventDefault();
      createMonster();
    });
}

function setNewMonsterButtonListener() {
  document
    .querySelector("#monster-button")
    .addEventListener("click", function(e) {
      monsterApiPage += 1;
      loadMonsters(monsterApiPage);
    });
}

function getMonsterData() {
  let name = document.querySelector("#monster-name").value;
  let age = document.querySelector("#monster-age").value;
  let description = document.querySelector("#monster-description").value;
  return { name: name, age: age, description: description };
}

function clearMonsterForm() {
  document.querySelector("#monster-name").value = "";
  document.querySelector("#monster-age").value = "";
  document.querySelector("#monster-description").value = "";
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

function createMonster() {
  let monster = getMonsterData();
  postMonster(monster);
  clearMonsterForm();
}

function createMonsterLi(monster) {
  let li = document.createElement("li");
  li.setAttribute("class", "monster-list-item");
  li.innerHTML = `<strong>${monster.name}</strong><br>
                Age: ${monster.age}<br>
                Description: ${monster.description}<br><br>`;
  return li;
}

function appendMonster(monster) {
  console.log(monster.name, monster.id);
  let li = createMonsterLi(monster);
  getMonstersUl().appendChild(li);
}

function fetchFiftyMonsters(monsterApiPage) {
  //returns 10 monsters
  return fetch(
    `http://localhost:3000/monsters?_limit=50&_page=${monsterApiPage}`
  ).then(response => response.json());
}

function loadMonsters(monsterApiPage) {
  fetchFiftyMonsters(monsterApiPage).then(monstersArray =>
    monstersArray.forEach(monster => {
      appendMonster(monster);
    })
  );
}

document.addEventListener("DOMContentLoaded", function() {
  console.log("dom loaded!");
  loadMonsters(1);
  setCharacterFormListener();
  setNewMonsterButtonListener();
});
