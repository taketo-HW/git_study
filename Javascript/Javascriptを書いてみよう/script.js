// ボタンをクリックしたときにアラートを表示する
document.getElementById("myButton").addEventListener("click", function() {
  alert("ボタンがクリックされました！");
});
// 2つの数値を足し算して結果を表示
let num1 = 5;
let num2 = 10;
let result = num1 + num2;

console.log("計算結果:", result);

// ユーザーに年齢を入力してもらい、結果を表示
let age = prompt("あなたの年齢を教えてください:");

if (age >= 18) {
  alert("あなたは成人です！");
} else {
  alert("あなたは未成年です！");
}

// 1から5までの数字を表示
for (let i = 1; i <= 5; i++) {
  console.log("カウント:", i);
}