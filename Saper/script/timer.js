export class Timer {
    constructor(timerMinutes,timerSeconds) {
        this.timerMinutes = timerMinutes;
        this.timerSeconds = timerSeconds;

        this.timeMinutes = 0;
        this.timeSeconds = 0;
    }
    countTime () {
        setInterval(()=>{
            this.timeSeconds++
            if (this.timeSeconds > 59) {
                this.timeSeconds = 0;
                this.timeMinutes++
            }
            this.timerSeconds.textContent = this.timeSeconds > 9 ? this.timeSeconds : `0${this.timeSeconds}`;
            this.timerMinutes.textContent = this.timeMinutes > 9 ? this.timeMinutes : `0${this.timeMinutes}`
        },1000)
    }
    resetTimer() {
        this.timerSeconds.textContent = '00';
        this.timerMinutes.textContent = '00';
        this.timeMinutes = 0;
        this.timeSeconds = 0;
    };
}