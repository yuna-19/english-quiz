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

  document.getElementById("result").textContent = "";

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

      const result =
        document.getElementById("result");

      if (choice === correctAnswer) {
        result.textContent = "⭕ 正解！";
      } else {
        result.textContent =
          `❌ 不正解！（正解：${correctAnswer}）`;
      }
    };

    choicesDiv.appendChild(btn);

  });
}

init();
