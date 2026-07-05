const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris"
    },
    {
        question: "Which language runs in a web browser?",
        options: ["Java", "C++", "Python", "JavaScript"],
        answer: "JavaScript"
    },
    {
        question: "What does HTML stand for?",
        options: [
            "HyperText Markup Language",
            "Hyper Transfer Markup Language",
            "Hyperlink and Text Markup Language",
            "HighText Machine Language"
        ],
        answer: "HyperText Markup Language"
    }
];

let timeLeft = 60;
let timerInterval;

// Start Exam
function startExam() {
    document.getElementById("quiz-container").style.display = "block";
    document.querySelector(".btn-success").style.display = "none";
    loadQuiz();
}

// Timer
function startTimer() {

    clearInterval(timerInterval);

    timeLeft = 60;
    document.getElementById("timer").textContent = timeLeft;

    timerInterval = setInterval(() => {

        if (timeLeft > 0) {
            timeLeft--;
            document.getElementById("timer").textContent = timeLeft;
        } else {
            clearInterval(timerInterval);
            submitQuiz();
        }

    }, 1000);
}

// Load Quiz
function loadQuiz() {

    const quizContainer = document.getElementById("quiz");
    quizContainer.innerHTML = "";

    document.getElementById("result").innerText = "";
    document.getElementById("progress").innerText =
        `Answered: 0 / ${quizData.length}`;

    quizData.forEach((q, index) => {

        const questionDiv = document.createElement("div");
        questionDiv.classList.add("mb-3");

        questionDiv.innerHTML = `<b>${index + 1}. ${q.question}</b>`;

        q.options.forEach(option => {

            questionDiv.innerHTML += `
                <div class="form-check">
                    <input
                        class="form-check-input"
                        type="radio"
                        name="question${index}"
                        value="${option}"
                        onclick="updateProgress()"
                    >

                    <label class="form-check-label">
                        ${option}
                    </label>
                </div>
            `;

        });

        quizContainer.appendChild(questionDiv);

    });

    startTimer();
}

// Submit Quiz
function submitQuiz() {

    clearInterval(timerInterval);

    let score = 0;

    quizData.forEach((q, index) => {

        const selectedOption = document.querySelector(
            `input[name="question${index}"]:checked`
        );

        const questionDiv = document.querySelectorAll(".mb-3")[index];

        if (selectedOption) {

            if (selectedOption.value === q.answer) {

                score++;
                questionDiv.classList.add("correct");

            } else {

                questionDiv.classList.add("incorrect");

            }

        }

        document
            .querySelectorAll(`input[name="question${index}"]`)
            .forEach(input => input.disabled = true);

    });

    document.getElementById("result").innerText =
        `You scored ${score} out of ${quizData.length}`;

}

// Restart Quiz
function restartQuiz() {

    clearInterval(timerInterval);

    loadQuiz();

}

// Update Progress
function updateProgress() {

    const answered = document.querySelectorAll(
        "input[type='radio']:checked"
    ).length;

    document.getElementById("progress").innerText =
        `Answered: ${answered} / ${quizData.length}`;

}
