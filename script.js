document.addEventListener('DOMContentLoaded', () => {
    const riddles = [
        { question: "いつもおひるねしている木は、なーんだ？", answer: "ねむのき" },
        { question: "くちびるにのっているくだものは、なーんだ？", answer: "いちご" },
        { question: "頭を打つと笑う物は、なーんだ？", answer: "たいこ" },
        { question: "まがるのが上手な虫は、なーんだ？", answer: "かまきり" },
        { question: "いつも泣いている虫は、なーんだ？", answer: "セミ" },
        { question: "いつも熱が出ている部屋は、なーんだ？", answer: "お風呂" },
        { question: "いつもけんかしている動物は、なーんだ？", answer: "犬猿の仲" },
        { question: "お湯を飲むと苦しい物は、なーんだ？", answer: "氷" },
        { question: "いつもおこっている鳥は、なーんだ？", answer: "フクロウ" },
        { question: "いつもお風呂に入っている花は、なーんだ？", answer: "スイレン" }
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
        finalScoreEl.textContent = `${riddles.length}問中、${score}問正解しました！`;
    }

    submitBtn.addEventListener('click', checkAnswer);
    restartBtn.addEventListener('click', startQuiz);

    // Enterキーでも回答できるようにする
    answerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !submitBtn.disabled) {
            checkAnswer();
        }
    });

    startQuiz();
});
