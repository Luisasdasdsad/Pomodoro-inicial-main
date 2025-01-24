let timer;
let isRunning = false;
let timeLeft = 25 * 60; // 25 minutes in seconds
let isWorkTime = true;

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        const circle = document.getElementById('circle');
        circle.style.animation = `shrink ${timeLeft}s linear forwards`;
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timer);
                isRunning = false;
                playAlarm();
                if (isWorkTime) {
                    document.getElementById('status').textContent = 'Tiempo de Descanso';
                    timeLeft = 5 * 60; // 5 minutes in seconds
                } else {
                    document.getElementById('status').textContent = 'Tiempo de Trabajo';
                    timeLeft = 25 * 60; // 25 minutes in seconds
                }
                isWorkTime = !isWorkTime;
                startTimer();
            }
        }, 1000);
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        const circle = document.getElementById('circle');
        const computedStyle = window.getComputedStyle(circle);
        const animationDuration = parseFloat(computedStyle.animationDuration);
        const elapsedTime = (animationDuration - timeLeft) / animationDuration;
        circle.style.animationPlayState = 'paused';
        circle.style.transform = `scale(${1 - elapsedTime})`;
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = 25 * 60;
    isWorkTime = true;
    updateTimerDisplay();
    const circle = document.getElementById('circle');
    circle.style.animation = 'none';
    circle.offsetHeight; /* trigger reflow */
    circle.style.animation = null;
    document.getElementById('status').textContent = 'Tiempo de Trabajo';
}

function playAlarm() {
    const alarmSound = document.getElementById('alarm-sound');
    alarmSound.play();
    setTimeout(() => {
        alarmSound.pause();
        alarmSound.currentTime = 0;
    }, 3000); // Detener el sonido después de 3 segundos
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);

updateTimerDisplay();