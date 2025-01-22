const colors = ["red", "blue", "yellow", "pink"];
let correctPositions = [];
let userPositions = [0, 1, 2, 3];

// 配列をランダムに並べ替える関数
function randomizeArray(array) {
  return array.sort(() => Math.random() - 0.5);
}
document.getElementById("reset").addEventListener("click", resetGame);
// サークルの色を更新
function updateCircles() {
  userPositions.forEach((pos, index) => {
    const circle = document.getElementById(`circle${index + 1}`);
    circle.style.backgroundColor = colors[pos];
  });

  // ボタンの状態を更新
  updateButtons();
}

// ボタンの状態を更新
function updateButtons() {
  userPositions.forEach((pos, index) => {
    const leftButton = document.getElementById(`left${index + 1}`);
    const rightButton = document.getElementById(`right${index + 1}`);

    // 左ボタンの状態
    if (pos === 0) {
      leftButton.disabled = true;
      leftButton.innerText = "⊗";
    } else {
      leftButton.disabled = false;
      leftButton.innerText = "⇦"; // 活性時は元のテキスト
    }

    // 右ボタンの状態
    if (pos === colors.length - 1) {
      rightButton.disabled = true;
      rightButton.innerText = "⊗";
    } else {
      rightButton.disabled = false;
      rightButton.innerText = "⇨"; // 活性時は元のテキスト
    }
  });
}

// 正解数をチェック
function checkCorrect() {
  let correctCount = 0;
  userPositions.forEach((pos, index) => {
    if (pos === correctPositions[index]) correctCount++;
  });
  document.getElementById("result").innerText = `${correctCount}個正解しています。`;
}

// リセット
function resetGame() {
  correctPositions = [];
  userPositions = [0, 1, 2, 3];
  document.getElementById("result").innerText = "0個正解しています。";
  updateCircles();
}

// ゲームスタート
function startGame() {
  correctPositions = randomizeArray([...Array(4).keys()]);
  userPositions = randomizeArray([...Array(4).keys()]);
  updateCircles();
  document.getElementById("result").innerText = "0個正解しています。";

  // コンソールに答えを表示
  console.log("スタート後の答え:", correctPositions.map(pos => colors[pos]));
}

// 初期化
resetGame();

// ページ読み込み時にコンソールに答えを表示
window.onload = function () {
  correctPositions = randomizeArray([...Array(4).keys()]);
  console.log("読み込み時の答え:", correctPositions.map(pos => colors[pos]));
};

// ボタンのクリックイベント設定
document.querySelectorAll(".move-btn").forEach((btn) => {
  btn.addEventListener("click", (event) => {
    const id = event.target.id;
    const index = parseInt(id.slice(-1)) - 1;

    if (id.startsWith("left")) {
      // 左ボタンクリック: 左端を超えない
      if (userPositions[index] > 0) {
        userPositions[index]--;
      }
    } else if (id.startsWith("right")) {
      // 右ボタンクリック: 右端を超えない
      if (userPositions[index] < colors.length - 1) {
        userPositions[index]++;
      }
    }

    // 更新処理
    updateCircles();
    checkCorrect();
  });
});

// 初期化
resetGame();
