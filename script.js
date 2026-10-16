let words = [];

async function init() {
  const response = await fetch("words.json");
  words = await response.json();

  loadQuestion();
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function loadQuestion() {

  // 結果表示をリセット
  document.getElementById("result").innerHTML = "";

  // 結果表示と"次の問題"ボタンを非表示にする
  document.getElementById("result").style.display = "none";
  document.getElementById("nextBtn").style.display = "none";

  const question =
    words[Math.floor(Math.random() * words.length)];

  const correctAnswer = question.meaning;

  const choices = [correctAnswer];

  while (choices.length < 4) {

    const candidate =
      words[Math.floor(Math.random() * words.length)].meaning;

    if (!choices.includes(candidate)) {
      choices.push(candidate);
    }
  }

  shuffle(choices);

  document.getElementById("word").textContent =
    question.word;

  const choicesDiv =
    document.getElementById("choices");

  choicesDiv.innerHTML = "";

  choices.forEach(choice => {

    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = choice;

    btn.onclick = () => {

      // 回答後はボタンを無効化する
      const allButtons =
        document.querySelectorAll(".choice-btn");

      allButtons.forEach(button => {

        button.disabled = true;
        if (button.textContent === correctAnswer) {
          // 正解のボタンのスタイルを変更
          button.style.backgroundColor = "#90EE90";
          button.style.color = "#000";
          button.style.fontWeight = "bold";
        }

      });

      const result =
        document.getElementById("result");

      // 正解か不正解かを判定して結果を表示
      if (choice === correctAnswer) {

        btn.style.backgroundColor = "#90EE90";  // 正解の場合は緑色にする
        result.innerHTML = `
          <h3>⭕ 正解！</h3>

          <b>意味:</b> ${question.meaning}<br>
          <b>品詞:</b> ${question.partOfSpeech}<br>
          <b>レベル:</b> ${question.level}<br>
          <b>英検:</b> ${question.eiken}<br>
          <b>TOEIC目安:</b> ${question.toeic}点<br><br>

          <b>例文:</b><br>
          ${question.example}<br>
          ${question.example_jp}
        `;

      } else {

        btn.style.backgroundColor = "#FFB6C1";  // 不正解の場合は赤色にする
        result.innerHTML = `
          <h3>❌ 不正解！</h3>

          <b>正解:</b> ${correctAnswer}<br><br>

          <b>品詞:</b> ${question.partOfSpeech}<br>
          <b>レベル:</b> ${question.level}<br>
          <b>英検:</b> ${question.eiken}<br>
          <b>TOEIC目安:</b> ${question.toeic}点<br><br>

          <b>例文:</b><br>
          ${question.example}<br>
          ${question.example_jp}
        `;
      }

      result.style.display = "block";
      document.getElementById("nextBtn").style.display =
        "inline-block";
    };

    choicesDiv.appendChild(btn);

  });
}

init();
