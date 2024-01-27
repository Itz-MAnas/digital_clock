document.addEventListener('DOMContentLoaded', function () {
    const formatSwitch = document.getElementById('formatSwitch');
    const showTimeButton = document.getElementById('showTime');
    const showStopwatchButton = document.getElementById('showStopwatch');
    const showTimerButton = document.getElementById('showTimer');
    const timeElement = document.getElementById('time');
    const startStopwatchButton = document.getElementById('startStopwatch');
    const stopStopwatchButton = document.getElementById('stopStopwatch');
    const resetStopwatchButton = document.getElementById('resetStopwatch');
    const stopwatchElement = document.getElementById('stopwatch');
    const timerInputElement = document.getElementById('timerInput');
    const startTimerButton = document.getElementById('startTimer');
    const stopTimerButton = document.getElementById('stopTimer');
    const resetTimerButton = document.getElementById('resetTimer');
    const timerElement = document.getElementById('timer');

    let is12HourFormat = true;
    let stopwatchInterval;
    let stopwatchSeconds = 0;
    let timerInterval;
    let timerSeconds = 10;

    function updateTime() {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      if (is12HourFormat) {
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        timeElement.textContent = `${hours}:${padZero(minutes)}:${padZero(seconds)} ${ampm}`;
      } else {
        timeElement.textContent = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
      }
    }

    function padZero(value) {
      return value < 10 ? `0${value}` : value;
    }

    function updateStopwatch() {
      stopwatchSeconds++;
      const hours = Math.floor(stopwatchSeconds / 3600);
      const minutes = Math.floor((stopwatchSeconds % 3600) / 60);
      const seconds = stopwatchSeconds % 60;

      stopwatchElement.textContent = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
    }

    function updateTimer() {
      if (timerSeconds > 0) {
        timerSeconds--;
        const minutes = Math.floor(timerSeconds / 60);
        const seconds = timerSeconds % 60;

        timerElement.textContent = `${padZero(minutes)}:${padZero(seconds)}`;
      } else {
        clearInterval(timerInterval);
        startTimerButton.disabled = false;
        stopTimerButton.disabled = true;
        resetTimerButton.disabled = false;
      }
    }

    formatSwitch.addEventListener('change', function () {
      is12HourFormat = !is12HourFormat;
      updateTime();
    });

    showTimeButton.addEventListener('click', function () {
      hideAllScreens();
      timeElement.style.display = 'block';
    });

    showStopwatchButton.addEventListener('click', function () {
      hideAllScreens();
      stopwatchElement.style.display = 'block';
    });

    showTimerButton.addEventListener('click', function () {
      hideAllScreens();
      timerElement.style.display = 'block';
    });

    function hideAllScreens() {
      timeElement.style.display = 'none';
      stopwatchElement.style.display = 'none';
      timerElement.style.display = 'none';
    }

    startStopwatchButton.addEventListener('click', function () {
      stopwatchInterval = setInterval(updateStopwatch, 1000);
      startStopwatchButton.disabled = true;
      stopStopwatchButton.disabled = false;
    });

    stopStopwatchButton.addEventListener('click', function () {
      clearInterval(stopwatchInterval);
      startStopwatchButton.disabled = false;
      stopStopwatchButton.disabled = true;
    });

    resetStopwatchButton.addEventListener('click', function () {
      clearInterval(stopwatchInterval);
      stopwatchSeconds = 0;
      stopwatchElement.textContent = '00:00:00';
      startStopwatchButton.disabled = false;
      stopStopwatchButton.disabled = true;
    });

    startTimerButton.addEventListener('click', function () {
      timerSeconds = parseInt(timerInputElement.value, 10);
      timerInterval = setInterval(updateTimer, 1000);
      startTimerButton.disabled = true;
      stopTimerButton.disabled = false;
      resetTimerButton.disabled = true;
    });

    stopTimerButton.addEventListener('click', function () {
      clearInterval(timerInterval);
      startTimerButton.disabled = false;
      stopTimerButton.disabled = true;
      resetTimerButton.disabled = false;
    });

    resetTimerButton.addEventListener('click', function () {
      clearInterval(timerInterval);
      timerSeconds = parseInt(timerInputElement.value, 10);
      timerElement.textContent = `${padZero(Math.floor(timerSeconds / 60))}:${padZero(timerSeconds % 60)}`;
      startTimerButton.disabled = false;
      stopTimerButton.disabled = true;
      resetTimerButton.disabled = false;
    });

    // Initial update
    updateTime();
    setInterval(updateTime, 1000);
  });