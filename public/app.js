// console.log(firebase);

//setting scroll to zero
window.scrollTo(0, 0);

//random number generator
let i = Math.random() * 2;


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
// addBtn.addEventListener('mouseup', addItem);
itemList.addEventListener('mouseup', deleteItem);

//firebase config
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();
const { serverTimestamp } = firebase.firestore.FieldValue;

//get item from database
// db.collection("items")
// .get()
//    .then((querySnapshot) => {
//       querySnapshot.forEach((doc) => {
//          console.log(doc.data());
//       });
//    });

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
      
      db.collection("items").doc(`item${i}`).set({
         item: inputField.value,
         createdAt: serverTimestamp()
      })
      .then(function() {
         console.log("Document successfully written!");
      })
      .catch(function(error) {
         console.error("Error writing document: ", error);
      });
      
      console.log(inputField.value);
      inputField.value = '';

   }
   
   //prevent default
   e.preventDefault();
}

//delete item
function deleteItem(e) {
   if (e.target.classList.contains('delete')) {
      e.target.parentElement.remove();
   }

   //prevent default
   e.preventDefault();
}

//firebase connection
// const db = firebase.firestore();
// console.log(db);

// let thingsRef; //reference to a database location  
// let unsubscribe; //subscribe/unsubscribe to real time changes

// thingsRef = db.collection('items');

// //when button is clicked
// addBtn.onclick = () => {
   //    //add new document and generate new id
   //    thingsRef.add({
      //       item: inputField.value,
      //       createdAt: serverTimestamp()
      //    })   
      // }
