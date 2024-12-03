const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Rome", "Berlin"],
        answer: "Paris",
    },
    {
        question: "Which programming language is used for web development?",
        options: ["Python", "JavaScript", "C++", "Java"],
        answer: "JavaScript",
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: "Jupiter",
    },
];

let currentQuestionIndex = 0; // Current question index
let score = 0; // User's score
let timeLeft = 30; // Time for the quiz
let timerInterval; // Timer interval reference

// DOM Elements
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("time-left");

// Load the current question and options
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    optionsEl.innerHTML = ""; // Clear previous options

    // Create options
    currentQuestion.options.forEach((option) => {
        const li = document.createElement("li");
        li.textContent = option;
        li.classList.add("option");
        li.onclick = () => selectOption(li, currentQuestion.answer);
        optionsEl.appendChild(li);
    });

    // Disable Next button until an option is selected
    nextBtn.disabled = true;
}

// Handle option selection
function selectOption(selectedOption, correctAnswer) {
    const allOptions = document.querySelectorAll("#options li");
    allOptions.forEach((option) => (option.style.pointerEvents = "none")); // Disable further selection

    // Highlight the selected option
    if (selectedOption.textContent === correctAnswer) {
        selectedOption.style.backgroundColor = "lightgreen";
        score++; // Increment score for a correct answer
    } else {
        selectedOption.style.backgroundColor = "red";
    }

    nextBtn.disabled = false; // Enable the Next button
}

// Load the next question or show results
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion(); // Load next question
    } else {
        showResult(); // Show results if no more questions
    }
}

// Display the results
function showResult() {
    document.getElementById("quiz").classList.add("hidden"); // Hide quiz
    resultEl.classList.remove("hidden"); // Show results
    scoreEl.textContent = score; // Display final score
    clearInterval(timerInterval); // Stop the timer
}

// Start the timer
function startTimer() {
    timerEl.textContent = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            showResult(); // Show results if time runs out
        }
    }, 1000);
}

// Event listener for Next button
nextBtn.addEventListener("click", nextQuestion);

// Initialize the quiz
loadQuestion();
startTimer();

