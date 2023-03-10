(async function () {
  let col;
  let pause;
  // first question
  let myData = (await fetch('questions.json')).json();
  myData = await myData;
  for (let i = 0; i < myData.length; i++) {
    let bullet = document.createElement('span');
    bullet.classList.add('bullet');
    document.querySelector('.conter').append(bullet);
  }
  let done = 0;
  let title = document.querySelector('.question-container .title');
  title.innerText = `${myData[done].title}`;
  let ansawer = document.querySelectorAll('.ansawer');
  for (let i = 0; i < ansawer.length; i++) {
    ansawer[i].innerText = myData[done][`ansawer_${i + 1}`];
  }
  let timer = document.querySelector('.timer');
  colDown();
  let bullets = document.querySelectorAll('.bullet');
  ansawer.forEach((span) => {
    span.addEventListener('click', () => {
      if (span.innerHTML == myData[done].right) {
        bullets[done].classList.add('right', 'done');
      } else {
        bullets[done].classList.add('wrong', 'done');
      }
      clearInterval(col);
      nextQuestion();
    });
  });

  // Functions

  function colDown() {
    clearInterval(col);
    let seconde = 29;
    let width = 100;
    col = setInterval(() => {
      width -= 10 / 3;
      timer.innerHTML = `00:${seconde}<span class="progre" style="width: ${width}%"></span>`;
      seconde -= 1;
    }, 1000);
    pause = setTimeout(() => {
      bullets[done].classList.add('wrong', 'done');
      timer.innerHTML = `00:30<span class="progre" style="width: 100%"></span>`;
      nextQuestion();
    }, 30000);
  }

  async function nextQuestion() {
    done++;
    clearTimeout(pause);
    if (done == bullets.length) {
      let wrong = document.querySelectorAll('.wrong');
      document.body.innerHTML = `<div class="result">Your worng Ansawer are <span style="color: red">${
        wrong.length
      }</span>,
    and The Right <span style="color: green">${
      bullets.length - wrong.length
    }</span></div>`;
      return;
    }
    let title = document.querySelector('.question-container .title');
    title.innerText = `${myData[done].title}`;
    let ansawer = document.querySelectorAll('.ansawer');
    for (let i = 0; i < ansawer.length; i++) {
      ansawer[i].innerText = myData[done][`ansawer_${i + 1}`];
    }
    let timer = document.querySelector('.timer');
    clearInterval(col);
    colDown();
  }
})();
