let timer;
let isRunning = false;
let startTime;
let lapStartTime;
let laps = [];

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        document.getElementById("laps").innerHTML = "";
    } else {
        startTime = new Date().getTime() - (lapStartTime || 0);
        timer = setInterval(updateDisplay, 10);
        isRunning = true;
    }
}

function pauseResume() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        lapStartTime = new Date().getTime() - startTime;
    } else {
        startTime = new Date().getTime() - lapStartTime;
        timer = setInterval(updateDisplay, 10);
        isRunning = true;
    }
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    startTime = 0;
    lapStartTime = 0;
    laps = [];
    updateDisplay();
    document.getElementById("laps").innerHTML = "";
}

function lap() {
    if (isRunning) {
        const lapTime = new Date().getTime() - startTime;
        laps.push(lapTime);
        const lapList = document.getElementById("laps");
        const lapItem = document.createElement("li");
        lapItem.textContent = formatTime(lapTime);
        lapList.appendChild(lapItem);
    }
}

function updateDisplay() {
    const currentTime = new Date().getTime() - startTime;
    document.getElementById("display").textContent = formatTime(currentTime);
}

function formatTime(time) {
    const date = new Date(time);
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    const milliseconds = date.getUTCMilliseconds();
    return (
        (minutes > 9 ? minutes : "0" + minutes) +
        ":" +
        (seconds > 9 ? seconds : "0" + seconds) +
        "." +
        (milliseconds > 99
            ? milliseconds
            : milliseconds > 9
            ? "0" + milliseconds
            : "00" + milliseconds)
    );
}
