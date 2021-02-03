// console.log(firebase);

//setting scroll to zero
window.scrollTo(0, 0);

//setting notify system
const notify = document.querySelector('.warning');

function hideMssg() {
   notify.classList.remove("warning-open");
   notify.classList.add("warning-close");
}

function showMssg() {
   notify.classList.remove("warning-close");
   notify.classList.add("warning-open");
}

function notifyControl() {
   showMssg();
   setTimeout(hideMssg, 5000);
}

notifyControl();

//codes for adding/removing task...
//declaring variables
const addBtn = document.getElementById('add-btn');
const inputField = document.querySelector('.input-item');
const form = document.querySelector('#form');
const itemList = document.querySelector('.item-list');

//event listeners
form.addEventListener('submit', addItem);
// addBtn.addEventListener('mouseup', addItem);
itemList.addEventListener('mouseup', deleteItem);

//firebase timestamp functionality
const { serverTimestamp } = firebase.firestore.FieldValue;

//add item
function addItem(e) {
   //prevent default
   e.preventDefault();

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

      console.log(typeof(inputField.value));

      //saving data to firestore database
      db.collection('items').add({
         item: inputField.value,
         createdAt: serverTimestamp()
      });
      
      inputField.value = '';
   }
}

//delete item
function deleteItem(e) {
   if (e.target.classList.contains('delete')) {
      e.target.parentElement.remove();

      //gets the id of each list
      const id = e.target.parentElement.querySelector('p').getAttribute('data-id');

      //finds the document using "doc" and by passing the "id" param and deletes it
      db.collection('items').doc(id).delete();
   }

   //prevent default
   e.preventDefault();
}

function getItems(items) {
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
   p.appendChild(document.createTextNode(items.data().item));

   //put identification for p eleement
   p.setAttribute('data-id', items.id);

   //append text in edit and delete button
   // aEdit.appendChild(document.createTextNode('Edit'));
   aDel.appendChild(document.createTextNode('Delete'));

   //append p, edit and delete button inside div (.item)
   div.appendChild(p);
   // div.appendChild(aEdit);s
   div.appendChild(aDel);

   //append div (.item) inside the main div (.item-list)
   itemList.appendChild(div);
}

//get item from firestore using firebase commands
db.collection('items').get()
   .then((data) => {
      //get the data from firestore by using for each loop
      data.docs.forEach(list => {
         console.log(list.data()); //get the data from the firestore
         getItems(list);
      })
   })
