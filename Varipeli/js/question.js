import { gameLanguage } from "./language.js";
import { question } from "./game.js";

export let questions = {};
export let usedQuestions = []; // Questions that have been used
export let nextQuestions = []; // Questions that will be used next

const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");

let currentQuestion = null;

export function getQuestion(question = null) {
    if (usedQuestions.length > 0) {
        previousButton.style.display = "block";
    }

    let randomQuestion = null;

    if (question !== null) {
        const foundQuestion = questions[gameLanguage].find(q => q.question === question.question);
        return foundQuestion;
    }

    if (usedQuestions.length === questions[gameLanguage].length) {
        resetQuestions();
    }

    let randomIndex;
    randomIndex = Math.floor(Math.random() * questions[gameLanguage].length);

    randomQuestion = questions[gameLanguage][randomIndex];

    if (usedQuestions.includes(randomQuestion) || nextQuestions.includes(randomQuestion)) {
        return getQuestion();
    }

    currentQuestion = randomQuestion;

    return randomQuestion;
}

export function getPreviousQuestion() {

    console.log(
        "---Get Previous Question---",
        "Current question: ", currentQuestion,
        "Next questions: ", nextQuestions
    );

    nextQuestions.push(currentQuestion);

    currentQuestion = usedQuestions.pop();

    if (usedQuestions.length === 0) {
        previousButton.style.display = "none";
    }

    nextButton.style.display = "block";

    console.log(
        "---Get Previous Question---",
        "Current question: ", currentQuestion,
        "Next questions: ", nextQuestions
    );

    return currentQuestion;
}

export function getNextQuestion() {
    
    console.log(
        "---Get Next Question---",
        "Current question: ", currentQuestion,
        "Used questions: ", usedQuestions
    );

    usedQuestions.push(currentQuestion);

    currentQuestion = nextQuestions.pop();

    if (nextQuestions.length === 0) {
        nextButton.style.display = "none";
    }

    previousButton.style.display = "block";

    console.log(
        "---Get Next Question---",
        "Current question: ", currentQuestion,
        "Used questions: ", usedQuestions
    );

    return currentQuestion;
}

export function resetQuestions() {
    usedQuestions = [];
    nextQuestions = [];
}
