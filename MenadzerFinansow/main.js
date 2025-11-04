const addBtn = document.querySelector("button.add");
const clearBtn = document.querySelector("button.clear");
const whiteMode = document.querySelector("div.style button:nth-of-type(1)");
const darkMode = document.querySelector("div.style button:nth-of-type(2)");
const saveBtn = document.querySelector("button.save");
const cancelBtn = document.querySelector("button.cancel");
const inputName = document.getElementById("name");
const inputMenas = document.getElementById("means");
const select = document.getElementById("category");
const ulIn = document.querySelector("div.income ul");
const ulEx = document.querySelector("div.expense ul");
const divModal = document.querySelector("div.modal");
const pMoney = document.querySelector("p.money");
const pNoMoney = document.querySelector("p.noMoney");
let errors = [];
const toCheck = [inputName, inputMenas, select];
let money = 0;

const addTransaction = () => {
  divModal.classList.add("active");
};

const checkForm = (input) => {
  const pError = input.parentElement.querySelector("p.error");
  if (!input.value) {
    pError.classList.add("active");
    pError.style.visibility = "visible";
    input.style.borderColor = "red";
  } else {
    clearErrors(input, pError);
    pError.classList.remove("active");
  }
  errors = document.querySelectorAll("p.error.active");
};

const clearErrors = (input, pError) => {
  input.style.borderColor = "black";
  pError.style.visibility = "hidden";
};
const reset = () => {
  inputName.value = "";
  inputMenas.value = "";
  select.selectedIndex = 0;
  divModal.classList.remove("active");
  pNoMoney.style.visibility = "hidden";
};

const addNewElement = () => {
  divModal.classList.remove("active");
  const li = document.createElement("li");
  switch (select.value) {
    case "0":
      li.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> ${inputName.value} <span>${inputMenas.value}zł <button><i class="fa-solid fa-xmark"></i></button></span>`;
      break;
    case "1":
      li.innerHTML = `<i class="fa-solid fa-burger"></i> ${inputName.value} <span>${inputMenas.value}zł <button><i class="fa-solid fa-xmark"></i></button></span>`;
      break;
    case "2":
      li.innerHTML = `<i class="fa-solid fa-car"></i> ${inputName.value} <span>${inputMenas.value}zł <button><i class="fa-solid fa-xmark"></i></button></span>`;
      break;
    case "3":
      li.innerHTML = `<i class="fa-solid fa-money-bill"></i> ${inputName.value} <span>${inputMenas.value}zł <button><i class="fa-solid fa-xmark"></i></button></span>`;
      break;
  }
  const button = li.querySelector(".fa-xmark");
  delteLiElement(button);
  if (select.options[select.selectedIndex].textContent.indexOf("+") != -1) {
    ulIn.appendChild(li);
  } else {
    ulEx.appendChild(li);
  }
};

const delteLiElement = (button) => {
  button.addEventListener("click", (e) => {
    e.target.parentElement.parentElement.parentElement.remove();
  });
};
const save = (e) => {
  e.preventDefault();
  toCheck.forEach((element) => checkForm(element));
  if (!errors.length) {
    const ammount = parseFloat(inputMenas.value);
    if (ammount < 0 && Math.abs(ammount) > money) {
      pNoMoney.style.visibility = "visible";
    } else {
      money += ammount;
      addNewElement();
      pMoney.textContent = `${money.toFixed(2)}zł`;
      reset();
    }
  }
};

const cancel = (e) => {
  e.preventDefault();
  reset();
  toCheck.forEach((element) =>
    clearErrors(element, element.parentElement.querySelector("p.error"))
  );
};

const clearAll = () => {
  ulIn.textContent = "";
  ulEx.textContent = "";
};
clearBtn.addEventListener("click", clearAll);
addBtn.addEventListener("click", addTransaction);
cancelBtn.addEventListener("click", cancel);
saveBtn.addEventListener("click", save);
