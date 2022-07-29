//data
const small = "abcdefghijklmnopqrstuvwxyz";
const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "1234567890";
const symbols = "!&@#$*/,.-_=+";

//dom selecting
const docQuery = document.querySelector;
const rangeValue = document.querySelector(".inp-range");
const numValue = document.querySelector(".inp-num");
const displayPass = document.querySelector("#display-genpass");
const banners = document.querySelectorAll(".banner");
const storePassShow = document.querySelector(".store-show-pass");
const storeForm = document.querySelector(".store-password");
const displayParent = document.querySelector(".password-info");
const hideShowBtn = document.querySelector(".hide-show");
const fillWebName = document.querySelector(".webname-fill");
const fillUserName = document.querySelector(".username-fill");
const storedPassDisp = document.querySelector(".stored");
const storeContainer = document.querySelector(".stored-pass");

// general variables
let storeShop = [];

//value equating
numValue.value = rangeValue.value;

rangeValue.oninput = function () {
  numValue.value = this.value;
  genPass(this.value);
};

numValue.oninput = function () {
  rangeValue.value = this.value;
  genPass(this.value);
};

function genPass(num) {
  let pass = [];

  for (let i = 0; i < num; i++) {
    let charStore;
    let randomIndex = Math.floor(Math.random() * 4);

    if (randomIndex === 0) {
      charStore = small;
    }

    if (randomIndex === 1) {
      charStore = upper;
    }

    if (randomIndex === 2) {
      charStore = numbers;
    }

    if (randomIndex === 3) {
      charStore = symbols;
    }

    let randomChar = Math.floor(Math.random() * charStore.length);

    pass += charStore[randomChar];
  }

  displayPass.value = pass;

  storePassShow.value = pass;

  if (rangeValue.value >= 12) {
    displayParent.setAttribute("style", "border-bottom: 5px solid $dip_blue");
  }

  if (rangeValue.value < 12) {
    displayParent.setAttribute("style", "border-bottom: 5px solid greenyellow");
  }

  if (rangeValue.value <= 7) {
    displayParent.setAttribute("style", "border-bottom: 5px solid red");
  }
}

genPass(rangeValue.value);

//reload btn
const reloadPass = () => {
  genPass(rangeValue.value);
};

// copying to clipboard
const copyPassword = () => {
  /* Select the text field */
  displayPass.select();
  displayPass.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  navigator.clipboard.writeText(displayPass.value);

  /* Alert the copied text */
  alert("Copied the text: " + displayPass.value);
};

//changing the call action

function changeBan() {
  banners.forEach((banner) => {
    banner.classList.toggle("show");
  });
}

setInterval(changeBan, 5000);

//accessing store form
const showStoreForm = () => {
  storeForm.style.display = "flex";
  storeForm.style.transform = "scale(1)";
};

//close form
function closeForm() {
  storeForm.style.transform = "scale(0)";
}

window.addEventListener("keyup", (event) => {
  if (event.key === "Escape") closeForm();
});

// function copyText() {
//   /* Copy text into clipboard */
//   navigator.clipboard.writeText("Geeksforgeeks is best learning platform.");
// }

// copyText();

/*
    form filling and storing data
*/
//function to get form
function submitToPass() {
  //   console.log(fillWebName.value);
  //   console.log(fillUserName.value);
  //   console.log(storePassShow.value);
  closeForm();
  pushToShop();

  fillWebName.value = "";
  fillUserName.value = "";
  storePassShow.value = "";
  //   console.log(hiddenCircle);
  //   console.log(passBox);

  genPass(rangeValue.value);
}

//function to store
function pushToShop() {
  console.log(fillWebName.value);
  console.log(fillUserName.value);
  console.log(storePassShow.value);

  storeShop.push({
    name: fillWebName.value,
    username: fillUserName.value,
    password: storePassShow.value,
  });

  //   storing to local storage
  localStorage.setItem("store shop", JSON.stringify(storeShop));
  //   console.log(storeShop);

  getNStore();
}

// getting data from storageand assign back to storeShop
function getNStore() {
  let storeShopFromLS = JSON.parse(localStorage.getItem("store shop"));

  if (storeShopFromLS) {
    storeShop = storeShopFromLS;
  }
  //   console.log(storeShop);
  passPass();
}
getNStore();
//assign storeShop to display
function passPass() {
  storedPassDisp.innerHTML = "";

  for (let i = 0; i < storeShop.length; i++) {
    let hiddenCircle = '<i class="fa fa-circle" aria-hidden="true"></i>';
    let passBox = storeShop[i].password.length;
    for (let i = 0; i < passBox - 1; i++) {
      // hiddenCircle += "d";
      hiddenCircle += '<i class="fa fa-circle" aria-hidden="true"></i>';
    }

    storedPassDisp.innerHTML += `<li class="stored-list">
<div class="saved-info">
  <h3>${storeShop[i].name}</h3>
  <p class="hide-pass">
    @${storeShop[i].username}: ${hiddenCircle}
  </p>
  <p class="show-pass">
  @${storeShop[i].username}: ${storeShop[i].password}</p>
</div>

<div
  class="hide-show"
  onclick="hideShow(this)"
  title="show/hide password"
>
  <i class="fa fa-eye" aria-hidden="true"></i>
  <i class="fa fa-eye-slash" aria-hidden="true"></i>
</div>

<div class="modify-cent">
  <i class="fa fa-pencil-square-o" onclick="editPass(this, '${storeShop[i].password}')" aria-hidden="true"></i>
  <i class="fa fa-trash" onclick="deleteSaved(this, '${storeShop[i].password}')" aria-hidden="true"></i>
  <i
    class="fa fa-clone"
    onclick="copySavePass('${storeShop[i].password}')"
    aria-hidden="true"
  ></i>
</div>
</li>`;
  }

  if (storeShop.length === 0) {
    storeContainer.setAttribute("style", "display: none;");
  } else {
    storeContainer.setAttribute("style", "display: flex;");
  }
}

passPass();
/* 
    storing, editing, copying and deletigng password
    using local storage
*/

// hide and show password

function hideShow(e) {
  e.classList.toggle("show");
  e.previousSibling.previousSibling.classList.toggle("show");
  //   console.log(e.previousSibling.previousSibling);
}

function copySavePass(pass) {
  /* Copy text into clipboard */
  navigator.clipboard.writeText(pass);
}

//deleting saved password
function deleteSaved(e, saveePas) {
  e.parentElement.parentElement.remove();

  // console.log(storeShop.indexOf(e.parentElement.parentElement));
  // console.log(storeShop);

  for (let i = 0; i < storeShop.length; i++) {
    if (storeShop[i].password === saveePas) {
      storeShop.splice(i, 1);
      // console.log(storeShop[i].password);
      // console.log(storeShop.splice(i, 1));
      // console.log(i);
    }
  }

  //   storing to local storage
  localStorage.setItem("store shop", JSON.stringify(storeShop));
  getNStore();
}

//editing saved password
function editPass(e, saveePas) {
  // e.parentElement.parentElement.remove();

  for (let i = 0; i < storeShop.length; i++) {
    if (storeShop[i].password === saveePas) {
      // console.log(storeShop[i].password);
      // console.log(storeShop.splice(i, 1));
      // console.log(i);
      fillWebName.value = storeShop[i].name;
      fillUserName.value = storeShop[i].username;
      storePassShow.value = storeShop[i].password;
      storeShop.splice(i, 1);
    }
  }

  //   storing to local storage
  localStorage.setItem("store shop", JSON.stringify(storeShop));
  getNStore();

  showStoreForm();
}
