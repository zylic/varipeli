import { hideAllScreens } from "./funcs.js";
import { loadQuestion, resetGame, scoreTotal, showEndGame, updateOptionLanguage, updateFactLanguage } from "./game.js";
import { updateLanguage, updateTexts } from "./language.js";
import { getPreviousQuestion, getNextQuestion, nextQuestions } from "./question.js";
import { startTimer } from "./timer.js";

const loadingScreen = document.getElementById('loadingScreen');
const startScreen = document.getElementById('startScreen');
const pregameScreen = document.getElementById('pregameScreen');
const gameScreen = document.getElementById('gameScreen');
const factScreen = document.getElementById('factScreen');
const endGameScreen = document.getElementById('endGameScreen');
const infoScreen = document.getElementById('infoScreen');

export function initEvents() {
    document.querySelector('.StartButton').addEventListener('click', function () {
        hideAllScreens();
        pregameScreen.style.display = 'block';
    });

    // Pregame screen button to game screen
    document.querySelector('.ContinueButton').addEventListener('click', function () {
        const continueButton = this;
        continueButton.disabled = true;
        continueButton.style.pointerEvents = 'none';

        loadQuestion();
        hideAllScreens();
        gameScreen.style.display = 'block'; // Show game screen
        continueButton.disabled = false;
        continueButton.style.pointerEvents = 'auto';

        startTimer();
    });

    // Game screen button to start screen
    document.getElementById('exitButtonGame').addEventListener('click', function () {
        resetGame();
        hideAllScreens();
        startScreen.style.display = 'block';
    });

    // Game screen button to pregame screen
    document.getElementById('infoButtonGame').addEventListener('click', function () {
        hideAllScreens();
        infoScreen.style.display = 'block';
    });

    // Fact screen button to start screen
    document.getElementById('exitButtonFact').addEventListener('click', function () {
        resetGame();
        hideAllScreens();
        startScreen.style.display = 'block';
    });

    // Info button to continue the game after reading how to play the game in the middle of the game
    document.getElementById('infoContinueButton').addEventListener('click', function () {
        hideAllScreens();
        gameScreen.style.display = 'block';
    })

    // End game screen button to start screen
    document.getElementById('exitButtonEnd').addEventListener('click', function () {
        resetGame();
        hideAllScreens();
        startScreen.style.display = 'block';
    });

    // English language button
    document.getElementById('engButton').addEventListener('click', function () {
        updateLanguage('eng');
        updateTexts('eng');
    });

    // Finnish language button
    document.getElementById('finButton').addEventListener('click', function () {
        updateLanguage('fin');
        updateTexts('fin');
    });

    // Language buttons pregame
    document.getElementById('engButtonPregame').addEventListener('click', function () {
        updateLanguage('eng');
        updateTexts('eng');
    });
    document.getElementById('finButtonPregame').addEventListener('click', function () {
        updateLanguage('fin');
        updateTexts('fin');
    });

    // Language buttons info
    document.getElementById('engButtonInfo').addEventListener('click', function () {
        updateLanguage('eng');
        updateTexts('eng');
    });
    document.getElementById('finButtonInfo').addEventListener('click', function () {
        updateLanguage('fin');
        updateTexts('fin');
    });

    // Language buttons game
    document.getElementById('engButtonGame').addEventListener('click', function () {
        updateLanguage('eng');
        updateTexts('eng');
        updateOptionLanguage();
    });
    document.getElementById('finButtonGame').addEventListener('click', function () {
        updateLanguage('fin');
        updateTexts('fin');
        updateOptionLanguage();
    });

    // Language buttons fact
    document.getElementById('engButtonFact').addEventListener('click', function () {
        updateLanguage('eng');
        updateTexts('eng');
        updateFactLanguage();
    });
    document.getElementById('finButtonFact').addEventListener('click', function () {
        updateLanguage('fin');
        updateTexts('fin');
        updateFactLanguage();
    });

    // Language buttons endgame
    document.getElementById('engButtonEndgame').addEventListener('click', function () {
        updateLanguage('eng');
        updateTexts('eng');
    });
    document.getElementById('finButtonEndgame').addEventListener('click', function () {
        updateLanguage('fin');
        updateTexts('fin');
    });

    document.getElementById('factContinue').addEventListener('click', function () {
        factContinue.disabled = true;

        if (scoreTotal >= 5) {
            hideAllScreens();
            showEndGame();
            factContinue.disabled = false;
        } else {
            loadQuestion()
            console.log('Continue button clicked');
            hideAllScreens();
            gameScreen.style.display = 'block';
            // Re-enable the button after loading new question
            factContinue.disabled = false;
            factContinue.style.pointerEvents = 'auto';
        }
    })

    document.getElementById('retryButton').addEventListener('click', () => { // Add event listener to retry button and reset game on click
        resetGame();
        loadQuestion()
        hideAllScreens();
        gameScreen.style.display = 'block';
        startTimer();
    })

    document.getElementById('previousButton').addEventListener('click', function () {
        let questionToUse = getPreviousQuestion();

        console.log(
            "--Previous question nav button clicked--",
            "Question to use: ", questionToUse
        );

        loadQuestion(questionToUse, true);

        updateOptionLanguage();
    });
    
    document.getElementById('nextButton').addEventListener('click', function () {
        let questionToUse = getNextQuestion();

        console.log(
            "--Next question nav button clicked--",
            "Question to use: ", questionToUse
        );

        if (nextQuestions.length === 0) {
            loadQuestion(questionToUse);
        }
        else {
            loadQuestion(questionToUse, true);
        }

        updateOptionLanguage();
    });    
}