const spanMinutes = document.querySelector('div.wrapper p.countTime span.minutes');
const spanSeconds = document.querySelector('div.wrapper p.countTime span.seconds');
const spanMiliSeconds = document.querySelector('div.wrapper p.countTime span.miliSeconds');
const btnStart = document.querySelector('div.wrapper div.buttons button.start');
const btnStop = document.querySelector('div.wrapper div.buttons button.stop');
const btnReset = document.querySelector('div.wrapper div.buttons button.reset');
const btnSave = document.querySelector('div.wrapper div.buttons button.save');
const btnArchives = document.querySelector('div.wrapper div.archives button.archives');
const btnClear = document.querySelector('div.wrapper div.archives button.clear');
const btnHelp = document.querySelector('button.help');
const popUp = document.querySelector('div.popup')
const btnCloseHelp = document.querySelector('button.popup')
const ol = document.querySelector('div.archives ol');
let minutes = 0;
let seconds = 0;
let miliSeconds = 0;
let interval = null;

const countTime = () => {
        btnStart.style.pointerEvents = 'none';
        interval = setInterval(()=>{
            miliSeconds++
            spanMiliSeconds.textContent = miliSeconds < 10 ? `0${miliSeconds}` : miliSeconds;
            if (miliSeconds==100) {
                miliSeconds = 0;
                spanMiliSeconds.textContent = '00';
                seconds++
                spanSeconds.textContent = seconds < 10 ? `0${seconds}` : seconds;
                if (seconds==60) {
                    seconds = 0;
                    spanSeconds.textContent = '00';
                    minutes++
                    spanMinutes.textContent = minutes < 10 ? `0${minutes}` : minutes;
                }
            }
        },10);
    };
const stopTime = () => {
    clearInterval(interval);
    btnStart.style.pointerEvents = 'auto';
};
const resetTime = () => {
    minutes = 0;
    seconds = 0;    
    miliSeconds = 0;
    spanMinutes.textContent = '00';
    spanSeconds.textContent = '00';
    spanMiliSeconds.textContent = '00';
    clearInterval(interval);
    btnStart.style.pointerEvents = 'auto';
};
const saveResult = () => {
    const li = document.createElement('li');
    li.textContent = `${spanMinutes.textContent}:${spanSeconds.textContent}:${spanMiliSeconds.textContent}`;
    ol.appendChild(li);
};
const showArchives = () => {
    ol.classList.toggle('active');
};
const clearArchives = () => {
    ol.textContent = '';
};
const showHelp = () => {
    popUp.classList.add('active');
};
const closeHelp = () => {
    popUp.classList.remove('active');
};

btnStart.addEventListener('click',countTime);
btnStop.addEventListener('click',stopTime);
btnReset.addEventListener('click',resetTime);
btnSave.addEventListener('click',saveResult);
btnArchives.addEventListener('click',showArchives);
btnClear.addEventListener('click',clearArchives);
btnHelp.addEventListener('click',showHelp);
btnCloseHelp.addEventListener('click',closeHelp);