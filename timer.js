let time = 600;
let isPaused = false;
let countdown;
let circle = document.querySelector('.progress-ring__circle');
let circumfrence = 2 * Math.PI * circle.getAttribute('r');

circle.style.strokeDasharray = `${circumfrence} ${circumfrence}`;
circle.style.strokeDashoffset = `${circumfrence}`;

let startButton = document.getElementById('start');
let scheduleDisplay = document.createElement('div');
scheduleDisplay.id = 'schedule';
scheduleDisplay.style.fontSize = '48px';
scheduleDisplay.style.marginTop = '20px';
document.querySelector('.content').appendChild(scheduleDisplay);

let switchSound = new Audio('switch.wav');
let currentSegment = null;

// Schedule array
const schedule = [
    { start: 0, end: 60, text: "standing calf stretch", midSound: true },
    { start: 60, end: 120, text: "calf curb stretch", midSound: true },
    { start: 120, end: 140, text: "shin stretch", midSound: true },
    { start: 140, end: 180, text: "seated butterfly", pause: true  },
    { start: 180, end: 240, text: "figure four", midSound: true },
    { start: 240, end: 300, text: "seated twist", midSound: true },
    { start: 300, end: 360, text: "release the farts", midSound: true },
    { start: 360, end: 420, text: "hamstring stretch", midSound: true },
    { start: 420, end: 480, text: "hip flexors", midSound: true },
    { start: 480, end: 510, text: "wide legged forward fold" },
    { start: 510, end: 540, text: "sun salutations" },
    { start: 540, end: 570, text: "standing quad stretch", midSound: true },
    { start: 570, end: 600, text: "arms / neck" },
];

function updateScheduleText() {
    const currentTime = 600 - time;
    for (const segment of schedule) {
        if (currentTime >= segment.start && currentTime < segment.end) {
            scheduleDisplay.textContent = segment.text;

            // check if we're in a new segment
            if (currentSegment !== segment) {
                currentSegment = segment;
                currentSegment.midPlayed = false; // reset midSound flag for the new segment
            }

            // play midSound halfway through the segment if specified
            if (segment.midSound && !currentSegment.midPlayed) {
                const midpoint = (segment.start + segment.end) / 2;
                if (currentTime >= midpoint) {
                    switchSound.play();
                    currentSegment.midPlayed = true; // ensure it only plays once
                }
            }
            
            // pause timer if the schedule asks for it
            if (currentTime == segment.start && segment.pause && !isPaused) {
                isPaused = true;
                startButton.textContent = 'Resume Timer';
            }
            break;
        }
    }
}

startButton.addEventListener('click', function() {
    bell = new Audio('bell.wav');
    if (this.textContent === 'Start Timer') {
        this.textContent = 'Pause Timer';
        isPaused = false;

        countdown = setInterval(function() {
            if (!isPaused) {
                let minutes = Math.floor(time / 60);
                let seconds = time % 60;

                document.getElementById('timer').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

                if (time != 600 && time % 60 == 0) {
                    bell.play();
                }

                updateScheduleText();

                if (time != 600) {
                    circle.style.strokeDashoffset = `${circumfrence - ((60 - seconds) / 60) * circumfrence}`;
                }

                time--;

                if (time < 0) {
                    clearInterval(countdown);
                    bell.play();
                    circle.style.strokeDashoffset = `0`;
                }
            }
        }, 1000);
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
