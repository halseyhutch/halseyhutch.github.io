document.addEventListener("DOMContentLoaded", function () {
    var timerElement = document.getElementById("timer");
    var totalTime = 600; // 10 minutes in seconds
    var currentTime = totalTime;

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
        var audio = new Audio("bell.wav");
        audio.play();
    }

    function update() {
        updateTimer();

        if (currentTime === 0) {
            playBell();
            clearInterval(timerInterval);
        } else if (currentTime % 60 === 0) {
            playBell();
        }

        currentTime--;
    }

    // Initial update
    update();

    // Update the timer every second
    var timerInterval = setInterval(update, 1000);
});
