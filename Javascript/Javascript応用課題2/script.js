const colors = ["red", "blue", "yellow", "pink"];
let correctPositions = [];
let userPositions = [0, 1, 2, 3];
const arrayLength = 4; // 4
const RANDOM_RANGE = 0.5;

// 配列をランダムに並べ替える関数
const randomizeArray = (array) => array.sort(() => Math.random() - RANDOM_RANGE);

// サークルの色を更新
const updateCircles = () => {
  userPositions.forEach((pos, index) => {
    const circle = document.getElementById(`circle${index + 1}`);
    circle.style.backgroundColor = colors[pos];
  });

  // ボタンの状態を更新
  updateButtons();
};

// ボタンの状態を更新
const updateButtons = () => {
  userPositions.forEach((pos, index) => {
    const leftButton = document.getElementById(`left${index + 1}`);
    const rightButton = document.getElementById(`right${index + 1}`);

    // 左ボタンの状態
    leftButton.disabled = pos === 0;
    leftButton.innerText = pos === 0 ? "⊗" : "⇦";

    // 右ボタンの状態
    rightButton.disabled = pos === colors.length - 1;
    rightButton.innerText = pos === colors.length - 1 ? "⊗" : "⇨";
  });
};

// 正解数をチェック
const checkCorrect = () => {
  let correctCount = 0;
  userPositions.forEach((pos, index) => {
    if (pos === correctPositions[index]) correctCount++;
  });
  document.getElementById("result").innerText = `${correctCount}個正解しています。`;
};

// リセット
const resetGame = () => {
  correctPositions = [];
  userPositions = [0, 1, 2, 3];
  document.getElementById("result").innerText = "0個正解しています。";
  updateCircles();
};

// ゲームスタート
const startGame = () => {
  correctPositions = randomizeArray([...Array(arrayLength).keys()]);
  userPositions = randomizeArray([...Array(arrayLength).keys()]);
  updateCircles();
  document.getElementById("result").innerText = "0個正解しています。";

  // コンソールに答えを表示
  console.log("スタート後の答え:", correctPositions.map((pos) => colors[pos]));
};

// ページ読み込み時にコンソールに答えを表示
window.onload = () => {
  correctPositions = randomizeArray([...Array(arrayLength).keys()]);
  console.log("読み込み時の答え:", correctPositions.map((pos) => colors[pos]));
};

// ボタンのクリックイベント設定
document.querySelectorAll(".move-btn").forEach((btn) =>
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
  })
);

// 初期化
document.getElementById("reset").addEventListener("click", resetGame);
document.getElementById("start").addEventListener("click", startGame);
resetGame();
