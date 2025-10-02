document.addEventListener('DOMContentLoaded', () => {
    const riddles = [
        { question: "「夏の大三角」を形成する３つの１等星。ベガ・アルタイルともう一つは何？", answer: "デネブ" ｝,
        { question: "「火星に対抗するもの」という名の恒星は何？", answer: "アンタレス" },
        { question: "国際天文学連合が定めている星座の数は何個？", answer: "88個" },
        { question: "「北斗七星」は何座にある？", answer: "おおぐま座" },
        { question: "「大三角」がない唯一の季節は？", answer: "秋" },
        { question: "お隣の銀河の名前は？", answer: "アンドロメダ銀河" },
        { question: "一番明るく見える星(恒星)は何？", answer: "シリウス" },
        { question: "1等星の中で、最も暗い星は何？", answer: "レグルス" },
        { question: "「へびつかい座」の頭の部分の星の名前は？", answer: "ラスアルハゲ" },
        { question: "2017年に初めて観測した恒星間天体の名前は？", answer: "オウムアムア" }
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
