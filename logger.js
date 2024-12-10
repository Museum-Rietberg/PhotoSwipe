let currentTime;
let hours;
let minutes;
let weekday;
let logIsDownloaded = false;
let pingIsLogged = false;

setInterval(function () { // Timer-Setup
    currentTime = new Date();
    hours = currentTime.getHours();
    minutes = currentTime.getMinutes();
    weekday = currentTime.getDay();

    if (!logIsDownloaded) { //check if log is already downloaded
        //check opening hours
        if (weekday !== 3 && hours === 17 && minutes === 10 || //check if it's not Wednesday (Museum closes at 17h)
            currentTime.getMonth() === 4 && currentTime.getDate() === 1 && hours === 17 && minutes === 10 || //check if it's may 1st (Museum closes at 17h)
            weekday === 3 && hours === 20 && minutes === 10) //check if it's Wednesday (Museum closes at 20h)
        {
            downloadLog();
            logIsDownloaded = true;
        }
    }
    if (!pingIsLogged) { // Ping-Logger to check every hour if Kiosk is running
        if (minutes === 1){
        pingLogger();
        pingIsLogged = true;
        }
    }
    if (pingIsLogged) {
        if (minutes === 2){
        pingIsLogged = false;
    }
    }

}, 10000); // set current time every 10s

function accessLogger() {

  // Get Timestamp
  var currentdate = new Date();
  var datetime =
    currentdate.getDate() +
    "." +
    (currentdate.getMonth() + 1) +
    "." +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();

  // write timestamp to localstorage
  localStorage.setItem(`Start ${localStorage.length + 1}`, datetime);
}

/* function interactionLogger() { // TO-DO: Add interval (once per minute?) to reduce logs

  // Get Timestamp
  var currentdate = new Date();
  var datetime =
    currentdate.getDate() +
    "." +
    (currentdate.getMonth() + 1) +
    "." +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();

    setInterval(
  // write timestamp to localstorage
  localStorage.setItem(`Interaction ${localStorage.length + 1}`, datetime);
, 60000); // sets logging interval to 1 minute (in milliseconds)
} */

function pingLogger() {

  // Get Timestamp
  var currentdate = new Date();
  var datetime =
    currentdate.getDate() +
    "." +
    (currentdate.getMonth() + 1) +
    "." +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();

  // write timestamp to localstorage
  localStorage.setItem(`Ping ${localStorage.length + 1}`, datetime);
}