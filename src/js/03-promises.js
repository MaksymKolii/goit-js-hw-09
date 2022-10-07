//const firstDelay = 1000;
//const amount = 6;
// const step = 200;

import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs ={

  form: document.querySelector('.form')
}

refs.form.addEventListener('submit', onFormSubmit)

function onFormSubmit(e){

  e.preventDefault();

  // if (
  //   !e.currentTarget.elements.delay.value ||
  //   !e.currentTarget.elements.step.value ||
  //   !e.currentTarget.elements.amount.value
  // ) {
  //   return alert('Please input data!');
  // }
  

  let position = 1;
  const  firstDelay =Number(e.currentTarget.elements.delay.value)
  const amount = Number( e.currentTarget.elements.amount.value)
  const step = Number(e.currentTarget.elements.step.value)
  let delay = firstDelay;
  
  for (let i = 0; i < amount; i += 1) {
    createPromise(position, delay)
    .then(({ position, delay }) => {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    delay += step;
    position += 1;
  }

  e.currentTarget.reset();
}

/* Напиши скрипт, который при сабмите формы вызывает функцию createPromise(position, delay) столько раз, сколько ввели в поле amount.
 При каждом вызове передай ей номер создаваемого промиса (position) и задержку учитывая введенную пользователем первую 
 задержку (delay) и шаг (step).*/
// let position = 1;
// const  firstDelay = e.currentTarget.elements.delay.value
// const amount = e.currentTarget.elements.amount.value
// const step = e.currentTarget.elements.step.value
// let delay = firstDelay;

// for (let i = 0; i < amount; i += 1) {
//   createPromise(position, delay)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });
//   delay += step;
//   position += 1;
// }

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay);
  });
}

