const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
    question: 'In which U.S city was the hip hop culture created?',
    choice1: 'Chicago',
    choice2: 'Los Angeles',
    choice3: 'New York City',
    choice4: 'Compton',
    correctAnswer: 'New York City'
},
{
    question: 'Which actor and rapper is often known as Ice Cube?',
    choice1: 'Kanye West',
    choice2: 'OShea Jackson',
    choice3: 'Calvin Broadus',
    choice4: 'Kevin Hart',
    correctAnswer: 'OShea Jackson'

},
{
    question: 'Which of the following is not a hip hop group?',
    choice1: 'B2K',
    choice2: 'Bone Thugz n Harmony',
    choice3: 'N.W.A',
    choice4: 'Public Enemy',
    correctAnswer: 'B2K'
},
{
    question: 'The American hip hop star Dr. Dre also has a popular brand of which product with his name?',
    choice1: 'Shoes',
    choice2: 'Food',
    choice3: 'Headphones',
    choice4: 'Clothes',
    correctAnswer: 'Headphones'
},
{
    question: 'There are four original elements of hip hop culture: break dancing, deejaying, rapping, and what else?',
    choice1: 'Beatboxing',
    choice2: 'Graffiti',
    choice3: 'Locking',
    choice4: 'Blues',
    correctAnswer: 'Graffiti'
},
{
    question: 'What is the name of the first album by Jay-Z?',
    choice1: 'The Blueprint',
    choice2: 'Reasonable Doubt',
    choice3: 'Watch the Throne',
    choice4: 'Brooklyns finest',
    correctAnswer: 'Reasonable Doubt'
},
{
    question: 'The UK number 1 hit “Ghetto Gospel” was a collaboration between Elton John and which hip hop legend?',
    choice1: 'Lil Wayne',
    choice2: 'Tupac Shakur',
    choice3: 'Eminem',
    choice4: 'LL COOL J',
    correctAnswer: 'Tupac Shakur'
},
{
    question: 'What was the first rap name of Biggie Smalls, also known as The Notorious B.I.G?',
    choice1: 'M.C. Quest',
    choice2: 'M.C. Best',
    choice3: 'M.C. Jest',
    choice4: 'M.C. Cheques',
    correctAnswer: 'M.C. Quest'
},
{
    question: 'Which of the following record labels featured famous artists, such as Snoop Dogg, Dr. Dre, and Tupac?',
    choice1: 'Def Jam',
    choice2: 'Death Row Records',
    choice3: 'Roc-A-Fella',
    choice4: 'Bad Boy Records',
    correctAnswer: 'Death Row Records'
},
{
    question:'Which artist holds the record for the most wins in the Grammy Award for Best',
    choice1: 'Nas',
    choice2: 'Eminem',
    choice3: 'Jay Z',
    choice4: 'Snoop Dogg',
    correctAnswer: 'Eminem'
},
];

const SCORE_POINTS = 10;
const MAX_QUESTIONS = 10;

 document.addEventListener("DOMContentLoaded", function () {
    /*
     *Display timer countdown to the player.
     *Reset score on time out to the result page.
     */
    var second = 60;
    var timeInterval = setInterval(quizTimer, 1000);

    function quizTimer() {
        document.getElementById('timer').innerHTML = second + "s left";
        second--;
        if (second === -2) {
            clearInterval(timeInterval);
            document.getElementById('timer').innerHTML = "0s left";
            alert('Your time has run out!');
            resetScore();
            return window.location.assign('result.html');
        }
    }

    /** 
     * Start the game by setting the default value to the score counter and progress bar 
     * and calling the first question along with its answers.
     * The questions are randomized.
     */
    function startGame() {
        questionCounter = 0;
        score = 0;
        availableQuestions = [...questions]; /* Spread operator */
        getNewQuestion();
    }

    //Randomize question choices
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    /*
     *Get new question from questions array and display in the front end.
     *Increment question counter and progress bar values.
     *Shuffle answer choices.
     *Display the randomized choices in the front end.
     */
    getNewQuestion = () => {
        if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
            localStorage.setItem('recentScore', score);

            return window.location.assign('result.html'); /* Take player to end game*/
        }

        questionCounter++;
        progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
        progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;


        const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
        currentQuestion = availableQuestions[questionsIndex];
        question.innerText = currentQuestion.question;

        const answerChoices = [
            currentQuestion.choice1,
            currentQuestion.choice2,
            currentQuestion.choice3,
            currentQuestion.choice4,
        ];

        shuffle(answerChoices);

        choices.forEach((choice, index) => {
            choice.innerHTML = answerChoices[index];
        });

        availableQuestions.splice(questionsIndex, 1);

        acceptingAnswers = true;
    };

    /*
     *Detect user click
     *Compare user's selected choice with the correct answer value.
     *Light up green or yellow depending on correctness and if correct, increment score value.
     *Remove the light up effect.
     */
     choices.forEach(choice => {
        choice.addEventListener('click', e => {
            if (!acceptingAnswers) return;

            acceptingAnswers = false;
            const selectedChoice = e.target;
            const selectedAnswer = selectedChoice.dataset.number;
            let classToApply = selectedChoice.innerText == currentQuestion.correctAnswer ? 'correct' : 'incorrect';

            if (classToApply === 'correct') {
                incrementScore(SCORE_POINTS);
            }

            selectedChoice.parentElement.classList.add(classToApply);

            setTimeout(() => {
                selectedChoice.parentElement.classList.remove(classToApply);
                getNewQuestion();
            }, 1000);
        });
    });

    /*
     *Increase score value.
     *Display the new value in the front end.
     */
    incrementScore = num => {
        score +=num;
        scoreText.innerText = score;
    };

    /*
     *Reset displayed score value to 0.
     *Reset score value to 0 in the local storage.
     */
    function resetScore() {
        score = 0;
        scoreText.innerText = 0;
        localStorage.setItem('recentScore', score);
    }

    startGame();

});