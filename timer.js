let time = 600;
let bell = document.getElementById('bell')
let isPaused = false;
let countdown;
let circle = document.querySelector('.progress-ring__circle');
let circumfrence = 2 * Math.PI * circle.getAttribute('r');

circle.style.strokeDasharray = `${circumfrence} ${circumfrence}`;
circle.style.strokeDashoffset = `${circumfrence}`;

let startButton = document.getElementById('start');
startButton.addEventListener('click', function() {
    if (this.textContent === 'Start Timer') {
        this.textContent = 'Pause Timer';

        countdown = setInterval(function() {
            if (!isPaused) {
                let minutes = Math.floor(time / 60);
                let seconds = time % 60;

                document.getElementById('timer').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

                if (time != 600 && time % 60 == 0) {
                    bell.play();
                }
                
                // attempt to avoid weird loading animation
                if (time != 600) {
                    circle.style.strokeDashoffset = `${circumfrence - ((60 - seconds) / 60) * circumfrence}`;
                }

                time--;
            }

            if (time < 0) {
                clearInterval(countdown);
                bell.play();
                circle.style.strokeDashoffset = `0`;
            }
        }, 1000)
    } else {
        if (isPaused) {
            this.textContent = 'Pause Timer';
            isPaused = false;
        } else {
            this.textContent = 'Resume Timer';
            isPaused = true;
        }
    }
});