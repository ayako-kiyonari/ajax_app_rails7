const buildHTML = (XHR) => {
  const item = XHR.response.post;  //レスポンスの中から投稿されたメモの情報をitemに格納
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;
};


function post (){

  //JSからサーバーサイドへリクエストを送信
  const form = document.getElementById("form");  //index.htmlのid=formから取得してformに代入
  form.addEventListener("submit", (e) => {  //投稿ボタンがクリックされたらイベント発火
    e.preventDefault(); //ブラウザとJSのリクエストの重複を防ぐため投稿ボタンのクリックを無効化
    const formData = new FormData(form);  //内容をサーバー再度に送信するためにフォーム自体の要素を取得
    const XHR = new XMLHttpRequest(); //JSを用いてサーバーとHTTP通信を行う時に利用
    XHR.open("POST", "/posts", true);  // open:リクエストを初期化するメソッド
    XHR.responseType = "json"; //リクエスト送信時にレスポンスでほしいデータフォーマットを指定
    XHR.send(formData); //send:リクエストを送信するメソッド

    //
    XHR.onload = () => { //onload: リクエストの送信が成功したときに呼び出される
      if (XHR.status != 200) { //特定のHTTPリクエストが正常に完了したかどうか
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      };
      const list = document.getElementById("list");
      const formText = document.getElementById("content"); //リセット対象となるcontentを取得してformTextに格納
        list.insertAdjacentHTML("afterend",  buildHTML(XHR)); //htmlをある要素の指定した箇所に挿入する
        formText.value = ""; //（投稿フォームに前回の入力が残ったのをリセット）
    };
  });
};

window.addEventListener('turbo:load', post);
//ページが読み込まれた後にJSのコードを実行するように、loadイベント