// ■ソート
const numbers = [4, 2, 5, 1, 3];
numbers.sort((a, b) => a - b);
console.log(numbers); // 結果: [1, 2, 3, 4, 5]

const a= [1,2,5,9,4,0,5]
a.sort()
console.log(a);

//sort関数の引数にはコールバック関数が入り、コールバック関数の戻り値がsortに反映される
const sample = [10, 2, 1];
sample.sort();
console.log(sample); // [1, 10, 2] (文字列として "10" < "2" と見なす)

sample.sort((a, b) => a - b);
console.log(sample); // [1, 2, 10] (数値として 10 > 2)

// ■重複排除
const b = [1, 2, 2, 3, 3, 3];
const unique = new Set(b);
console.log(unique); // Set(3) { 1, 2, 3 }※戻り値が配列ではなく、関数になる。

// Set から配列を生成
const uniqueArray = [...b];
console.log(uniqueArray); // [1, 2, 3]

const c = [...new Set(b)];
console.log(c); // [1, 2, 3]

// 配列を文字列に変換
const fruits = ["りんご", "バナナ", "オレンジ"];
const joined = fruits.join(", ");
console.log(joined); // 結果: りんご, バナナ, オレンジ
const f = fruits.join("-");
console.log(f); // 結果: りんご-バナナ-オレンジ

/*
練習問題
1. 数字の配列から奇数だけを抽出してconsoleに表示するコードを書いてみましょう。
2. 以下の配列をアルファベット順に並べ替えるプログラムを作りましょう。
`[”jin”, “mike”, “kei”, “ai”, “tom”, “may”]`
*/
//■演習1
console.log("■■■演習1■■■");
let box3 = [1,2,3,4,5,6,7,8,9];
for(item of box3){
  if(item%2!=0){
    console.log(item);
  }
}
//■演習2
const box = ["jin", "mike", "kei", "ai", "tom", "may"];
console.log(box.sort());
/*
Array(6)
0: "ai"
1: "jin"
2: "kei"
3: "may"
4: "mike"
5: "tom"
*/

//for inと、for ofの違い検証
//■配列の場合
console.log("配列の場合↓↓↓↓")
let g = ["りんご", "バナナ", "オレンジ"];
for (let fruit of g) {
  console.log(fruit);
}
// 結果: りんご バナナ オレンジ
for (let fruit in g) {
  console.log(fruit);
}
// 結果: 0 1 2

//辞書型の場合

console.log("■辞書型の場合↓↓↓↓")
let h = {abc:"りんご", def:"バナナ", ghi:"オレンジ"};
/*
for (let fruit of h) {
  console.log(fruit);
}
結果:下記のエラーになった
Uncaught TypeError: h is not iterable
    at script.js:72:19
*/
for (let fruit in h ){
  console.log(fruit);
}
// 結果: 1 2 3
/*
練習問題
1. 演算子(+ , -, * )を使用して、consoleに123を表示してください
2. 演算子(- , / )を使用して、consoleに3を表示してください
*/
console.log("↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓演習(条件分岐)↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
//1
console.log(25*4+30-7);
//2
console.log(8/2-1);
console.log("↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑演習(条件分岐)↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");
/*
練習問題
数字が正、負、またはゼロかを判定し、consoleで結果を表示するコードを書いてみましょう。
*/
function judge(number){
  if (number == 0){
    console.log("ゼロです");
  }else if(number < 0){
    console.log("負の値です");
  }else if(number > 0){
    console.log("正の値です");
  }else{
    console.log("判別できません");
  }
}
console.log("↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓演習↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
judge(1);
judge(-15546);
judge(0);
judge(null);
judge(2.5);
judge("128");
judge(true);
judge(false);
console.log("↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑演習↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");
/*
練習問題
1. 配列`[10, 20, 30, 40, 50]`のすべての要素を2倍にして、consoleに出力してください。
2. `1から100`までの数字のうち、偶数のみをconsoleに出力してください。
*/
let box2 = [10, 20, 30, 40, 50];
//これ使えるか試す
console.log(box2*2);
//結果：Nan
for (let item of box2){
  console.log(item*2);
}
/*出力結果：
script.js:96 20
script.js:96 40
script.js:96 60
script.js:96 80
script.js:96 100
*/
for(let i = 1; i <= 100; i++){
  if(i%2==0){// 偶数の場合
    console.log(i);
  }
}
/*
練習問題

1. 引数で渡された数値を2倍にして返す関数を作りましょう。
2. 配列のすべての要素を表示する関数を作ってみましょう。
3. 3つの数値のうち最大値を返す関数を作りましょう。
*/
console.log("演習1");
//1
function doubule(num){
  return num * 2;
}
console.log(doubule(2));
//2
console.log("演習2");
function print_array(ary){
  for (item of ary){
    console.log(item);
  }
}

let array = [1,2,3,4,"5",null,true]
console.log(print_array(array));
//3
console.log("演習3");
function search_max(a_num,b_num,c_num){
  return Math.max(a_num,b_num,c_num);
}
console.log(search_max(1,2,3));
/*
練習問題

1. ユーザー情報（名前、年齢、メールアドレス）をオブジェクトで表現し、各値をconsoleで出力するプログラムを作成してください。
2. 商品のリスト(オブジェクト)を配列にして、すべての商品名を出力してください。
[{
	id: 0,
	name: 'book',
	price: 1,000
},
{
  id: 0,
	name: 'phone',
	price: 160,000
}...]
*/
//1
console.log("演習1");
//オブジェクト宣言
let users_info = [
  {name:"ルークスカイウォーカー",
    age:28,
    address:"aaaaa.com"
  },
  {name:"アナキンスカイウォーカー",
    age:49,
    address:"bbb.com"
  },
  {name:"ハワード・スターク",
    age:50,
    address:"ccccc.com"
  },
  {name:"トニー・スターク",
    age:27,
    address:"d.com"
  }
]
for (user_info of users_info){
  console.log(`お名前：${user_info.name} 様｜ご年齢:${user_info.age}｜アドレス:${user_info.address}`);
}
console.log("演習2");
let stock = [
  {id: 0,name: 'book',price: 1000},
  {id: 0,name: 'phone',price: 160000},
  {id: 0,name: 'PC',price: 1500000},
  {id: 0,name: 'CPU',price: 110000},
  {id: 0,name: 'GPU',price: 140000},
  {id: 0,name: 'HDD',price: 20000},
  {id: 0,name: 'SSD',price: 20000},
  {id: 0,name: 'CD',price: 700}
]
for (let item of stock){
  console.log(item.name);
}
/*
練習問題

1. HTMLにボタンを設置し、javascriptでボタンにイベントを設定する。
クリックしたら、ボタンの下に`クリックされました` という文字がクリックされた分だけ表示されるようにする。
2. 1で作成した、`クリックされました`というテキスト横に削除ボタンを表示するように修正。削除ボタン押下で該当行のテキストが削除される。
*/

//1
const button = document.getElementById('myButton');
const messageArea = document.getElementById('messageArea');

button.addEventListener('click', () => {
  // メッセージと削除ボタンを内包するコンテナ要素
  const container = document.createElement('div');

  // メッセージ部分 (例として span)
  const message = document.createElement('span');
  message.textContent = "クリックされました";

  // 削除ボタン
  const deleteButton = document.createElement('button');
  deleteButton.textContent = "削除";

  // コンテナ要素にメッセージと削除ボタンを追加
  container.appendChild(message);
  container.appendChild(deleteButton);

  // #messageArea にコンテナを追加
  messageArea.appendChild(container);

  // 削除ボタンのクリックで、コンテナ要素ごと削除
  deleteButton.addEventListener('click', () => {
    messageArea.removeChild(container);
  });
});
/* 
練習問題

ポケモンのデータを取得できるAPIを使用して、ポケモンの画像と名前を表示してください。

1. 図鑑Noを入力できるテキストボックスを作成する
2. テキストボックスの横に検索ボタンを作成する
3. テキストボックスに図鑑Noを入力し、検索を押すと、該当するポケモンの画像と名前(英名)が表示されること

※再度検索したときに、画像と名前が再表示されていること
*/

document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('searchButton');
  const pokemonIdInput = document.getElementById('pokemonId');
  const resultArea = document.getElementById('resultArea');

  // 検索ボタンのクリックイベントリスナー
  searchButton.addEventListener('click', () => {
    const pokemonId = pokemonIdInput.value.trim();
    if (pokemonId === '') {
      alert('図鑑NOを入力してください。');
      return;
    }

    fetchPokemonData(pokemonId);
    pokemonIdInput.value = ''; // 入力フィールドをクリア
  });

  // Enterキーでも検索を実行
  pokemonIdInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      searchButton.click();
    }
  });

  // ポケモンデータを取得する関数
  async function fetchPokemonData(id) {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;

    try {
      // PokeAPIからポケモン種のデータを取得
      const speciesResponse = await fetch(apiUrl);
      if (!speciesResponse.ok) {
        throw new Error('ポケモンが見つかりません。図鑑NOを確認してください。');
      }
      const speciesData = await speciesResponse.json();

      // ポケモンの英語名を取得
      const englishName = speciesData.names.find(name => name.language.name === 'en')?.name || capitalizeFirstLetter(speciesData.name);

      // ポケモンの詳細データを取得
      const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${speciesData.name}/`);
      if (!pokemonResponse.ok) {
        throw new Error('ポケモンの詳細情報を取得できません。');
      }
      const pokemonData = await pokemonResponse.json();

      // 結果を表示
      displayPokemon(pokemonData, englishName);
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
  }

  // ポケモン情報を表示する関数
  function displayPokemon(pokemon, englishName) {
    // タイプを取得（今回は不要ですが、英語名と画像のみ表示するためコメントアウト）
    // const types = pokemon.types.map(typeInfo => typeInfo.type.name);

    // ポケモンの画像（公式のものを使用）
    const imageUrl = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;

    // 結果のコンテナを作成
    const container = document.createElement('div');
    container.className = 'pokemon-container';

    // ポケモンの画像
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = englishName;

    // ポケモンの名前
    const nameElement = document.createElement('div');
    nameElement.className = 'pokemon-name';
    nameElement.textContent = capitalizeFirstLetter(englishName);

    // コンテナに画像、名前、削除ボタンを追加
    container.appendChild(img);
    container.appendChild(nameElement);

    // 結果エリアにコンテナを追加
    resultArea.appendChild(container);
  }

  // 文字列の先頭文字を大文字にする関数
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
});