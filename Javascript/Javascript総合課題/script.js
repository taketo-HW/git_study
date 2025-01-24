// script.js
const LOG_CONTENT = document.getElementById("log-content");
const HP_ELEMENT = document.getElementById("hp");
const LEVEL_ELEMENT = document.getElementById("level");
const ATTACK_ELEMENT = document.getElementById("attack");
const DIRECTION_ELEMENT = document.getElementById("direction");
const CHOICE_ELEMENT = document.getElementById("choice");
const CHARACTER_IMAGE = document.getElementById("character-image"); // キャラクター画像

// 初期値
let hero = {
  hp: 100,
  attack: 10,
  level: 1,
  exp: 0,
  maxHp: 100, // 最大HPを管理
  image: "image/yusha.png", // ヒーロー画像
};

let currentMonster = null; // 現在のモンスターを保持

// モンスターのデータ
const MONSTERS = [
  {
    name: "スライム",
    hp: 20,
    attack: 10,
    exp: 10,
    rate: 0.65, // 出現率65%
    image: "image/Slime.webp", // スライム画像
  },
  {
    name: "ドラゴン",
    hp: 40,
    attack: 20,
    exp: 15,
    rate: 0.25, // 出現率25%
    image: "image/dragon.webp", // ドラゴン画像
  },
  {
    name: "メタルスライム",
    hp: 20,
    attack: 10,
    exp: 30,
    rate: 0.1, // 出現率10%
    image: "image/Metal_slime.webp", // メタルスライム画像
  },
];

// 初期状態の設定
window.onload = () => resetGame(); // ゲームの初期化

// ログを追加
const addLog = (message) => {
  const logLine = document.createElement("p");
  logLine.textContent = message;
  LOG_CONTENT.appendChild(logLine);
  LOG_CONTENT.scrollTop = LOG_CONTENT.scrollHeight;
};

// 十字キーの操作
document.getElementById("up").addEventListener("click", () => moveHero("上"));
document.getElementById("down").addEventListener("click", () => moveHero("下"));
document.getElementById("left").addEventListener("click", () => moveHero("左"));
document.getElementById("right").addEventListener("click", () => moveHero("右"));

// 戦うボタンの処理
document.getElementById("Start-fighting").addEventListener("click", () => attackMonster());

// 逃げるボタンの処理
document.getElementById("run-away").addEventListener("click", () => tryToEscape());

// 移動処理
const moveHero = (direction) => {
  addLog(`${direction}方向に進みました。`);
  encounterMonster();
};

// エンカウント判定 (40%)
const encounterMonster = () => {
  const encounterChance = Math.random();
  if (encounterChance < 0.4) {
    currentMonster = chooseMonster(); // モンスターを選択
    addLog(`${currentMonster.name} が現れた！`);
    updateCharacterImage(currentMonster.image); // モンスター画像を表示
    toggleControls(false); // モンスターがいるとき
    startBattle(currentMonster); // 戦闘開始
  } else {
    addLog("何も見つかりませんでした。");
    toggleControls(true); // 非戦闘状態
    updateCharacterImage(hero.image); // ヒーロー画像を表示
  }
};

// モンスターを選択するロジック
const chooseMonster = () => {
  const random = Math.random();
  let cumulativeRate = 0;
  for (const monster of MONSTERS) {
    cumulativeRate += monster.rate;
    if (random <= cumulativeRate) {
      return { ...monster }; // モンスターのコピーを返す（HPの変更に対応）
    }
  }
  return { ...MONSTERS[MONSTERS.length - 1] }; // デフォルトで最後のモンスターを返す（安全策）
};

// コントロール切り替え
const toggleControls = (isDirectionActive) => {
  if (isDirectionActive) {
    DIRECTION_ELEMENT.style.display = "flex"; // 十字キーを表示
    CHOICE_ELEMENT.style.display = "none"; // ボタンを非表示
    updateCharacterImage(hero.image); // 非戦闘中はヒーロー画像を表示
  } else {
    DIRECTION_ELEMENT.style.display = "none"; // 十字キーを非表示
    CHOICE_ELEMENT.style.display = "flex"; // ボタンを表示
  }
};

// 戦闘処理 (モンスターの攻撃)
const startBattle = (monster) => {
  addLog(`${monster.name}と戦闘が始まりました！`);
  updateCharacterImage(monster.image); // 戦闘中はモンスター画像を表示
  // 50%の確率でモンスターが攻撃
  if (Math.random() < 0.5) {
    monsterAttack(monster);
  }
};

// ヒーローの攻撃処理
const attackMonster = () => {
  if (!currentMonster) return;

  currentMonster.hp -= hero.attack; // モンスターのHPを減らす
  addLog(`ヒーローの攻撃！ ${currentMonster.name} に${hero.attack}のダメージ！`);

  if (currentMonster.hp <= 0) {
    addLog(`${currentMonster.name} を倒した！ 経験値: ${currentMonster.exp} 獲得！`);
    hero.exp += currentMonster.exp; // 経験値を加算
    checkLevelUp(); // レベルアップ判定
    toggleControls(true); // 初期状態に戻す
    updateCharacterImage(hero.image); // ヒーロー画像に戻す
    currentMonster = null; // モンスターをリセット
    updateStatus(); // ステータス更新
  } else {
    monsterAttack(currentMonster); // モンスターの反撃
  }
};

// レベルアップ判定
const checkLevelUp = () => {
  while (hero.exp >= 30) { // 複数回のレベルアップに対応
    hero.exp -= 30;
    hero.level += 1;
    hero.maxHp += 20;
    hero.attack += 20;
    hero.hp = hero.maxHp; // HPを全回復
    addLog(`レベルアップ！ レベル: ${hero.level}、HP: ${hero.hp}、攻撃力: ${hero.attack}`);
  }
};

// 逃げる処理
const tryToEscape = () => {
  const escapeChance = Math.random();
  if (escapeChance < 0.5) {
    addLog("うまく逃げ切れました！");
    toggleControls(true); // 初期画面に戻す
    updateCharacterImage(hero.image); // ヒーロー画像に戻す
    currentMonster = null; // 現在のモンスターをリセット
  } else {
    addLog("逃げられませんでした！");
    if (currentMonster) {
      monsterAttack(currentMonster); // 現在のモンスターが攻撃
    }
  }
};

// モンスターの攻撃処理
const monsterAttack = (monster) => {
  hero.hp -= monster.attack; // ヒーローのHPを減らす
  if (hero.hp <= 0) {
    hero.hp = 0; // HPが0以下にならないよう制御
    updateStatus();
    addLog(`${monster.name} の攻撃！ ヒーローは倒れました...`);
    showGameOverPopup(); // ポップアップを表示
  } else {
    addLog(`${monster.name} の攻撃！ ヒーローは${monster.attack}のダメージを受けた！`);
    updateStatus(); // HPを更新
  }
};

// ステータス更新
const updateStatus = () => {
  HP_ELEMENT.textContent = hero.hp;
  ATTACK_ELEMENT.textContent = hero.attack;
  LEVEL_ELEMENT.textContent = hero.level;
};

// キャラクター画像を更新
const updateCharacterImage = (imagePath) => {
  CHARACTER_IMAGE.src = imagePath;
};

const showGameOverPopup = () => {
  // 十字キーと選択ボタンを非表示・非活性にする
  DIRECTION_ELEMENT.style.display = "none";
  CHOICE_ELEMENT.style.display = "none";

  // ポップアップの作成
  const popup = document.createElement("div");
  popup.id = "game-over-popup";
  popup.style.position = "fixed";
  popup.style.top = "50%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.padding = "20px";
  popup.style.backgroundColor = "#fff";
  popup.style.border = "2px solid #000";
  popup.style.zIndex = "1000";
  popup.style.textAlign = "center";

  // メッセージ
  const message = document.createElement("p");
  message.textContent = "主人公が死にました。\n蘇生しますか？";
  popup.appendChild(message);

  // YESボタン
  const yesButton = document.createElement("button");
  yesButton.textContent = "YES";
  yesButton.style.marginTop = "10px";
  yesButton.style.padding = "10px 20px";
  yesButton.style.fontSize = "16px";
  yesButton.style.cursor = "pointer";

  // YESボタンのイベント
  yesButton.addEventListener("click", () => {
      document.body.removeChild(popup); // ポップアップを削除
      addLog("戦いは終了しました。\n蘇生しました。"); // ログに戦い終了を記録
      resetGame(); // ゲームの初期化

      // 十字キーと選択ボタンを再表示・再活性化
      DIRECTION_ELEMENT.style.display = "flex";
      CHOICE_ELEMENT.style.display = "none"; // 選択ボタンは非活性
  });

  popup.appendChild(yesButton);
  document.body.appendChild(popup); // ポップアップを表示
};

// ゲームを初期化
const resetGame = () => {
  hero.hp = hero.maxHp; // 最大HPにリセット
  hero.attack = 10;
  hero.level = 1;
  hero.exp = 0;
  currentMonster = null;

  updateCharacterImage(hero.image); // キャラクター画像を初期化

  // 十字キーと選択ボタンを初期化
  DIRECTION_ELEMENT.style.display = "flex";
  CHOICE_ELEMENT.style.display = "none"; // 選択ボタンを非表示
  toggleControls(true); // 十字キーを表示

  updateStatus(); // ステータス更新
};