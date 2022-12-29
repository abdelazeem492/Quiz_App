let counterSpan = document.querySelector(".quiz-info .count span");
let spans = document.querySelector(".bullets .spans");
let bulletsS = document.querySelector(".bullets");
let questionArea = document.querySelector(".question-area");
let answersArea = document.querySelector(".answers-area");
let submit = document.querySelector(".submit-button");
let result = document.querySelector(".results");
let countdownEle = document.querySelector(".countdown");
let currentIndex = 0;
let rightAns = 0;
let countdownInterval;

function getQuestions() {
  let request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let jsQuestions = JSON.parse(this.responseText);
      let questionsCount = jsQuestions.length;
      createBullets(questionsCount);
      addQuestionData(jsQuestions[currentIndex], questionsCount);
      countdown(30, questionsCount);
      submit.onclick = () => {
        let rightAns = jsQuestions[currentIndex].right_ans;
        currentIndex++;
        checkAnswer(rightAns, questionsCount);
        questionArea.innerHTML = "";
        answersArea.innerHTML = "";
        addQuestionData(jsQuestions[currentIndex], questionsCount);
        bullets();
        clearInterval(countdownInterval);
        countdown(30, questionsCount);
        showResults(questionsCount);
      };
    }
  };

  request.open("GET", "questions.json", true);
  request.send();
}

getQuestions();

function createBullets(num) {
  counterSpan.innerHTML = num;
  for (let i = 0; i < num; i++) {
    let span = document.createElement("span");
    spans.appendChild(span);
    if (i === 0) {
      span.className = "open";
    }
  }
}

function randomQuestions(Q) {
  return Q[Math.floor(Math.random() * Q.length)];
}

function addQuestionData(obj, count) {
  if (currentIndex < count) {
    let qTitle = document.createElement("h2");
    qTitle.innerText = obj.title;
    questionArea.appendChild(qTitle);

    for (let i = 1; i <= 4; i++) {
      let answer = document.createElement("div");
      answer.className = "answer";
      let radioInput = document.createElement("input");
      radioInput.type = "radio";
      radioInput.name = "answers";
      radioInput.id = `ans_${i}`;
      radioInput.dataset.answer = obj[`ans_${i}`];
      let label = document.createElement("label");
      label.htmlFor = radioInput.id;
      label.innerText = obj[`ans_${i}`];

      answersArea.appendChild(answer);
      answer.appendChild(radioInput);
      answer.appendChild(label);
    }
  }
}

function checkAnswer(r, c) {
  let answers = document.getElementsByName("answers");
  let choosenAns;

  for (i = 0; i < 4; i++) {
    if (answers[i].checked) {
      choosenAns = answers[i].dataset.answer;
    }
  }
  if (r === choosenAns) {
    rightAns++;
  }
}

function bullets() {
  let bulletsSpans = document.querySelectorAll(".bullets .spans span");
  let arrSpans = Array.from(bulletsSpans);
  arrSpans.forEach((span, i) => {
    if (currentIndex === i) {
      span.className = "open";
    }
  });
}

function showResults(count) {
  let results;
  if (currentIndex === count) {
    questionArea.remove();
    answersArea.remove();
    bulletsS.remove();
    submit.remove();

    if (rightAns > count / 2 && rightAns < count) {
      results = `<span class = "good">Good</span> : You Answered ${rightAns} From ${count}`;
    } else if (rightAns === count) {
      results = `<span class="perfect">Perfect</span> : You Answered ${rightAns} From ${count}`;
    } else {
      results = `<span class="bad">Bad</span> : You Answered ${rightAns} From ${count}`;
    }
    result.innerHTML = results;
    result.style.padding = "20px";
    result.style.marginTop = "20px";
    result.style.backgroundColor = "var(--mainColor)";
    result.style.fontSize = "20px";
  }
}

function countdown(duration, count) {
  if (currentIndex < count) {
    let minutes, seconds;
    countdownInterval = setInterval(() => {
      // minutes = parseInt(duration / 60);
      // seconds = parsInt(duration % 60);
      seconds = duration;
      seconds = seconds < 10 ? `0${seconds}` : seconds;
      countdownEle.innerHTML = `00 : ${seconds}`;
      // minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      if (--duration < 0) {
        clearInterval(countdownInterval);
        submit.click();
      } else if (--duration < 5) {
        countdownEle.style.color = "#dc0a0a";
      } else if (toggle.className == "active") {
        countdownEle.style.color = "black";
      } else {
        countdownEle.style.color = "#fff";
      }
    }, 1000);
  }
}
