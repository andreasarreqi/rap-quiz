/* jshint esversion: 11 */
const HIGH_SCORE_LIMIT = 4;
const userName = document.querySelector('#username');
const scoreSaveButton = document.querySelector('#scoreSaveButton');
const endScore = document.querySelector('#endScore');
const recentScore = localStorage.getItem('recentScore');
const savedScores = JSON.parse(localStorage.getItem('savedScores')) || [];
let resultMessageText = document.getElementById('result-message');


document.addEventListener("DOMContentLoaded", function () {
    /*
     *Replace placeholder with recent score. 
     */
    endScore.innerText = recentScore;

    /*
     *Enable register button on user input.
     */
    userName.addEventListener('keyup', () => {
        scoreSaveBtn.disabled = !userName.value;
    });

    /*
     *Save user ID and end score.
     */
    saveHighScore = e => {
        e.preventDefault();

        const score = {
            score: recentScore,
            name: userName.value,
        };

        savedScores.push(score);
        savedScores.sort((a, b) => {
            return b.score - a.score;
        });

        savedScores.splice(4);

        localStorage.setItem('savedScores', JSON.stringify(savedScores));

        window.location.assign('leaderboard.html');
    };

    /*
     *Display text depending on how the user does with the answers. 
     */
    function scoreMessage() {
        if (recentScore >= 50) {
            resultMessageText.innerText = 'Splendid, you are a rap fanatic!';
        } else if (recentScore < 50) {
            resultMessageText.innerText = 'You can do better.';
        }

    }

    /*
     *Call the alternative text function.
     */
    scoreMessage();
});