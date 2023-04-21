import Notiflix from 'notiflix';


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
  
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({position, delay})
      }
    }, delay)
})
  
}

const formEl = document.querySelector('.form');
let position = 0;

formEl.addEventListener('submit', (event) => {
  event.preventDefault();

  const delay = parseInt(formEl.delay.value);
  const step = parseInt(formEl.step.value);
  const amount = parseInt(formEl.amount.value);

  for (let i = 0; i < amount; i++){
    createPromise(i+1, delay+step*i)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);

  });
  }
  
})

