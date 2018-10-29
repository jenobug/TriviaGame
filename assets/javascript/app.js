var panel = $('#quiz-area');
var countStartNumber = 15;

//click events:
$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('#subwrapper').prepend('<h2>TIME REMAINING: <span id="counter-number">15</span> Seconds</h2>');
  game.loadQuestion();
});

//questions:
var questions = [{
  question: "1. How did the group form?",
  answers: ["They were all roomates", "They were in a singing group in college", "They answered an ad for a girl group", "They were part of a talent search for a British TV show"],
  correctAnswer: "They answered an ad for a girl group",
  image: "assets/images/spicegirls-3.jpg"
}, {
  question: "2. What was the orginal name of the group?",
  answers: ["Shine", "Touch", "Power Girls", "It was always the Spice Girls"],
  correctAnswer: "Touch",
  image: "assets/images/spiceKen.gif"
}, {
  question: "3. Who is the oldest Spice Girl?",
  answers: ["Scary", "Posh", "Sporty", "Ginger", "Baby"],
  correctAnswer: "Ginger",
  image: "assets/images/gingerSpice.gif"
}, {
  question: "4. Who was the last girl to join the group?",
  answers: ["Baby", "Scary", "Sporty", "Ginger", "Posh"],
  correctAnswer: "Baby",
  image: "assets/images/babyspice.gif"
}, {
  question: "5. Are the Spice Girls still the #1 best-selling girl group of ALL TIME?",
  answers: ["Yes", "No"],
  correctAnswer: "Yes",
  image: "assets/images/spiceWinner.gif"
}, {
  question: "6. How many albums did the Spice Girls release?",
  answers: ["Two", "Three", "Four", "Five"],
  correctAnswer: "Three",
  image: "assets/images/spiceHi.gif",
}, {
  question: "7. How many Grammys have the Spice Girls won?",
  answers: ["Zero", "Three", "Five", "Seven"],
  correctAnswer: "Zero",
  image: "assets/images/spiceRiRi.gif"
}, {
  question: "8. What is Victoria's maiden name?",
  answers: ["Morgan", "Nash", "Banks", "Adams"],
  correctAnswer: "Adams",
  image: "assets/images/spicePosh.gif"
}, {
  question: "9. Which 90's footwear trend were the Spice Girls credited with?",
  answers: ["Moon Boots", "Hi-Tops", "Platform Shoes", "Latex Boots"],
  correctAnswer: "Platform Shoes",
  image: "assets/images/spicePlatform.gif"
}, {
  question: "10. What song is this lyric from? <br> What do you think about that now you know how I feel, Say you can handle my love are you for real...",
  answers: ["Saturday Night Divas", "Who Do You Think You Are?", "Wannabe", "Viva Forever", "Say You'll Be There"],
  correctAnswer: "Wannabe",
  image: "assets/images/spiceWalk.gif"
}
];

//game
var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.timeUp();
    }
  },
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);
    panel.html('<h2>BUMMER...TIME IS UP!</h2>');
    panel.append('<h3>THE ANSWER IS: ' + questions[this.currentQuestion].correctAnswer);
    panel.append('<img src="' + questions[this.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 2 * 1000);
    } else {
      setTimeout(game.nextQuestion, 2 * 1000);
    }
  },
  results: function() {
    clearInterval(timer);

    panel.html('<h2>GAME OVER!</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>CORRECT: ' + game.correct + '</h3>');
    panel.append('<h3>INCORRECT: ' + game.incorrect + '</h3>');
    panel.append('<h3>UNANSWERED: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Try Again</button>');
  },
  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>UMMMM...NO!</h2>');
    panel.append('<h3>THE ANSWER IS: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 2 * 1000);
    } else {
      setTimeout(game.nextQuestion, 2 * 1000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>YES! GIRL POWER!</h2>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 2 * 1000);
    } else {
      setTimeout(game.nextQuestion, 2 * 1000);
    }
  },
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};
