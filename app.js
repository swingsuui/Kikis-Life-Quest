// ========================================
// にゅん（所持金）の読み込み
// ========================================

let nyun = Number(localStorage.getItem("nyun")) || 0;

const nyunElement =
  document.getElementById("nyun");

const resetNyunButton =
  document.getElementById("resetNyun");

nyunElement.textContent = nyun;


// ========================================
// クエストの日付管理
// 午前5時を基準に「今日」を判定
// ========================================

function getQuestDate() {

  const now = new Date();

  if (now.getHours() < 5) {
    now.setDate(now.getDate() - 1);
  }

  const year = now.getFullYear();
  const month = String(
    now.getMonth() + 1
  ).padStart(2, "0");
  const day = String(
    now.getDate()
  ).padStart(2, "0");

  return year + "-" + month + "-" + day;
}


// ========================================
// クエストの週管理
// 午前5時を基準に「今週の月曜日」を判定
// ========================================

function getQuestWeek() {

  const now = new Date();

  if (now.getHours() < 5) {
    now.setDate(now.getDate() - 1);
  }

  const day = now.getDay();

  const difference =
    day === 0 ? -6 : 1 - day;

  now.setDate(
    now.getDate() + difference
  );

  const year = now.getFullYear();
const month = String(
  now.getMonth() + 1
).padStart(2, "0");
const day = String(
  now.getDate()
).padStart(2, "0");

return year + "-" + month + "-" + day;
}


// ========================================
// 今日・今週の情報を取得
// ========================================

const today = getQuestDate();

const thisWeek = getQuestWeek();

const savedDailyDate =
  localStorage.getItem("dailyDate");

const savedWeeklyDate =
  localStorage.getItem("weeklyDate");


// ========================================
// Daily Quest の達成状態をリセット
// ========================================

if (savedDailyDate !== today) {

  localStorage.setItem(
    "dailyDate",
    today
  );

  localStorage.removeItem(
    "completedDaily"
  );
}


// ========================================
// Weekly Quest の達成状態をリセット
// ========================================

if (savedWeeklyDate !== thisWeek) {

  localStorage.setItem(
    "weeklyDate",
    thisWeek
  );

  localStorage.removeItem(
    "completedWeekly"
  );
}


// ========================================
// 達成済みクエストの読み込み
// ========================================

const completedDaily =
  JSON.parse(
    localStorage.getItem(
      "completedDaily"
    )
  ) || [];

const completedWeekly =
  JSON.parse(
    localStorage.getItem(
      "completedWeekly"
    )
  ) || [];


// ========================================
// クエスト一覧の表示場所
// ========================================

const dailyQuestList =
  document.getElementById(
    "dailyQuestList"
  );

const weeklyQuestList =
  document.getElementById(
    "weeklyQuestList"
  );


// ========================================
// クエストデータの保存・読み込み
// ========================================

const defaultQuests = [

  {
    id: "teacher",
    name: "夕方の家庭教師",
    reward: 100,
    type: "daily"
  },

  {
    id: "shopping",
    name: "買い物",
    reward: 40,
    type: "daily"
  },

  {
    id: "cooking",
    name: "自炊",
    reward: 60,
    type: "daily"
  },

  {
    id: "laundry",
    name: "洗濯機を回す",
    reward: 20,
    type: "daily"
  },

  {
    id: "weekly-cleaning",
    name: "掃除をする",
    reward: 100,
    type: "weekly"
  }

];

const savedQuests =
  JSON.parse(
    localStorage.getItem("quests")
  );

const quests =
  savedQuests || defaultQuests;


// ========================================
// クエスト編集フォーム
// ========================================

const questEditForm =
  document.getElementById(
    "questEditForm"
  );

const editQuestName =
  document.getElementById(
    "editQuestName"
  );

const editQuestReward =
  document.getElementById(
    "editQuestReward"
  );

const editQuestType =
  document.getElementById(
    "editQuestType"
  );

const saveQuestEdit =
  document.getElementById(
    "saveQuestEdit"
  );

const cancelQuestEdit =
  document.getElementById(
    "cancelQuestEdit"
  );


// 現在編集中のクエスト

let editingQuest = null;


// ========================================
// 設定画面
// ========================================

const settingsButton =
  document.getElementById(
    "settingsButton"
  );

const settingsScreen =
  document.getElementById(
    "settingsScreen"
  );

const mainScreen =
  document.getElementById(
    "mainScreen"
  );

const closeSettings =
  document.getElementById(
    "closeSettings"
  );

const settingsQuestList =
  document.getElementById(
    "settingsQuestList"
  );

const addQuestButton =
  document.getElementById(
    "addQuestButton"
  );


// ========================================
// 設定画面のクエスト一覧を表示
// ========================================

function renderSettingsQuests() {

  settingsQuestList.innerHTML = "";


  // --------------------------------------
  // Daily → Weekly の順番で表示
  // --------------------------------------

  const sortedQuests =
    quests.slice().sort(function (a, b) {

      if (a.type === b.type) {
        return 0;
      }

      return a.type === "daily" ? -1 : 1;

    });


  sortedQuests.forEach(function (quest) {

    const item =
      document.createElement("div");


    // --------------------------------------
    // Daily / Weekly の種類を設定
    // --------------------------------------

    item.classList.add(
      quest.type
    );


    // --------------------------------------
    // クエスト名・報酬・種類
    // --------------------------------------

    const questInfo =
      document.createElement("span");

    questInfo.textContent =
      quest.name +
      "　+" +
      quest.reward +
      "N　" +
      (
        quest.type === "daily"
          ? "Daily"
          : "Weekly"
      );


    // --------------------------------------
    // 上下移動ボタンを入れる箱
    // --------------------------------------

    const moveButtons =
      document.createElement("div");

    moveButtons.classList.add(
      "moveButtons"
    );


    // --------------------------------------
    // 上へ移動ボタン
    // --------------------------------------

    const upButton =
      document.createElement("button");

    upButton.textContent = "▲";


    // --------------------------------------
    // 下へ移動ボタン
    // --------------------------------------

    const downButton =
      document.createElement("button");

    downButton.textContent = "▼";


    // --------------------------------------
    // 上へ移動
    // --------------------------------------

    upButton.addEventListener(
      "click",
      function () {

        const sameTypeQuests =
          quests.filter(function (q) {

            return q.type === quest.type;

          });


        const sameTypeIndex =
          sameTypeQuests.indexOf(quest);


        // 一番上なら何もしない

        if (sameTypeIndex <= 0) {
          return;
        }


        const targetQuest =
          sameTypeQuests[
            sameTypeIndex - 1
          ];


        const currentIndex =
          quests.indexOf(quest);

        const targetIndex =
          quests.indexOf(targetQuest);


        // 入れ替える

        quests[currentIndex] =
          targetQuest;

        quests[targetIndex] =
          quest;


        // 保存

        localStorage.setItem(
          "quests",
          JSON.stringify(
            quests
          )
        );


        // 再表示

        renderSettingsQuests();

        renderQuestLists();

      }
    );


    // --------------------------------------
    // 下へ移動
    // --------------------------------------

    downButton.addEventListener(
      "click",
      function () {

        const sameTypeQuests =
          quests.filter(function (q) {

            return q.type === quest.type;

          });


        const sameTypeIndex =
          sameTypeQuests.indexOf(quest);


        // 一番下なら何もしない

        if (
          sameTypeIndex >=
          sameTypeQuests.length - 1
        ) {

          return;

        }


        const targetQuest =
          sameTypeQuests[
            sameTypeIndex + 1
          ];


        const currentIndex =
          quests.indexOf(quest);

        const targetIndex =
          quests.indexOf(targetQuest);


        // 入れ替える

        quests[currentIndex] =
          targetQuest;

        quests[targetIndex] =
          quest;


        // 保存

        localStorage.setItem(
          "quests",
          JSON.stringify(
            quests
          )
        );


        // 再表示

        renderSettingsQuests();

        renderQuestLists();

      }
    );


    // --------------------------------------
    // 同じ種類のクエストの位置を取得
    // --------------------------------------

    const sameTypeQuests =
      quests.filter(function (q) {

        return q.type === quest.type;

      });


    const sameTypeIndex =
      sameTypeQuests.indexOf(quest);


    // --------------------------------------
    // 一番上なら▲を無効化
    // --------------------------------------

    if (sameTypeIndex === 0) {

      upButton.disabled = true;

    }


    // --------------------------------------
    // 一番下なら▼を無効化
    // --------------------------------------

    if (
      sameTypeIndex ===
      sameTypeQuests.length - 1
    ) {

      downButton.disabled = true;

    }


    // --------------------------------------
    // 上下ボタンを箱に入れる
    // --------------------------------------

    moveButtons.appendChild(
      upButton
    );

    moveButtons.appendChild(
      downButton
    );


    // --------------------------------------
    // 編集ボタン
    // --------------------------------------

    const editButton =
      document.createElement("button");


    // ★ Daily / Weekly を判別できるクラスを付ける

    editButton.classList.add(
      "editButton"
    );

    editButton.classList.add(
      quest.type
    );


    editButton.textContent =
      "編集";


    editButton.addEventListener(
      "click",
      function () {

        editingQuest = quest;


        questEditForm.style.display =
          "block";


        editQuestName.value =
          quest.name;


        editQuestReward.value =
          quest.reward;


        editQuestType.value =
          quest.type;

      }
    );


    // --------------------------------------
    // 削除ボタン
    // --------------------------------------

    const deleteButton =
      document.createElement("button");

    deleteButton.textContent =
      "削除";


    deleteButton.addEventListener(
      "click",
      function () {

        const answer =
          confirm(
            "「" +
            quest.name +
            "」を削除しますか？"
          );


        if (answer) {

          const index =
            quests.indexOf(quest);


          if (index !== -1) {

            quests.splice(
              index,
              1
            );

          }


          // Daily達成記録から削除

          const dailyIndex =
            completedDaily.indexOf(
              quest.id
            );


          if (
            dailyIndex !== -1
          ) {

            completedDaily.splice(
              dailyIndex,
              1
            );

          }


          // Weekly達成記録から削除

          const weeklyIndex =
            completedWeekly.indexOf(
              quest.id
            );


          if (
            weeklyIndex !== -1
          ) {

            completedWeekly.splice(
              weeklyIndex,
              1
            );

          }


          // 保存

          localStorage.setItem(
            "completedDaily",
            JSON.stringify(
              completedDaily
            )
          );


          localStorage.setItem(
            "completedWeekly",
            JSON.stringify(
              completedWeekly
            )
          );


          localStorage.setItem(
            "quests",
            JSON.stringify(
              quests
            )
          );


          // 再表示

          renderSettingsQuests();

          renderQuestLists();

        }

      }
    );


    // --------------------------------------
    // クエストを一覧に追加
    // --------------------------------------

    item.appendChild(
      questInfo
    );

    item.appendChild(
      moveButtons
    );

    item.appendChild(
      editButton
    );

    item.appendChild(
      deleteButton
    );


    settingsQuestList.appendChild(
      item
    );

  });

}


// ========================================
// メイン画面のクエストを表示
// ========================================

function renderQuestLists() {

  dailyQuestList.innerHTML = "";

  weeklyQuestList.innerHTML = "";


  quests.forEach(function (quest) {

    const button =
      document.createElement("button");


    button.classList.add(
      "quest"
    );


    button.classList.add(
      quest.type
    );


    button.dataset.id =
      quest.id;


    button.dataset.reward =
      quest.reward;


    button.textContent =
      quest.name +
      " +" +
      quest.reward +
      "N";


    // --------------------------------------
    // Daily / Weekly の達成状態
    // --------------------------------------

    const isWeekly =
      quest.type === "weekly";


    const completedList =
      isWeekly
        ? completedWeekly
        : completedDaily;


    // --------------------------------------
    // すでに達成済みなら無効化
    // --------------------------------------

    if (
      completedList.includes(
        quest.id
      )
    ) {

      button.textContent =
        "達成済み！ +" +
        quest.reward +
        "N";


      button.disabled = true;

    }


    // --------------------------------------
    // クエスト達成時
    // --------------------------------------

    button.addEventListener(
      "click",
      function () {

        if (
          completedList.includes(
            quest.id
          )
        ) {

          return;

        }


        nyun += quest.reward;


        nyunElement.textContent =
          nyun;


        localStorage.setItem(
          "nyun",
          nyun
        );


        completedList.push(
          quest.id
        );


        if (isWeekly) {

          localStorage.setItem(
            "completedWeekly",
            JSON.stringify(
              completedList
            )
          );

        } else {

          localStorage.setItem(
            "completedDaily",
            JSON.stringify(
              completedList
            )
          );

        }


        button.textContent =
          "達成済み！ +" +
          quest.reward +
          "N";


        button.disabled = true;

      }
    );


    // --------------------------------------
    // Daily / Weekly の一覧に追加
    // --------------------------------------

    if (
      quest.type === "daily"
    ) {

      dailyQuestList.appendChild(
        button
      );

    } else {

      weeklyQuestList.appendChild(
        button
      );

    }

  });

}


// ========================================
// 設定画面の表示
// ========================================

settingsButton.addEventListener(
  "click",
  function () {

    mainScreen.style.display =
      "none";


    settingsScreen.style.display =
      "block";


    renderSettingsQuests();

  }
);


// ========================================
// 設定画面から戻る
// ========================================

closeSettings.addEventListener(
  "click",
  function () {

    settingsScreen.style.display =
      "none";


    mainScreen.style.display =
      "block";

  }
);


// ========================================
// クエスト編集・追加の保存
// ========================================

saveQuestEdit.addEventListener(
  "click",
  function () {


    // --------------------------------------
    // 入力チェック
    // --------------------------------------

    if (
      editQuestName.value.trim() === ""
    ) {

      alert(
        "クエスト名を入力してください。"
      );

      return;

    }


    if (
      editQuestReward.value === "" ||
      Number(editQuestReward.value) <= 0
    ) {

      alert(
        "報酬は1N以上で入力してください。"
      );

      return;

    }


    // ======================================
    // 新しいクエストを追加
    // ======================================

    if (
      editingQuest === null
    ) {

      const newQuest = {

        id:
          "quest-" +
          Date.now(),

        name:
          editQuestName.value,

        reward:
          Number(
            editQuestReward.value
          ),

        type:
          editQuestType.value

      };


      quests.push(
        newQuest
      );


    } else {


      // ======================================
      // 既存クエストを編集
      // ======================================

      const oldType =
        editingQuest.type;


      editingQuest.name =
        editQuestName.value;


      editingQuest.reward =
        Number(
          editQuestReward.value
        );


      editingQuest.type =
        editQuestType.value;


      // --------------------------------------
      // Daily / Weekly を変更した場合
      // 達成状態をリセット
      // --------------------------------------

      if (
        oldType !== editingQuest.type
      ) {

        const dailyIndex =
          completedDaily.indexOf(
            editingQuest.id
          );


        if (
          dailyIndex !== -1
        ) {

          completedDaily.splice(
            dailyIndex,
            1
          );

        }


        const weeklyIndex =
          completedWeekly.indexOf(
            editingQuest.id
          );


        if (
          weeklyIndex !== -1
        ) {

          completedWeekly.splice(
            weeklyIndex,
            1
          );

        }


        localStorage.setItem(
          "completedDaily",
          JSON.stringify(
            completedDaily
          )
        );


        localStorage.setItem(
          "completedWeekly",
          JSON.stringify(
            completedWeekly
          )
        );

      }

    }


    // ========================================
    // クエスト設定を保存
    // ========================================

    localStorage.setItem(
      "quests",
      JSON.stringify(
        quests
      )
    );


    // ========================================
    // 設定画面を更新
    // ========================================

    renderSettingsQuests();


    // ========================================
    // メイン画面を更新
    // ========================================

    renderQuestLists();


    // ========================================
    // 編集フォームを閉じる
    // ========================================

    questEditForm.style.display =
      "none";


    editingQuest = null;

  }
);


// ========================================
// クエスト編集・追加のキャンセル
// ========================================

cancelQuestEdit.addEventListener(
  "click",
  function () {

    questEditForm.style.display =
      "none";


    editingQuest = null;

  }
);


// ========================================
// クエスト追加ボタン
// ========================================

addQuestButton.addEventListener(
  "click",
  function () {

    editingQuest = null;


    questEditForm.style.display =
      "block";


    editQuestName.value = "";


    editQuestReward.value = "";


    editQuestType.value =
      "daily";

  }
);


// ========================================
// リセットボタン
// ========================================

resetNyunButton.addEventListener(
  "click",
  function (event) {

    event.preventDefault();


    const answer =
      confirm(
        "本当にすべてをリセットしますか？"
      );


    if (answer) {

      // --------------------------------------
      // にゅんをリセット
      // --------------------------------------

      nyun = 0;


      nyunElement.textContent =
        nyun;


      localStorage.setItem(
        "nyun",
        "0"
      );


      // --------------------------------------
      // 達成済み情報を削除
      // --------------------------------------

      localStorage.removeItem(
        "completedDaily"
      );


      localStorage.removeItem(
        "completedWeekly"
      );


      // --------------------------------------
      // 日付・週の情報を削除
      // --------------------------------------

      localStorage.removeItem(
        "dailyDate"
      );


      localStorage.removeItem(
        "weeklyDate"
      );


      // --------------------------------------
      // 配列の中身も空にする
      // --------------------------------------

      completedDaily.length = 0;

      completedWeekly.length = 0;


      // --------------------------------------
      // クエストを再表示
      // --------------------------------------

      renderQuestLists();

    }

  }
);


// ========================================
// 起動時にクエストを表示
// ========================================

renderQuestLists();

renderSettingsQuests();
