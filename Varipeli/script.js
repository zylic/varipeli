import { updateLanguage, updateTexts, texts } from "./js/language.js";
import { initEvents } from "./js/events.js";
import { questions } from "./js/question.js";

document.addEventListener('DOMContentLoaded', function () {
    initEvents();

    Promise.all([
        fetch('./data/questions.json').then(response => response.json()),
        fetch('./data/texts.json').then(response => response.json())
    ])
    .then(([questionsData, textsData]) => {
        Object.assign(questions, questionsData);
        Object.assign(texts, textsData);
        
        updateLanguage("fin");
        updateTexts("default");
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
});