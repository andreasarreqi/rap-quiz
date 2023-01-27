const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const SCORE_POINTS = 10;
const MAX_QUESTIONS = 10;

const currentQuestion = {};
const acceptinAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [{
    question: 'In which U.S city was the hip hop culture created?',
    choice1: 'Chicago',
    choice2: 'Los Angeles',
    choice3: 'New York City',
    choice4: 'Compton',
    answer: 'New York City'
},
{
    question: 'Which actor and rapper is often known as Ice Cube?',
    choice1: 'Kanye West',
    choice2: 'OShea Jackson',
    choice3: 'Calvin Broadus',
    choice4: 'Kevin Hart',
    answer: 'OShea Jackson'

},
{
    question: 'Which of the following is not a hip hop group?',
    choice1: 'B2K',
    choice2: 'Bone Thugz n Harmony',
    choice3: 'N.W.A',
    choice4: 'Public Enemy',
    answer: 'B2K'
},
{
    question: 'The American hip hop star Dr. Dre also has a popular brand of which product with his name?',
    choice1: 'Shoes',
    choice2: 'Food',
    choice3: 'Headphones',
    choice4: 'Clothes',
    answer: 'Headphones'
},
{
    question: 'There are four original elements of hip hop culture: break dancing, deejaying, rapping, and what else?',
    choice1: 'Beatboxing',
    choice2: 'Graffiti',
    choice3: 'Locking',
    choice4: 'Blues',
    answer: 'Graffiti',
},
{
    question: 'What is the name of the first album by Jay-Z?',
    choice1: 'The Blueprint',
    choice2: 'Reasonable Doubt',
    choice3: 'Watch the Throne',
    choice4: 'Brooklyns finest',
    answer: 'Reasonable Doubt',
},
{
    question: 'Which of the following did NOT die in battle in Mesopotamia?',
    choice1: 'Gordian III',
    choice2: 'Julius',
    choice3: 'Crassus',
    choice4: 'Valerian',
    answer: 'Valerian'
},
{
    question: 'What was the first rap name of Biggie Smalls, also known as The Notorious B.I.G?',
    choice1: 'M.C. Quest',
    choice2: 'M.C. Best',
    choice3: 'M.C. Jest',
    choice4: 'M.C. Cheques',
    answer: 'M.C. Quest',
},
{
    question: 'Which of the following record labels featured famous artists, such as Snoop Dogg, Dr. Dre, and Tupac?',
    choice1: 'Def Jam',
    choice2: 'Death Row Records',
    choice3: 'Roc-A-Fella',
    choice4: 'Bad Boy Records',
    answer: 'Death Row Records',
},
];