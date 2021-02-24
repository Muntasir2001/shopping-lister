//codes for adding/removing task...
//declaring variables
const addBtn = document.getElementById('add-btn');
const inputField = document.querySelector('.input-item');
const form = document.querySelector('#item-form');
const itemList = document.querySelector('.item-list');

const logoutBtn = document.getElementById('logout-btn');

//global storage for email of users
let userUID;

//store current url
let currentURL = window.location.href;
let newURL;

//event listeners
form.addEventListener('submit', addItem);
// addBtn.addEventListener('mouseup', addItem);
itemList.addEventListener('mouseup', deleteItem);

//logout btn event listener
logoutBtn.addEventListener('mouseup', logoutUser);

//firebase timestamp functionality
const { serverTimestamp } = firebase.firestore.FieldValue;

//url editing for redirecting purpose ###TESTING###
// function urlRedirect(url = 'index.html') {
//    let urlElements = currentURL.split('/');
//    let filename = urlElements.pop();
//    console.log(urlElements);
//    console.log(filename);

//    if (filename === 'index.html' || filename === 'auth.html') {
//       filename = url;
//       urlElements.push(filename);
//       console.log(urlElements);
//       newURL = urlElements.join('');
//       console.log(currentURL);
//       console.log(newURL);
//    }

// }

// urlRedirect();

//add item to the frontend
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

      // console.log(typeof(auth.getU));

      //saving data to firestore database
      db.collection(`${userUID}`).add({
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
      db.collection(`${userUID}`).doc(id).delete();
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

//logout user - auth functionality
function logoutUser(e) {
   e.preventDefault();

   auth.signOut()
      .then(() => console.log("user has logged out"));
   // logout("User logged out");
   // window.location.href = `${url}/auth.html`;
}

//listen for auth status changes
auth.onAuthStateChanged((user) => {
   if (user) {
      console.log(`User ${user.email} has logged in`);

      //get item from firestore using firebase commands
      db.collection(`${userUID}`).get()
      .then((data) => {
         //get the data from firestore by using for each loop
         data.docs.forEach(list => {
            // console.log(list.data()); //get the data from the firestore
            getItems(list);
         })
      })
   } else {
      console.log("An user has logged out");
      // window.location.href = `${url}/auth.html`;
      let dummyURL = 'auth.html'
      history.pushState({dummyURL}, '', 'auth.html');
      location.reload();
   }
});
