import questions from "./question.js";

const questionElement = document.querySelector(".question");
const answersElement = document.querySelector(".answers");
const spnQtd = document.querySelector(".spnQtd");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".finish button");

let currentIndex = 0;
let questionsCorrect = 0;

btnRestart.onclick = () => {
    content.style.display = "flex";
    contentFinish.style.display = "none";

    currentIndex = 0;
    questionsCorrect = 0;
    loadQuestion();
};

function nextQuestion(e) {
    const selectedAnswer = e.target.textContent;
    const currentQuestion = questions[currentIndex];
    
    const isCorrect = currentQuestion.options.find(option => {
        return option.option === selectedAnswer && option.correct;
    });

    if (isCorrect) {
        questionsCorrect++;
    }

    if (currentIndex < questions.length - 1) {
        currentIndex++;
        loadQuestion();
    } else {
        finish();
    }
}

function finish() {
    textFinish.innerHTML = `Você acertou ${questionsCorrect} de ${questions.length} questões.`;
    content.style.display = "none";
    contentFinish.style.display = "flex";
}

function loadQuestion() {
    spnQtd.innerHTML = `${currentIndex + 1}/${questions.length}`;
    const currentQuestion = questions[currentIndex];
    questionElement.innerHTML = currentQuestion.question;
    answersElement.innerHTML = "";

    currentQuestion.options.forEach((option) => {
        const button = document.createElement("button");
        button.textContent = option.option;
        button.setAttribute("data-correct", option.correct.toString());
        button.classList.add("answer");
        button.addEventListener("click", nextQuestion);
        answersElement.appendChild(button);
    });
}

loadQuestion();