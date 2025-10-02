document.addEventListener('DOMContentLoaded', () => {
    const riddles = [
        { question: "いつもキラキラ光っているのに、ぜったい触れないものは何？", answer: "星" },
        { question: "昼間は隠れているけど、夜になるとみんなに見えるものは何？", answer: "月" },
        { question: "黒い服を着て、たくさんの宝石をちりばめているものは何？", answer: "夜空" },
        { question: "地球の周りを回っていて、たまに願いを叶えてくれるものは何？", answer: "流れ星" },
        { question: "まるで大きな砂時計のように、時間とともに形を変えるものは何？", answer: "月" },
        { question: "お風呂に入っていると、見えてくるたくさんの泡。実は宇宙にあるものは何？", answer: "星雲" },
        { question: "毎日同じ場所から出発して、決して遅刻しないものは何？", answer: "太陽" },
        { question: "たくさん集まると、星座になるものは何？", answer: "星" },
        { question: "黒い布をかぶっているのに、いつも光を放っているものは何？", answer: "太陽" },
        { question: "いつも宇宙空間を旅しているのに、決して疲れないものは何？", answer: "宇宙船" }
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    const questionCountEl = document.getElementById('question-count');
    const questionEl = document.getElementById('question');
    const answerInput = document.getElementById('answer-input');
    const submitBtn = document.getElementById('submit-btn');
    const resultMessageEl = document.getElementById('result-message');
    const quizArea = document.getElementById('quiz-area');
    const scoreArea = document.getElementById('score-area');
    const finalScoreEl = document.getElementById('final-score');
    const restartBtn = document.getElementById('restart-btn');

    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        quizArea.classList.remove('hidden');
        scoreArea.classList.add('hidden');
        loadQuestion();
    }

    function loadQuestion() {
        if (currentQuestionIndex < riddles.length) {
            const currentRiddle = riddles[currentQuestionIndex];
            questionCountEl.textContent = `第 ${currentQuestionIndex + 1} 問 / 全 ${riddles.length} 問`;
            questionEl.textContent = currentRiddle.question;
            answerInput.value = "";
            resultMessageEl.textContent = "";
            submitBtn.disabled = false;
        } else {
            showResult();
        }
    }

    function checkAnswer() {
        const userAnswer = answerInput.value.trim().toLowerCase();
        const correctAnswer = riddles[currentQuestionIndex].answer.trim().toLowerCase();

        if (userAnswer === correctAnswer) {
            resultMessageEl.textContent = "せいかい！🎉";
            resultMessageEl.classList.remove('incorrect');
            resultMessageEl.classList.add('correct');
            score++;
        } else {
            resultMessageEl.textContent = `ざんねん！正解は「${riddles[currentQuestionIndex].answer}」でした！`;
            resultMessageEl.classList.remove('correct');
            resultMessageEl.classList.add('incorrect');
        }
        submitBtn.disabled = true;

        setTimeout(() => {
            currentQuestionIndex++;
            loadQuestion();
        }, 2000);
    }

    function showResult() {
        quizArea.classList.add('hidden');
        scoreArea.classList.remove('hidden');
        
        if (score === riddles.length) {
            finalScoreEl.innerHTML = 'おめでとうございます！🎉<br>10点満点です。この画面をフロントにお見せください。';
        } else {
            finalScoreEl.textContent = `${riddles.length}問中、${score}問正解しました！`;
        }
    }

    submitBtn.addEventListener('click', checkAnswer);
    restartBtn.addEventListener('click', startQuiz);

    answerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !submitBtn.disabled) {
            checkAnswer();
        }
    });

    startQuiz();
});
