//setting scroll to zero
window.scrollTo(0, 0);

//setting notify system
const warnNotify = document.querySelector('.warning');
const warnText = document.querySelector('.warn-text');

const infoNotify = document.querySelector('.information');
const infoText = document.querySelector('.info-text');

//for warning messages
function hideWarnMssg() {
   warnNotify.classList.remove("notify-open");
   warnNotify.classList.add("notify-close");
}

function showWarnMssg() {
   warnNotify.classList.remove("notify-close");
   warnNotify.classList.add("notify-open");
}

//for information messages
function hideInfoMssg() {
   infoNotify.classList.remove("notify-open");
   infoNotify.classList.add("notify-close");
}

function showInfoMssg(mssg) {
   infoNotify.classList.remove("notify-close");
   infoNotify.classList.add("notify-open");

   infoText.textContent = mssg;
}

function notifyControl() {
   hideInfoMssg();
   showWarnMssg();
   setTimeout(hideWarnMssg, 5000);
}

function infoNotifyControl(mssg) {
   console.log(typeof(mssg));
   showInfoMssg(mssg);
   setTimeout(hideInfoMssg, 5000);
}

notifyControl();