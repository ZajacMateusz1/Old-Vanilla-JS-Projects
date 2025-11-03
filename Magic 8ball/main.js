const ball = document.querySelector('div.ball img');
const input = document.querySelector('input');
const pAnswer = document.querySelector('p.answer');
const pError = document.querySelector('p.error');
const answers = ['Tak','Z pewnością','Wszytko wsakzuje na to, że tak','Bez cienia wątpliwości','Zdecydowanie','Być może','Spytaj się jeszcze raz','Nie mogę teraz na to odpowiedzieć','Lepiej nie mówić o tym teraz','Nie','Nie licz na to','Moje źródła mowią, że nie','Wszystkie znaki wskazują na to, że nie'];


const selectAnswer = (array) => {
   pAnswer.textContent = array[Math.floor(Math.random()*(array.length-1))];
};
const checkAnswer = (input) => {
   if(!input.value) {
      pAnswer.textContent = '';
      pError.textContent = 'Nie zadałeś pytania!';
   }
   else if ((input.value).slice(-1) !== '?'){
      pAnswer.textContent = '';
      pError.textContent = 'Pytanie musi kończyć się znakiem "?"';
   }
   else {
      pError.textContent = '';
      selectAnswer(answers);
   };
};
const getAnswer = (e) => {
   if (e.keyCode == 13) {
         ball.classList.add('animation-active');
      setTimeout(()=>{
         checkAnswer(input);
         ball.classList.remove('animation-active');},1000);
   }
};

document.addEventListener('keydown',getAnswer)