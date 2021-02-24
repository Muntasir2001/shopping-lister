// const { auth } = require("firebaseui");

// let ui = new firebaseui.auth.AuthUI(firebase.auth());
const tabs = document.querySelector('.tabs');
const loginTab = document.querySelector('.login-tab');
const regTab = document.querySelector('.register-tab');

const form = document.getElementById('forms');
const loginForm = document.querySelector('#login-form');
const regForm = document.querySelector('#register-form');

const loginEmail = document.getElementById('login-email');
const loginPass = document.getElementById('login-password');
const regEmail = document.getElementById('reg-email');
const regPass = document.getElementById('reg-password');

//store current url
let url = window.location.hostname;

//event listeners for the tabs
loginTab.addEventListener('click', toLoginTab);
regTab.addEventListener('click', toRegTab);

//event listeners for the login/register form
loginForm.addEventListener('submit', loginSubmit);
regForm.addEventListener('submit', regSubmit);


// login tab eventListener function
function toLoginTab(e) {
   e.preventDefault();

   loginForm.style.display = 'block';
   regForm.style.display = 'none';
   loginTab.style.color = '#e79e19';
   loginTab.style.borderBottomColor = '#e79e19';
   regTab.style.color = '#E3E3E3';
   regTab.style.borderBottomColor = '#E3E3E3';
}

// registration tab eventListener function
function toRegTab(e) {
   e.preventDefault();

   regForm.style.display = 'block';
   loginForm.style.display = 'none';
   regTab.style.color = '#e79e19';
   regTab.style.borderBottomColor = '#e79e19';
   loginTab.style.color = '#E3E3E3';
   loginTab.style.borderBottomColor = '#E3E3E3';
}

// login form submission
function loginSubmit(e) {
   e.preventDefault();

   //get email
   const email = loginEmail.value;
   
   //get password
   const password = loginPass.value;

   auth.signInWithEmailAndPassword(email, password)
      .then(cred =>  {
         loginEmail.value = '';
         loginPass.value = '';

         let dummyURL = 'index.html';

         infoNotifyControl("Login Successful!");
         // window.location.href = `${url}/index.html`;
         history.pushState({dummyURL}, '', 'index.html');
         location.reload();
      });
}

//registration form submission
function regSubmit(e) {
   e.preventDefault();

   //get email
   const email = regEmail.value;
   
   //get password
   const password = regPass.value;

   //register the user
   auth.createUserWithEmailAndPassword(email, password)
      .then(cred => {
         regEmail.value = '';
         regPass.value = '';
         
         infoNotifyControl("Registration Successful!");
      })
}

//logout 
function logout(mssg) {
   console.log(mssg);
}

//listen for auth status changes
auth.onAuthStateChanged((user) => {
   if (user) {
      console.log(`User ${user.email} has logged in`);
   } else {
      console.log("An user has logged out");
   }
});
