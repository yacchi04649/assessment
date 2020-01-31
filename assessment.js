'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');
/**
	 * 指定した要素の子要素を全て削除する
	 * @param {HTMLElement} element HTMLの要素
	 */
	function removeAllChildren(element){
		while(element.firstChild){
			element.removeChild(element.firstChild);
		}
	}

// 診断ボタンを押したときの処理
assessmentButton.onclick = () => {
	const userName = userNameInput.value;
	if(userName.length === 0){
		alert('名前を1文字以上入力してください');
		return;
	}
	// 診断結果表示エリアの作成
	removeAllChildren(resultDivided);
	const header = document.createElement('h3');
	header.innerText = '診断結果';
	resultDivided.appendChild(header);

	const paragraph = document.createElement('p');
	const result = assessment(userName);
	paragraph.innerText = result;
	resultDivided.appendChild(paragraph);
	
	// TODO ツイートエリアの作成
	removeAllChildren(tweetDivided);
	const anchor = document.createElement('a');
	const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
		+ encodeURIComponent('あなたの晩ごはん診断メーカー')
		+ '&ref_src=twsrc%5Etfw';
		
	anchor.setAttribute('href', hrefValue);
	anchor.className = 'twitter-hashtag-button';
	anchor.setAttribute('data-text',result);
	anchor.setAttribute('data-show-count','false');
	anchor.innerText = 'Tweet #あなたの晩ごはん';
	tweetDivided.appendChild(anchor);

	const script = document.createElement('script');
	script.setAttribute('src','https://platform.twitter.com/widgets.js');
	tweetDivided.appendChild(script);
};

// テキストフィールド上で[Enter]を押したときの処理
userNameInput.onkeydown = (event) => {
	if(event.key === 'Enter') {
		assessmentButton.onclick();
	}
}

const answers = [
	'{userName}の晩ごはんはチンジャオロースです。',
	'{userName}の晩ごはんは鮭の塩焼きです。',
	'{userName}の晩ごはんは豚肉のしょうが焼きです。',
	'{userName}の晩ごはんは豚肉としめじのポン酢炒めです。',
	'{userName}の晩ごはんは麻婆豆腐です。',
	'{userName}の晩ごはんは牛丼です。',
	'{userName}の晩ごはんは鶏のから揚げです。',
	'{userName}の晩ごはんは牛肉とエリンギのネギ塩炒めです。',
	'{userName}の晩ごはんはイカリングです。',
	'{userName}の晩ごはんはギョウザです。',
	'{userName}の晩ごはんはお刺身です。',
	'{userName}の晩ごはんはトンカツです。',
	'{userName}の晩ごはんはチキン味噌カツです。',
	'{userName}の晩ごはんはきりたんぽ鍋です。',
	'{userName}の晩ごはんは焼鳥です。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName){
	// 全文字のコード番号を取得してそれを足し合わせる
	let sumOfCharaCode = 0;

	// var random = Math.floor(Math.random() * 110);
	// console.log( random );

	for(let i = 0; i < userName.length; i++){
		sumOfCharaCode = sumOfCharaCode + userName.charCodeAt(i);
		// sumOfCharaCode = sumOfCharaCode + random;
	}

	// 文字のコード番号の合計を回答の数で割って添え字の数値を決める
	const index = sumOfCharaCode % answers.length;
	let result = answers[index];

	// {userName}をユーザーの名前に置き替える
	result = result.replace(/\{userName\}/g,userName);
	return result;
}

// テストコード
console.assert(
	assessment('とおる') === 'とおるの晩ごはんはトンカツです。',
	'診断結果の名前を入力された名前に置き替える処理が正しくありません'
);
// テストコード:入力された名前が同じとき結果も同じになるか
console.assert(
	assessment('てすと') === assessment('てすと'),
	'入力された名前が同じとき結果も同じにする処理に問題があります'
);

// let now = new Date();
// console.log(now);
// now = now.getSeconds();
// console.log(now);
