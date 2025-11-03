const addBtn = document.querySelector('button.add');
const inputTop = document.getElementById('task')

const ul = document.querySelector('ul');
const pError = document.querySelector('p.error');

const modal = document.querySelector('div.modal');
const modalError = document.querySelector('p.errorModal');
const saveBtn = document.querySelector('button.save');
const cancelBtn = document.querySelector('button.cancel');
const inputModal = document.getElementById('modalInput');
let liToEdit;

const check = (element,error,fun) => {
    if (!element.value) {
        error.style.visibility = 'visible';
        return
    }
    else {
        fun();
    }
};
const clearError = (element,error) => {
    element.value = '';
    error.style.visibility = 'hidden';
}
const functionDone = (e) => {
    ((e.target).closest('li')).classList.toggle('done');
};
const functionEdit = (e) => {
    modal.style.transform = 'translate(-50%,-105%)';
    liToEdit = (e.target).closest('li');
    inputModal.value = (liToEdit.firstChild).textContent;
};
const functionRemove = (e) => {
    ((e.target).closest('li')).remove();
};
const createElement = () => {
    const li = document.createElement('li');
    li.innerHTML = `${inputTop.value} <div class="buttons"><button class="done"><i class="fa-solid fa-check"></i></button><button class="edit"><i class="fa-solid fa-pen-to-square"></i></button><button class="remove"><i class="fa-solid fa-xmark"></i></button></div>`;
    const done = li.querySelector('button.done');
    const edit = li.querySelector('button.edit');
    const remove = li.querySelector('button.remove');
    done.addEventListener('click',functionDone);
    edit.addEventListener('click',functionEdit);
    remove.addEventListener('click',functionRemove);
    ul.appendChild(li);
    clearError(inputTop,pError);
};
const cancel = () => {
    clearError(inputModal,modalError);
    modal.style.transform = 'translate(-50%,0%)';
};
const saveEdit = () => {
    inputModal.value = 
    (liToEdit.firstChild).textContent = inputModal.value;
    cancel();
};
addBtn.addEventListener('click',() => check(inputTop,pError,createElement));
saveBtn.addEventListener('click',()=>{check(inputModal,modalError,saveEdit)});
cancelBtn.addEventListener('click',cancel);