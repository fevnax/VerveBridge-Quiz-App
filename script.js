const quizData = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correctAnswer: 2
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctAnswer: 3
    },
    {
        question: "Which country is home to the kangaroo?",
        options: ["New Zealand", "South Africa", "Australia", "Brazil"],
        correctAnswer: 2
    }
];

let currentQuestion = 0;
let score = 0;
let userAnswers = [];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const submitBtn = document.getElementById("submit-btn");
const resultEl = document.getElementById("result");
const progressEl = document.getElementById("progress");

function loadQuestion() {
    const question = quizData[currentQuestion];
    questionEl.textContent = question.question;

    optionsEl.innerHTML = "";
    question.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option");
        button.addEventListener("click", () => selectOption(button, index));
        optionsEl.appendChild(button);
    });

    submitBtn.style.display = "block";
    resultEl.innerHTML = "";
    updateProgress();
}

function selectOption(selectedButton, index) {
    const options = document.querySelectorAll(".option");
    options.forEach(button => button.classList.remove("selected"));
    selectedButton.classList.add("selected");
    userAnswers[currentQuestion] = index;
}

function updateProgress() {
    const progress = ((currentQuestion) / quizData.length) * 100;
    progressEl.style.width = `${progress}%`;
}

submitBtn.addEventListener("click", () => {
    if (userAnswers[currentQuestion] === undefined) {
        alert("Please select an answer before submitting.");
        return;
    }

    if (userAnswers[currentQuestion] === quizData[currentQuestion].correctAnswer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    questionEl.style.display = "none";
    optionsEl.style.display = "none";
    submitBtn.style.display = "none";
    progressEl.style.width = '100%';
    resultEl.innerHTML = `
        <h2>Quiz Completed!</h2>
        <p>Your score: ${score} out of ${quizData.length}</p>
        <button class="submit-btn" onclick="restartQuiz()">Restart Quiz</button>
    `;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    questionEl.style.display = "block";
    optionsEl.style.display = "grid";
    resultEl.innerHTML = "";
    loadQuestion();
}

loadQuestion();