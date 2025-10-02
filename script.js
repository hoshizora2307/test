document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        { question: "真夏の夜空に輝く「夏の大三角」を構成する3つの星の名前をすべて答えてください。（例：○○、○○、○○）", answer: "ベガ、アルタイル、デネブ" },
        { question: "七夕伝説で知られる織姫星は、どの星座に属する星でしょう？", answer: "こと座" },
        { question: "天の川を流れるように見える、この星座の名前は何でしょう？", answer: "はくちょう座" },
        { question: "夏の大三角を形作るもう一つの星、彦星の名前は何でしょう？", answer: "アルタイル" },
        { question: "さそり座の心臓部分で赤く輝く一等星の名前は何でしょう？", answer: "アンタレス" },
        { question: "はくちょう座のくちばしに位置する、夏の大三角を形作る星はどれでしょう？", answer: "デネブ" },
        { question: "夏の星座で最も大きく、空いっぱいに広がる星座は何でしょう？", answer: "へびつかい座" },
        { question: "夏に南の空に見える、大きな弓を引いたような形の星座は何でしょう？", answer: "いて座" },
        { question: "夏の大三角を形作る星のうち、最も明るい一等星はどれでしょう？", answer: "ベガ" },
        { question: "夏の夜空で、南十字星の代わりとしてよく使われる星の並びは「何座」でしょう？", answer: "さそり座" }
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

    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');


    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        quizArea.classList.remove('hidden');
        scoreArea.classList.add('hidden');
        loadQuestion();
    }

    function loadQuestion() {
        if (currentQuestionIndex < questions.length) {
            const currentQuestion = questions[currentQuestionIndex];
            questionCountEl.textContent = `第 ${currentQuestionIndex + 1} 問 / 全 ${questions.length} 問`;
            questionEl.textContent = currentQuestion.question;
            answerInput.value = "";
            resultMessageEl.textContent = "";
            submitBtn.disabled = false;
        } else {
            showResult();
        }
    }

    function checkAnswer() {
        const userAnswer = answerInput.value.trim().toLowerCase();
        const correctAnswer = questions[currentQuestionIndex].answer.trim().toLowerCase();

        if (userAnswer === correctAnswer) {
            resultMessageEl.textContent = "せいかい！🎉";
            resultMessageEl.classList.remove('incorrect');
            resultMessageEl.classList.add('correct');
            score++;
        } else {
            resultMessageEl.textContent = `ざんねん！正解は「${questions[currentQuestionIndex].answer}」でした！`;
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
        
        if (score === questions.length) {
            finalScoreEl.innerHTML = 'おめでとうございます！🎉<br>10点満点です。この画面をフロントにお見せください。';
        } else {
            finalScoreEl.textContent = `${questions.length}問中、${score}問正解しました！`;
        }
    }

    submitBtn.addEventListener('click', checkAnswer);
    restartBtn.addEventListener('click', startQuiz);

    answerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !submitBtn.disabled) {
            checkAnswer();
        }
    });

    // ページ読み込み完了後にオープニング画面を非表示にする
    window.addEventListener('load', () => {
        // 3秒後にメインコンテンツを表示
        setTimeout(() => {
            splashScreen.style.opacity = '0';
            setTimeout(() => {
                splashScreen.style.display = 'none';
                mainContent.style.visibility = 'visible';
                mainContent.style.opacity = '1';
                mainContent.style.transform = 'translateY(0)';
                document.body.classList.add('main-loaded');
                startQuiz();
            }, 1000); // 1秒かけてフェードアウト
        }, 3000); // 3秒後に実行
    });

    // 最初にアプリを開いたときの処理
    // startQuiz(); // オープニング画面があるためコメントアウト
});
