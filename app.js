//JS codes below is not working properly at the moment

const notify = document.querySelector('#notify');

function hideMssg() {
   notify.classList.remove(".notify-open");
}

function showMssg() {
   // notify.style.display = 'flex';
}

function notifyControl() {
   setTimeout(hideMssg, 2000);
}

notifyControl();