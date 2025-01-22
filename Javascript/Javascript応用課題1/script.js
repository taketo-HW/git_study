document.addEventListener("DOMContentLoaded", () => {
    // サイコロのDOM要素
    const dice1Element = document.querySelector(".dice1"); // プレイヤー1のサイコロ
    const dice2Element = document.querySelector(".dice2"); // プレイヤー2のサイコロ
    const resultElement = document.querySelector(".record_detail"); // 結果を表示するエリア
    const roundButton = document.querySelector(".battle"); // 勝負ボタン
    const roundDisplay = document.querySelector(".record_round"); // 現在のラウンドを表示するエリア

    // ゲームの初期設定
    let round = 1; // 現在のラウンド（初期値は1）
    const MAX_ROUNDS = 3; // 最大ラウンド数
    let player1score = 0; // プレイヤー1のスコア
    let player2score = 0; // プレイヤー2のスコア
    const DICE_NUM = 6; // サイコロの目の数

    // サイコロの目の配置パターン（9マス分のインデックス）
    // 0 1 2
    // 3 4 5
    // 6 7 8
    const dicePatterns = {
        1: [4], // 1の目は中央に1つ
        2: [0, 8], // 2の目は左上と右下
        3: [0, 4, 8], // 3の目は左上、中央、右下
        4: [0, 2, 6, 8], // 4の目は四隅
        5: [0, 2, 4, 6, 8], // 5の目は四隅＋中央
        6: [0, 1, 2, 6, 7, 8], // 6の目は左右に3つずつ
    };

    // サイコロの目を描画する関数
    const renderDice = (diceElement, value) => {
        diceElement.innerHTML = ""; // サイコロの現在の内容をクリア
        const pattern = dicePatterns[value]; // 指定された目に対応するパターンを取得
        for (let i = 0; i < 9; i++) {
            const dot = document.createElement("div"); // 9つのマス目を生成
            if (pattern.includes(i)) {
                dot.classList.add("dot"); // パターンに含まれる位置に黒丸を配置
            }
            diceElement.appendChild(dot); // サイコロにマス目を追加
        }
    };

    // サイコロを振る関数
    const rollDice = () => Math.floor(Math.random() * DICE_NUM) + 1; // 1〜6のランダムな数値を生成

    // サイコロの結果とスコアを更新する関数
    const updateDisplay = (player1Roll, player2Roll) => {
        // サイコロの目を表示（〇を描画）
        renderDice(dice1Element, player1Roll); // プレイヤー1のサイコロを更新
        renderDice(dice2Element, player2Roll); // プレイヤー2のサイコロを更新

        // 勝敗判定
        if (player1Roll > player2Roll) {
            player1score++; // プレイヤー1のスコアを増加
            resultElement.textContent += `ラウンド: ${Math.min(round, MAX_ROUNDS)}/${MAX_ROUNDS}： プレイヤー1の勝ち\n`; // 勝敗を結果エリアに追加
            resultElement.textContent += `プレイヤー1のポイント： ${player1score}ポイント\nプレイヤー2のポイント： ${player2score}ポイント\n\n`; // 現在のポイントを結果エリアに追加
        } else if (player1Roll < player2Roll) {
            player2score++; // プレイヤー2のスコアを増加
            resultElement.textContent += `ラウンド: ${Math.min(round, MAX_ROUNDS)}/${MAX_ROUNDS}： プレイヤー2の勝ち\n`; // 勝敗を結果エリアに追加
            resultElement.textContent += `プレイヤー1のポイント： ${player1score}ポイント\nプレイヤー2のポイント： ${player2score}ポイント\n\n`; // 現在のポイントを結果エリアに追加
        } else {
            player1score++; // プレイヤー1のスコアを増加
            player2score++; // プレイヤー2のスコアを増加
            resultElement.textContent += `ラウンド: ${Math.min(round, MAX_ROUNDS)}/${MAX_ROUNDS}： 引き分け\n`; // 引き分けの場合
            resultElement.textContent += `プレイヤー1のポイント： ${player1score}ポイント\nプレイヤー2のポイント： ${player2score}ポイント\n\n`; // 現在のポイントを結果エリアに追加
        }
    };

    // ゲーム終了時の処理
    const endGame = () => {
        roundButton.disabled = true; // 勝負ボタンを非活性化
        // 最終結果を判定して表示
        if (player1score > player2score) {
            resultElement.textContent += "\n最終結果: プレイヤー1の勝利！";
            roundDisplay.textContent = "プレイヤー1の勝利！";
        } else if (player1score < player2score) {
            resultElement.textContent += "\n最終結果: プレイヤー2の勝利！";
            roundDisplay.textContent = "プレイヤー2の勝利！";
        } else {
            resultElement.textContent += "\n最終結果: 引き分け！";
            roundDisplay.textContent = "引き分け！";
        }
    };

    // 勝負ボタンがクリックされたときのイベントリスナー
    roundButton.addEventListener("click", () => {
        if (round <= MAX_ROUNDS) {
            const player1Roll = rollDice(); // プレイヤー1がサイコロを振る
            const player2Roll = rollDice(); // プレイヤー2がサイコロを振る
            updateDisplay(player1Roll, player2Roll); // 出目を表示し、勝敗を更新
            round++; // ラウンドを進める
            if (round > MAX_ROUNDS) {
                endGame(); // 最終ラウンド後にゲーム終了処理を実行
            }
        }
    });

    // 初期状態の設定
    renderDice(dice1Element, 1); // プレイヤー1のサイコロを目1で初期化
    renderDice(dice2Element, 1); // プレイヤー2のサイコロを目1で初期化
    resultElement.textContent = "結果:\n"; // 結果エリアを初期化
});
