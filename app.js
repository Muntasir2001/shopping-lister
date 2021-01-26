//setting scroll to zero
window.scrollTo(0, 0);

//setting notify system
const notify = document.querySelector('.warning');

function hideMssg() {
   // console.log("i am here 6");
   notify.classList.remove("warning-open");
   notify.classList.add("warning-close");
   // console.log("i am here 7");
   console.log(notify.classList);  
}

function showMssg() {
   // console.log("i am here 4");
   notify.classList.remove("warning-close");
   notify.classList.add("warning-open");
   // console.log("i am here 5");
   console.log(notify.classList); 
}

function notifyControl() {
   // console.log("i am here 1");
   showMssg();
   // console.log("i am here 2");
   setTimeout(hideMssg, 5000);
   // console.log("i am here 3");  
}

// window.addEventListener('DOMContentLoaded', (e) => {
// });
notifyControl();

//codes for adding/removing task...
//declaring variables
const addBtn = document.getElementById('add-btn');
const inputField = document.querySelector('.input-item');
const form = document.querySelector('form');
const itemList = document.querySelector('.item-list');

//event listeners
form.addEventListener('submit', addItem);
itemList.addEventListener('mouseup', deleteItem);

//add item
function addItem(e) {
   if (inputField.value !== '') {
      //create li
      const div = document.createElement('div');
      
      //create p
      const p = document.createElement('p');

      //create a tag for edit and delete
      // const aEdit  = document.createElement('a');
      const aDel = document.createElement('a');

      //give class name
      div.className = 'item';
      // aEdit.className = 'edit';
      aDel.className = 'delete';

      //set attribute for edit and delete button
      // aEdit.setAttribute('href', '#');
      aDel.setAttribute('href', '#');

      //append text in p
      p.appendChild(document.createTextNode(inputField.value));

      //append text in edit and delete button
      // aEdit.appendChild(document.createTextNode('Edit'));
      aDel.appendChild(document.createTextNode('Delete'));

      //append p, edit and delete button inside div (.item)
      div.appendChild(p);
      // div.appendChild(aEdit);s
      div.appendChild(aDel);

      //append div (.item) inside the main div (.item-list)
      itemList.appendChild(div);

      //clear out the input field after each entry
      inputField.value = '';

      //prevent default
      e.preventDefault();
   }
   
}

//delete item
function deleteItem(e) {
   if (e.target.classList.contains('delete')) {
      e.target.parentElement.remove();
   }

   //prevent default
   e.preventDefault();
}
