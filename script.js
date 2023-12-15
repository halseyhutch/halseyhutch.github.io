document.addEventListener("DOMContentLoaded", function () {
    var timerElement = document.getElementById("timer");
    var progressRing = document.getElementById("progress-ring");
    var startButton = document.getElementById("startButton");
    var audio;
    var totalTime = 600; // 10 minutes in seconds
    var currentTime = totalTime;
    var timerInterval;

    function updateTimer() {
        var minutes = Math.floor(currentTime / 60);
        var seconds = currentTime % 60;

        // Add leading zeros to seconds if necessary
        seconds = seconds < 10 ? "0" + seconds : seconds;

        timerElement.textContent = minutes + ":" + seconds;
    }

    function playBell() {
        // You can replace this with your preferred method of playing a sound
        // For example, using the HTML5 Audio element
        audio.play();
        audioPlayed = true;
    }

    function update() {
        updateTimer();

        if (currentTime === 0) {
            playBell();
            clearInterval(timerInterval);
            startButton.disabled = false; // enable the button when the timer is done
            progressRing.style.display = "none"; // hide the progress ring
        } else if (currentTime % 60 === 0) {
            playBell();
        }

        currentTime--;
    }

    startButton.addEventListener("click", function () {
        audio = new Audio("bell.wav");
        startButton.disabled = true; // disable the button when the timer is running
        progressRing.style.display = "block"; // show the progress ring
        currentTime = totalTime;
        update(); // initial update
        timerInterval = setInterval(update, 1000);
    });
});
