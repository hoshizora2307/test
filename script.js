document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        { 
            question: "真夏の夜空に輝く「夏の大三角」を構成する3つの星は？",
            options: ["ベガ、アルタイル、デネブ", "デネブ、プロキオン、ベガ", "ベガ、シリウス、アンタレス", "アルタイル、デネブ、ポラリス"],
            answer: "ベガ、アルタイル、デネブ"
        },
        { 
            question: "七夕伝説で知られる織姫星は、どの星座に属する星でしょう？",
            options: ["はくちょう座", "こと座", "わし座", "おおぐま座"],
            answer: "こと座"
        },
        { 
            question: "天の川を流れるように見える、この星座の名前は何でしょう？",
            options: ["こと座", "はくちょう座", "いるか座", "さそり座"],
            answer: "はくちょう座"
        },
        { 
            question: "夏の大三角を形作るもう一つの星、彦星の名前は何でしょう？",
            options: ["デネブ", "ベガ", "アルタイル", "アンタレス"],
            answer: "アルタイル"
        },
        { 
            question: "さそり座の心臓部分で赤く輝く一等星の名前は何でしょう？",
            options: ["シリウス", "アンタレス", "アークトゥルス", "プロキオン"],
            answer: "アンタレス"
        },
        { 
            question: "はくちょう座のくちばしに位置する、夏の大三角を形作る星はどれでしょう？",
            options: ["デネブ", "ベガ", "アルタイル", "ポラリス"],
            answer: "デネブ"
        },
        { 
            question: "夏の星座で最も大きく、空いっぱいに広がる星座は何でしょう？",
            options: ["へびつかい座", "さそり座", "こと座", "いるか座"],
            answer: "へびつかい座"
        },
        { 
            question: "夏に南の空に見える、大きな弓を引いたような形の星座は何でしょう？",
            options: ["さそり座", "へびつかい座", "いて座", "わし座"],
            answer: "いて座"
        },
        { 
            question: "夏の大三角を形作る星のうち、最も明るい一等星はどれでしょう？",
            options: ["デネブ", "ベガ", "アルタイル", "アンタレス"],
            answer: "ベガ"
        },
        { 
            question: "夏の夜空で、南十字星の代わりとしてよく使われる星の並びは「何座」でしょう？",
            options: ["さそり座", "いるか座", "こと座", "いて座"],
            answer: "さそり座"
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let isAnswered = false;

    const questionCountEl = document.getElementById('question-count');
    const questionEl = document.getElementById('question');
    const choicesContainer = document.getElementById('choices-container');
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
        isAnswered = false;
        loadQuestion();
    }

    function loadQuestion() {
        if (currentQuestionIndex < questions.length) {
            const currentQuestion = questions[currentQuestionIndex];
            questionCountEl.textContent = `第 ${currentQuestionIndex + 1} 問 / 全 ${questions.length} 問`;
            questionEl.textContent = currentQuestion.question;

            const shuffledOptions = shuffleArray([...currentQuestion.options]);
            const choiceButtons = choicesContainer.querySelectorAll('.choice-btn');
            choiceButtons.forEach((button, index) => {
                button.textContent = shuffledOptions[index];
                button.classList.remove('correct-answer', 'incorrect-answer');
                button.disabled = false;
                button.onclick = checkAnswer; // イベントリスナーを修正
            });

            resultMessageEl.textContent = "";
            isAnswered = false;
        } else {
            showResult();
        }
    }

    function checkAnswer(e) {
        if (isAnswered) return;
        isAnswered = true;

        const userAnswer = e.target.textContent;
        const correctAnswer = questions[currentQuestionIndex].answer;

        if (userAnswer === correctAnswer) {
            e.target.classList.add('correct-answer');
            resultMessageEl.textContent = "せいかい！🎉";
            resultMessageEl.classList.remove('incorrect');
            resultMessageEl.classList.add('correct');
            score++;
        } else {
            e.target.classList.add('incorrect-answer');
            resultMessageEl.textContent = `ざんねん！正解は「${correctAnswer}」でした！`;
            resultMessageEl.classList.remove('correct');
            resultMessageEl.classList.add('incorrect');
            
            choicesContainer.querySelectorAll('.choice-btn').forEach(btn => {
                if (btn.textContent === correctAnswer) {
                    btn.classList.add('correct-answer');
                }
            });
        }
        
        choicesContainer.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = true);

        setTimeout(() => {
            currentQuestionIndex++;
            loadQuestion();
        }, 3000);
    }
    
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
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

    restartBtn.addEventListener('click', startQuiz);

    // ページ読み込み完了後にオープニング画面を非表示にする
    window.addEventListener('load', () => {
        setTimeout(() => {
            splashScreen.style.opacity = '0';
            setTimeout(() => {
                splashScreen.style.display = 'none';
                mainContent.style.visibility = 'visible';
                mainContent.style.opacity = '1';
                mainContent.style.transform = 'translateY(0)';
                document.body.classList.add('main-loaded');
                startQuiz();
            }, 1000);
        }, 3000);
    });

    // 最初のクイズ画面の表示
    // startQuiz();
});
