// ========================================
// DEBUG LOG
// ========================================

const debugLogContent =
  document.getElementById("debugLogContent");


// JavaScript自体が読み込まれたことを記録
if (debugLogContent) {

  debugLogContent.textContent +=
    "[JS] script.js が読み込まれました\n";

}


// ========================================
// エラー監視
// ========================================

window.addEventListener(
  "error",
  function (event) {

    if (debugLogContent) {

      debugLogContent.textContent +=
        "[ERROR] " +
        event.message +
        "\n";

      debugLogContent.textContent +=
        "[ERROR] 場所: " +
        event.filename +
        ":" +
        event.lineno +
        "\n";

    }

  }
);


window.addEventListener(
  "unhandledrejection",
  function (event) {

    if (debugLogContent) {

      debugLogContent.textContent +=
        "[ERROR] Promiseエラー: " +
        event.reason +
        "\n";

    }

  }
);


// ========================================
// DEBUG関数
// ========================================

function debugLog(message) {

  const time =
    new Date().toLocaleTimeString();


  const text =
    "[" +
    time +
    "] " +
    message;


  console.log(text);


  if (debugLogContent) {

    debugLogContent.textContent +=
      text + "\n";


    debugLogContent.scrollTop =
      debugLogContent.scrollHeight;

  }

}


function debugCheck(name, element) {

  if (element) {

    debugLog(
      "OK: " +
      name +
      " を取得しました"
    );

  } else {

    debugLog(
      "ERROR: " +
      name +
      " が見つかりません"
    );

  }

}


debugLog(
  "========== JavaScript START =========="
);


// ========================================
// にゅん（所持金）の読み込み
// ========================================

debugLog(
  "にゅんの読み込み開始"
);


let nyun =
  Number(
    localStorage.getItem("nyun")
  ) || 0;

// ========================================
// にゅん獲得履歴
// ========================================

debugLog(
  "にゅん獲得履歴の読み込み開始"
);


let nyunHistory = {};


try {

  const savedNyunHistory =
    localStorage.getItem(
      "nyunHistory"
    );


  if (
    savedNyunHistory
  ) {

    nyunHistory =
      JSON.parse(
        savedNyunHistory
      );

  }


  debugLog(
    "にゅん獲得履歴読み込みOK"
  );

} catch (error) {

  debugLog(
    "ERROR: にゅん獲得履歴の読み込み失敗: " +
    error.message
  );


  nyunHistory = {};

}


debugLog(
  "にゅん獲得履歴読み込み完了"
);


const nyunElement =
  document.getElementById("nyun");


debugCheck(
  "nyun",
  nyunElement
);


const resetNyunButton =
  document.getElementById("resetNyun");


debugCheck(
  "resetNyun",
  resetNyunButton
);


if (nyunElement) {

  nyunElement.textContent =
    nyun;

}


debugLog(
  "にゅん初期化完了: " +
  nyun +
  " N"
);


// ========================================
// クエストの日付管理
// 午前5時を基準に「今日」を判定
// ========================================

debugLog(
  "日付管理関数の準備"
);


function getQuestDate() {

  const now =
    new Date();


  if (
    now.getHours() < 5
  ) {

    now.setDate(
      now.getDate() - 1
    );

  }


  const year =
    now.getFullYear();


  const month =
    String(
      now.getMonth() + 1
    ).padStart(2, "0");


  const day =
    String(
      now.getDate()
    ).padStart(2, "0");


  return (
    year +
    "-" +
    month +
    "-" +
    day
  );

}


// ========================================
// クエストの週管理
// ========================================

function getQuestWeek() {

  const now =
    new Date();


  if (
    now.getHours() < 5
  ) {

    now.setDate(
      now.getDate() - 1
    );

  }


  const day =
    now.getDay();


  const difference =
    day === 0
      ? -6
      : 1 - day;


  now.setDate(
    now.getDate() + difference
  );


  const year =
    now.getFullYear();


  const month =
    String(
      now.getMonth() + 1
    ).padStart(2, "0");


  const date =
    String(
      now.getDate()
    ).padStart(2, "0");


  return (
    year +
    "-" +
    month +
    "-" +
    date
  );

}


debugLog(
  "日付管理関数の準備完了"
);


// ========================================
// 今日・今週
// ========================================

const today =
  getQuestDate();


const thisWeek =
  getQuestWeek();


debugLog(
  "今日: " +
  today
);


debugLog(
  "今週: " +
  thisWeek
);


const savedDailyDate =
  localStorage.getItem(
    "dailyDate"
  );


const savedWeeklyDate =
  localStorage.getItem(
    "weeklyDate"
  );


debugLog(
  "保存されているDaily日付: " +
  savedDailyDate
);


debugLog(
  "保存されているWeekly日付: " +
  savedWeeklyDate
);


// ========================================
// Daily Quest リセット
// ========================================

if (
  savedDailyDate !== null &&
  savedDailyDate !== today
) {

  debugLog(
    "Daily Questをリセットします"
  );


  localStorage.removeItem(
    "completedDaily"
  );

}


localStorage.setItem(
  "dailyDate",
  today
);

// ========================================
// Weekly Quest リセット
// ========================================

if (
  savedWeeklyDate !== null &&
  savedWeeklyDate !== thisWeek
) {

  debugLog(
    "Weekly Questをリセットします"
  );


  localStorage.removeItem(
    "completedWeekly"
  );

}


localStorage.setItem(
  "weeklyDate",
  thisWeek
);


// ========================================
// 達成済みクエスト
// ========================================

debugLog(
  "達成済みクエスト読み込み開始"
);


let completedDaily = [];


let completedWeekly = [];


try {

  const savedCompletedDaily =
    localStorage.getItem(
      "completedDaily"
    );


  if (
    savedCompletedDaily
  ) {

    completedDaily =
      JSON.parse(
        savedCompletedDaily
      );

  }


  debugLog(
    "completedDaily読み込みOK"
  );

} catch (error) {

  debugLog(
    "ERROR: completedDailyの読み込み失敗: " +
    error.message
  );

}


try {

  const savedCompletedWeekly =
    localStorage.getItem(
      "completedWeekly"
    );


  if (
    savedCompletedWeekly
  ) {

    completedWeekly =
      JSON.parse(
        savedCompletedWeekly
      );

  }


  debugLog(
    "completedWeekly読み込みOK"
  );

} catch (error) {

  debugLog(
    "ERROR: completedWeeklyの読み込み失敗: " +
    error.message
  );

}


debugLog(
  "Daily達成数: " +
  completedDaily.length
);


debugLog(
  "Weekly達成数: " +
  completedWeekly.length
);


// ========================================
// クエスト一覧
// ========================================

const dailyQuestList =
  document.getElementById(
    "dailyQuestList"
  );


debugCheck(
  "dailyQuestList",
  dailyQuestList
);


const weeklyQuestList =
  document.getElementById(
    "weeklyQuestList"
  );


debugCheck(
  "weeklyQuestList",
  weeklyQuestList
);


// ========================================
// Reward画面
// ========================================

const rewardButton =
  document.getElementById(
    "rewardButton"
  );


debugCheck(
  "rewardButton",
  rewardButton
);


const questScreen =
  document.getElementById(
    "questScreen"
  );


debugCheck(
  "questScreen",
  questScreen
);


const rewardScreen =
  document.getElementById(
    "rewardScreen"
  );


debugCheck(
  "rewardScreen",
  rewardScreen
);


const rewardList =
  document.getElementById(
    "rewardList"
  );


debugCheck(
  "rewardList",
  rewardList
);


const backToQuestButton =
  document.getElementById(
    "backToQuestButton"
  );


debugCheck(
  "backToQuestButton",
  backToQuestButton
);


// ========================================
// Nグラフ画面
// ========================================

const graphButton =
  document.getElementById(
    "graphButton"
  );


debugCheck(
  "graphButton",
  graphButton
);


const graphScreen =
  document.getElementById(
    "graphScreen"
  );


debugCheck(
  "graphScreen",
  graphScreen
);


const nyunGraph =
  document.getElementById(
    "nyunGraph"
  );


debugCheck(
  "nyunGraph",
  nyunGraph
);


const backToQuestFromGraph =
  document.getElementById(
    "backToQuestFromGraph"
  );


debugCheck(
  "backToQuestFromGraph",
  backToQuestFromGraph
);

// ========================================
// Rewardポップアップ
// ========================================

const rewardPopup =
  document.getElementById(
    "rewardPopup"
  );


debugCheck(
  "rewardPopup",
  rewardPopup
);


const rewardPopupMessage =
  document.getElementById(
    "rewardPopupMessage"
  );


debugCheck(
  "rewardPopupMessage",
  rewardPopupMessage
);


const rewardPopupOK =
  document.getElementById(
    "rewardPopupOK"
  );


debugCheck(
  "rewardPopupOK",
  rewardPopupOK
);


debugLog(
  "Reward要素の確認完了"
);


// ========================================
// クエストデータ
// ========================================

debugLog(
  "クエストデータ読み込み開始"
);


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


let quests = [];


try {

  const savedQuests =
    localStorage.getItem(
      "quests"
    );


  if (
    savedQuests
  ) {

    quests =
      JSON.parse(
        savedQuests
      );

    debugLog(
      "保存済みクエストを読み込みました"
    );

  } else {

    quests =
      defaultQuests.slice();

    debugLog(
      "保存済みクエストなし → 初期値を使用"
    );

  }

} catch (error) {

  debugLog(
    "ERROR: questsの読み込み失敗: " +
    error.message
  );


  quests =
    defaultQuests.slice();

}


debugLog(
  "クエスト読み込み完了: " +
  quests.length +
  "件"
);


// ========================================
// ご褒美データ
// ========================================

debugLog(
  "Rewardデータ読み込み開始"
);


const defaultRewards = [

  {
    id: "convenience-sweets",
    name: "スイーツを買う",
    price: 10000
  },

  {
    id: "snacks",
    name: "スナック菓子を買う",
    price: 10000
  },

  {
    id: "cafe",
    name: "カフェで好きなものを飲む",
    price: 25000
  },

  {
    id: "alchool",
    name: "好きなお酒を飲む",
    price: 100000
  }

];


let rewards = [];


try {

  const savedRewards =
    localStorage.getItem(
      "rewards"
    );


  if (
    savedRewards
  ) {

    rewards =
      JSON.parse(
        savedRewards
      );

    debugLog(
      "保存済みRewardを読み込みました"
    );

  } else {

    rewards =
      defaultRewards.slice();

    debugLog(
      "保存済みRewardなし → 初期値を使用"
    );

  }

} catch (error) {

  debugLog(
    "ERROR: rewardsの読み込み失敗: " +
    error.message
  );


  rewards =
    defaultRewards.slice();

}


debugLog(
  "Reward読み込み完了: " +
  rewards.length +
  "件"
);


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


debugCheck(
  "questEditForm",
  questEditForm
);


debugCheck(
  "editQuestName",
  editQuestName
);


debugCheck(
  "editQuestReward",
  editQuestReward
);


debugCheck(
  "editQuestType",
  editQuestType
);


debugCheck(
  "saveQuestEdit",
  saveQuestEdit
);


debugCheck(
  "cancelQuestEdit",
  cancelQuestEdit
);


// ========================================
// ご褒美編集フォーム
// ========================================

const rewardEditForm =
  document.getElementById(
    "rewardEditForm"
  );


const editRewardName =
  document.getElementById(
    "editRewardName"
  );


const editRewardPrice =
  document.getElementById(
    "editRewardPrice"
  );


const saveRewardEdit =
  document.getElementById(
    "saveRewardEdit"
  );


const cancelRewardEdit =
  document.getElementById(
    "cancelRewardEdit"
  );


debugCheck(
  "rewardEditForm",
  rewardEditForm
);


debugCheck(
  "editRewardName",
  editRewardName
);


debugCheck(
  "editRewardPrice",
  editRewardPrice
);


debugCheck(
  "saveRewardEdit",
  saveRewardEdit
);


debugCheck(
  "cancelRewardEdit",
  cancelRewardEdit
);


// ========================================
// 現在編集中のクエスト・ご褒美
// ========================================

let editingQuest =
  null;


let editingReward =
  null;


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


// ご褒美設定
const settingsRewardList =
  document.getElementById(
    "settingsRewardList"
  );


const addRewardButton =
  document.getElementById(
    "addRewardButton"
  );


debugCheck(
  "settingsButton",
  settingsButton
);


debugCheck(
  "settingsScreen",
  settingsScreen
);


debugCheck(
  "mainScreen",
  mainScreen
);


debugCheck(
  "closeSettings",
  closeSettings
);


debugCheck(
  "settingsQuestList",
  settingsQuestList
);


debugCheck(
  "addQuestButton",
  addQuestButton
);


debugCheck(
  "settingsRewardList",
  settingsRewardList
);


debugCheck(
  "addRewardButton",
  addRewardButton
);


debugLog(
  "HTML要素の確認完了"
);


// ========================================
// 設定画面のクエスト一覧
// ========================================

function renderSettingsQuests() {

  debugLog(
    "renderSettingsQuests() 開始"
  );


  if (
    !settingsQuestList
  ) {

    debugLog(
      "ERROR: settingsQuestListがありません"
    );

    return;

  }


  settingsQuestList.innerHTML =
    "";


  const sortedQuests =
    quests.slice().sort(
      function (a, b) {

        if (
          a.type === b.type
        ) {

          return 0;

        }


        return (
          a.type === "daily"
            ? -1
            : 1
        );

      }
    );


  sortedQuests.forEach(
    function (quest) {

      const item =
        document.createElement(
          "div"
        );


      item.classList.add(
        quest.type
      );


      const questInfo =
        document.createElement(
          "span"
        );


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


      const moveButtons =
        document.createElement(
          "div"
        );


      moveButtons.classList.add(
        "moveButtons"
      );


      const upButton =
        document.createElement(
          "button"
        );


      upButton.textContent =
        "▲";


      const downButton =
        document.createElement(
          "button"
        );


      downButton.textContent =
        "▼";


      // 上へ
      upButton.addEventListener(
        "click",
        function () {

          const sameTypeQuests =
            quests.filter(
              function (q) {

                return (
                  q.type === quest.type
                );

              }
            );


          const sameTypeIndex =
            sameTypeQuests.indexOf(
              quest
            );


          if (
            sameTypeIndex <= 0
          ) {

            return;

          }


          const targetQuest =
            sameTypeQuests[
              sameTypeIndex - 1
            ];


          const currentIndex =
            quests.indexOf(
              quest
            );


          const targetIndex =
            quests.indexOf(
              targetQuest
            );


          quests[currentIndex] =
            targetQuest;


          quests[targetIndex] =
            quest;


          localStorage.setItem(
            "quests",
            JSON.stringify(
              quests
            )
          );


          renderSettingsQuests();

          renderQuestLists();

        }
      );


      // 下へ
      downButton.addEventListener(
        "click",
        function () {

          const sameTypeQuests =
            quests.filter(
              function (q) {

                return (
                  q.type === quest.type
                );

              }
            );


          const sameTypeIndex =
            sameTypeQuests.indexOf(
              quest
            );


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
            quests.indexOf(
              quest
            );


          const targetIndex =
            quests.indexOf(
              targetQuest
            );


          quests[currentIndex] =
            targetQuest;


          quests[targetIndex] =
            quest;


          localStorage.setItem(
            "quests",
            JSON.stringify(
              quests
            )
          );


          renderSettingsQuests();

          renderQuestLists();

        }
      );


      const sameTypeQuests =
        quests.filter(
          function (q) {

            return (
              q.type === quest.type
            );

          }
        );


      const sameTypeIndex =
        sameTypeQuests.indexOf(
          quest
        );


      if (
        sameTypeIndex === 0
      ) {

        upButton.disabled =
          true;

      }


      if (
        sameTypeIndex ===
        sameTypeQuests.length - 1
      ) {

        downButton.disabled =
          true;

      }


      moveButtons.appendChild(
        upButton
      );


      moveButtons.appendChild(
        downButton
      );


      // 編集ボタン
      const editButton =
        document.createElement(
          "button"
        );


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

          editingQuest =
            quest;


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


      // 削除ボタン
      const deleteButton =
        document.createElement(
          "button"
        );


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


          if (!answer) {

            return;

          }


          const index =
            quests.indexOf(
              quest
            );


          if (
            index !== -1
          ) {

            quests.splice(
              index,
              1
            );

          }


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


          renderSettingsQuests();

          renderQuestLists();

        }
      );


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

    }
  );


  debugLog(
    "renderSettingsQuests() 完了"
  );

}


// ========================================
// 設定画面のご褒美一覧
// ========================================

function renderSettingsRewards() {

  debugLog(
    "renderSettingsRewards() 開始"
  );


  if (
    !settingsRewardList
  ) {

    debugLog(
      "ERROR: settingsRewardListがありません"
    );

    return;

  }


  settingsRewardList.innerHTML =
    "";


  rewards.forEach(
    function (reward) {

      const item =
        document.createElement(
          "div"
        );


      const rewardInfo =
        document.createElement(
          "span"
        );


      rewardInfo.textContent =
        reward.name +
        "　" +
        reward.price.toLocaleString() +
        " N";


      // ------------------------------------
      // 並べ替えボタン
      // ------------------------------------

      const moveButtons =
        document.createElement(
          "div"
        );


      moveButtons.classList.add(
        "moveButtons"
      );


      const upButton =
        document.createElement(
          "button"
        );


      upButton.textContent =
        "▲";


      const downButton =
        document.createElement(
          "button"
        );


      downButton.textContent =
        "▼";


      // 上へ
      upButton.addEventListener(
        "click",
        function () {

          const index =
            rewards.indexOf(
              reward
            );


          if (
            index <= 0
          ) {

            return;

          }


          const previous =
            rewards[index - 1];


          rewards[index - 1] =
            reward;


          rewards[index] =
            previous;


          localStorage.setItem(
            "rewards",
            JSON.stringify(
              rewards
            )
          );


          renderSettingsRewards();

        }
      );


      // 下へ
      downButton.addEventListener(
        "click",
        function () {

          const index =
            rewards.indexOf(
              reward
            );


          if (
            index >=
            rewards.length - 1
          ) {

            return;

          }


          const next =
            rewards[index + 1];


          rewards[index + 1] =
            reward;


          rewards[index] =
            next;


          localStorage.setItem(
            "rewards",
            JSON.stringify(
              rewards
            )
          );


          renderSettingsRewards();

        }
      );


      const index =
        rewards.indexOf(
          reward
        );


      if (
        index === 0
      ) {

        upButton.disabled =
          true;

      }


      if (
        index ===
        rewards.length - 1
      ) {

        downButton.disabled =
          true;

      }


      moveButtons.appendChild(
        upButton
      );


      moveButtons.appendChild(
        downButton
      );


      // ------------------------------------
      // 編集ボタン
      // ------------------------------------

      const editButton =
        document.createElement(
          "button"
        );


      editButton.classList.add(
        "editRewardButton"
      );


      editButton.textContent =
        "編集";


      editButton.addEventListener(
        "click",
        function () {

          editingReward =
            reward;


          rewardEditForm.style.display =
            "block";


          editRewardName.value =
            reward.name;


          editRewardPrice.value =
            reward.price;

        }
      );


      // ------------------------------------
      // 削除ボタン
      // ------------------------------------

      const deleteButton =
        document.createElement(
          "button"
        );


      deleteButton.classList.add(
        "deleteRewardButton"
      );


      deleteButton.textContent =
        "削除";


      deleteButton.addEventListener(
        "click",
        function () {

          const answer =
            confirm(
              "「" +
              reward.name +
              "」を削除しますか？"
            );


          if (
            !answer
          ) {

            return;

          }


          const index =
            rewards.indexOf(
              reward
            );


          if (
            index !== -1
          ) {

            rewards.splice(
              index,
              1
            );

          }


          localStorage.setItem(
            "rewards",
            JSON.stringify(
              rewards
            )
          );


          renderSettingsRewards();

        }
      );


      item.appendChild(
        rewardInfo
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


      settingsRewardList.appendChild(
        item
      );

    }
  );


  debugLog(
    "renderSettingsRewards() 完了"
  );

}


// ========================================
// メイン画面のクエスト
// ========================================

function renderQuestLists() {

  debugLog(
    "renderQuestLists() 開始"
  );


  if (
    !dailyQuestList ||
    !weeklyQuestList
  ) {

    debugLog(
      "ERROR: クエスト一覧のHTML要素がありません"
    );

    return;

  }


  dailyQuestList.innerHTML =
    "";


  weeklyQuestList.innerHTML =
    "";


  quests.forEach(
    function (quest) {

      const button =
        document.createElement(
          "button"
        );


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


      const isWeekly =
        quest.type === "weekly";


      const completedList =
        isWeekly
          ? completedWeekly
          : completedDaily;


      if (
        completedList.includes(
          quest.id
        )
      ) {

        button.textContent =
          "達成済み！ +" +
          quest.reward +
          "N";


        button.disabled =
          true;

      }


      button.addEventListener(
        "click",
        function () {

          debugLog(
            "クエスト達成: " +
            quest.name
          );


          if (
            completedList.includes(
              quest.id
            )
          ) {

            return;

          }


          nyun +=
            quest.reward;


          nyunElement.textContent =
            nyun;


          localStorage.setItem(
            "nyun",
            nyun
          );

// ------------------------------------
// 日別の獲得Nを記録
// ------------------------------------

const questDate =
  getQuestDate();


if (
  !nyunHistory[questDate]
) {

  nyunHistory[questDate] =
    0;

}


nyunHistory[questDate] +=
  quest.reward;


localStorage.setItem(
  "nyunHistory",
  JSON.stringify(
    nyunHistory
  )
);


debugLog(
  "日別獲得Nを記録: " +
  questDate +
  " → " +
  nyunHistory[questDate] +
  " N"
);


          completedList.push(
            quest.id
          );


          if (
            isWeekly
          ) {

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


          button.disabled =
            true;


          debugLog(
            "にゅん加算後: " +
            nyun +
            " N"
          );

        }
      );


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

    }
  );


  debugLog(
    "renderQuestLists() 完了"
  );

}


// ========================================
// Reward一覧
// ========================================

function renderRewardList() {

  debugLog(
    "renderRewardList() 開始"
  );


  if (
    !rewardList
  ) {

    debugLog(
      "ERROR: rewardListがありません"
    );

    return;

  }


  rewardList.innerHTML =
    "";


  rewards.forEach(
    function (reward) {

      const button =
        document.createElement(
          "button"
        );


      button.classList.add(
        "reward"
      );


      button.dataset.id =
        reward.id;


      button.innerHTML =
        reward.name +
        '<span class="rewardPrice">' +
        reward.price.toLocaleString() +
        " N</span>";


      if (
        nyun < reward.price
      ) {

        button.disabled =
          true;

      }


      button.addEventListener(
        "click",
        function () {

          debugLog(
            "Reward選択: " +
            reward.name
          );


          if (
            nyun < reward.price
          ) {

            return;

          }


          nyun -=
            reward.price;


          nyunElement.textContent =
            nyun;


          localStorage.setItem(
            "nyun",
            nyun
          );


          rewardPopupMessage.textContent =
            "Reward: " +
            reward.name +
            " をGETしました！";


          rewardPopup.style.display =
            "flex";


          debugLog(
            "Reward取得完了。残り: " +
            nyun +
            " N"
          );

        }
      );


      rewardList.appendChild(
        button
      );

    }
  );


  debugLog(
    "renderRewardList() 完了"
  );

}


// ========================================
// クエスト画面
// ========================================

function showQuestScreen() {

  debugLog(
    "showQuestScreen() 開始"
  );


  if (
    questScreen
  ) {

    questScreen.style.display =
      "block";

  }


  if (
    rewardScreen
  ) {

    rewardScreen.style.display =
      "none";

  }


  // クエスト画面ではRewardボタンを表示
  if (
    rewardButton
  ) {

    rewardButton.style.display =
      "block";

  }


  debugLog(
    "showQuestScreen() 完了"
  );

}


// ========================================
// Reward画面
// ========================================

function showRewardScreen() {

  debugLog(
    "showRewardScreen() 開始"
  );


  if (
    questScreen
  ) {

    questScreen.style.display =
      "none";

  }


  if (
    rewardScreen
  ) {

    rewardScreen.style.display =
      "block";

  }


  // Reward画面ではRewardボタンを隠す
  if (
    rewardButton
  ) {

    rewardButton.style.display =
      "none";

  }


  renderRewardList();


  debugLog(
    "showRewardScreen() 完了"
  );

}


// ========================================
// Rewardボタン
// ========================================

if (
  rewardButton
) {

  rewardButton.addEventListener(
    "click",
    function () {

      debugLog(
        "Rewardボタンが押されました"
      );


      showRewardScreen();

    }
  );

}


// ========================================
// クエストに戻る
// ========================================

if (
  backToQuestButton
) {

  backToQuestButton.addEventListener(
    "click",
    function () {

      debugLog(
        "クエストに戻るボタンが押されました"
      );


      showQuestScreen();

    }
  );

}


// ========================================
// Rewardポップアップ OK
// ========================================

if (
  rewardPopupOK
) {

  rewardPopupOK.addEventListener(
    "click",
    function () {

      debugLog(
        "RewardポップアップOK"
      );


      rewardPopup.style.display =
        "none";



      showQuestScreen();

    }
  );

}


// ========================================
// 設定画面
// ========================================

if (
  settingsButton
) {

  settingsButton.addEventListener(
    "click",
    function () {

      debugLog(
        "設定ボタンが押されました"
      );


      mainScreen.style.display =
        "none";


      settingsScreen.style.display =
        "block";


      renderSettingsQuests();

      renderSettingsRewards();

    }
  );

}


// ========================================
// 設定画面から戻る
// ========================================

if (
  closeSettings
) {

  closeSettings.addEventListener(
    "click",
    function () {

      debugLog(
        "設定画面を閉じます"
      );


      settingsScreen.style.display =
        "none";


      mainScreen.style.display =
        "block";

    }
  );

}


// ========================================
// クエスト編集・追加 保存
// ========================================

if (
  saveQuestEdit
) {

  saveQuestEdit.addEventListener(
    "click",
    function () {

      debugLog(
        "クエスト保存ボタンが押されました"
      );


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
        Number(
          editQuestReward.value
        ) <= 0
      ) {

        alert(
          "報酬は1N以上で入力してください。"
        );

        return;

      }


      // 新規追加
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


        debugLog(
          "新しいクエストを追加しました: " +
          newQuest.name
        );

      } else {

        // 既存編集
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


        if (
          oldType !==
          editingQuest.type
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


        debugLog(
          "クエストを編集しました: " +
          editingQuest.name
        );

      }


      localStorage.setItem(
        "quests",
        JSON.stringify(
          quests
        )
      );


      renderSettingsQuests();

      renderQuestLists();


      questEditForm.style.display =
        "none";


      editingQuest =
        null;


      debugLog(
        "クエスト保存完了"
      );

    }
  );

}


// ========================================
// クエスト編集キャンセル
// ========================================

if (
  cancelQuestEdit
) {

  cancelQuestEdit.addEventListener(
    "click",
    function () {

      debugLog(
        "クエスト編集をキャンセル"
      );


      questEditForm.style.display =
        "none";


      editingQuest =
        null;

    }
  );

}


// ========================================
// クエスト追加
// ========================================

if (
  addQuestButton
) {

  addQuestButton.addEventListener(
    "click",
    function () {

      debugLog(
        "クエスト追加ボタンが押されました"
      );


      editingQuest =
        null;


      questEditForm.style.display =
        "block";


      editQuestName.value =
        "";


      editQuestReward.value =
        "";


      editQuestType.value =
        "daily";

    }
  );

}


// ========================================
// ご褒美編集・追加 保存
// ========================================

if (
  saveRewardEdit
) {

  saveRewardEdit.addEventListener(
    "click",
    function () {

      debugLog(
        "ご褒美保存ボタンが押されました"
      );


      const name =
        editRewardName.value.trim();


      const price =
        Number(
          editRewardPrice.value
        );


      if (
        name === ""
      ) {

        alert(
          "ご褒美名を入力してください。"
        );

        return;

      }


      if (
        !Number.isFinite(price) ||
        price <= 0
      ) {

        alert(
          "必要Nは1N以上で入力してください。"
        );

        return;

      }


      // 新規追加
      if (
        editingReward === null
      ) {

        const newReward = {

          id:
            "reward-" +
            Date.now(),

          name:
            name,

          price:
            price

        };


        rewards.push(
          newReward
        );


        debugLog(
          "新しいご褒美を追加しました: " +
          newReward.name
        );

      } else {

        // 既存編集
        editingReward.name =
          name;


        editingReward.price =
          price;


        debugLog(
          "ご褒美を編集しました: " +
          editingReward.name
        );

      }


      localStorage.setItem(
        "rewards",
        JSON.stringify(
          rewards
        )
      );


      renderSettingsRewards();


      rewardEditForm.style.display =
        "none";


      editingReward =
        null;


      debugLog(
        "ご褒美保存完了"
      );

    }
  );

}


// ========================================
// ご褒美編集キャンセル
// ========================================

if (
  cancelRewardEdit
) {

  cancelRewardEdit.addEventListener(
    "click",
    function () {

      debugLog(
        "ご褒美編集をキャンセル"
      );


      rewardEditForm.style.display =
        "none";


      editingReward =
        null;

    }
  );

}


// ========================================
// ご褒美追加
// ========================================

if (
  addRewardButton
) {

  addRewardButton.addEventListener(
    "click",
    function () {

      debugLog(
        "ご褒美追加ボタンが押されました"
      );


      editingReward =
        null;


      rewardEditForm.style.display =
        "block";


      editRewardName.value =
        "";


      editRewardPrice.value =
        "";

    }
  );

}


// ========================================
// リセット
// ========================================

if (
  resetNyunButton
) {

  resetNyunButton.addEventListener(
    "click",
    function (event) {

      event.preventDefault();


      debugLog(
        "リセットボタンが押されました"
      );


      const answer =
        confirm(
          "本当にすべてをリセットしますか？"
        );


      if (!answer) {

        debugLog(
          "リセットをキャンセルしました"
        );

        return;

      }


      nyun =
        0;


      nyunElement.textContent =
        nyun;


      localStorage.setItem(
        "nyun",
        "0"
      );


      localStorage.removeItem(
        "completedDaily"
      );


      localStorage.removeItem(
        "completedWeekly"
      );

localStorage.removeItem(
  "nyunHistory"
);


nyunHistory = {};

      localStorage.removeItem(
        "dailyDate"
      );


      localStorage.removeItem(
        "weeklyDate"
      );


      completedDaily.length =
        0;


      completedWeekly.length =
        0;


      renderQuestLists();

      renderRewardList();


      debugLog(
        "すべてのリセット完了"
      );

    }
  );

}


// ========================================
// Nグラフ
// ========================================

function renderNyunGraph() {

  debugLog(
    "renderNyunGraph() 開始"
  );


  if (
    !nyunGraph
  ) {

    debugLog(
      "ERROR: nyunGraphがありません"
    );

    return;

  }


  nyunGraph.innerHTML =
    "";


  // ------------------------------------
  // 今日の日付を取得
  // ------------------------------------

  const todayDate =
    getQuestDate();


  const today =
    new Date(
      todayDate + "T12:00:00"
    );


  // ------------------------------------
  // 7日前～今日の8日分
  // ------------------------------------

  const dates = [];


  for (
    let i = 7;
    i >= 0;
    i--
  ) {

    const date =
      new Date(
        today
      );


    date.setDate(
      today.getDate() - i
    );


    const year =
      date.getFullYear();


    const month =
      String(
        date.getMonth() + 1
      ).padStart(
        2,
        "0"
      );


    const day =
      String(
        date.getDate()
      ).padStart(
        2,
        "0"
      );


    const dateKey =
      year +
      "-" +
      month +
      "-" +
      day;


    dates.push(
      dateKey
    );

  }


  // ------------------------------------
  // 最大値を取得
  // ------------------------------------

  let maxValue =
    0;


  dates.forEach(
    function (dateKey) {

      const value =
        Number(
          nyunHistory[dateKey]
        ) || 0;


      if (
        value > maxValue
      ) {

        maxValue =
          value;

      }

    }
  );


  // 全部0だった場合
  if (
    maxValue === 0
  ) {

    maxValue =
      100;

  }


  // ------------------------------------
  // 棒グラフを作成
  // ------------------------------------

  dates.forEach(
    function (dateKey) {

      const value =
        Number(
          nyunHistory[dateKey]
        ) || 0;


      const date =
        new Date(
          dateKey + "T12:00:00"
        );


      const month =
        date.getMonth() + 1;


      const day =
        date.getDate();


      const weekNames = [
        "日",
        "月",
        "火",
        "水",
        "木",
        "金",
        "土"
      ];


      const week =
        weekNames[
          date.getDay()
        ];


      // --------------------------------
      // 日付全体
      // --------------------------------

      const barContainer =
        document.createElement(
          "div"
        );


      barContainer.classList.add(
        "graphBarContainer"
      );


      // --------------------------------
      // 数値
      // --------------------------------

      const valueElement =
        document.createElement(
          "div"
        );


      valueElement.classList.add(
        "graphValue"
      );


      valueElement.textContent =
        value +
        "N";


      // --------------------------------
      // 棒を入れるエリア
      // --------------------------------

      const barArea =
        document.createElement(
          "div"
        );


      barArea.classList.add(
        "graphBarArea"
      );


      // --------------------------------
      // 棒
      // --------------------------------

      const bar =
        document.createElement(
          "div"
        );


      bar.classList.add(
        "graphBar"
      );


      const height =
        value === 0
          ? 0
          : Math.max(
              8,
              (value / maxValue) * 100
            );


      bar.style.height =
        height +
        "%";


      barArea.appendChild(
        bar
      );


      // --------------------------------
      // 日付
      // --------------------------------

      const dateElement =
        document.createElement(
          "div"
        );


      dateElement.classList.add(
        "graphDate"
      );


      dateElement.innerHTML =
        month +
        "/" +
        day +
        "<br>" +
        "(" +
        week +
        ")";


      // --------------------------------
      // 追加
      // --------------------------------

      barContainer.appendChild(
        valueElement
      );


      barContainer.appendChild(
        barArea
      );


      barContainer.appendChild(
        dateElement

      );


      nyunGraph.appendChild(
        barContainer
      );

    }
  );


  debugLog(
    "renderNyunGraph() 完了"
  );

}

// ========================================
// Nグラフ画面
// ========================================

function showGraphScreen() {

  debugLog(
    "showGraphScreen() 開始"
  );


  if (
    mainScreen
  ) {

    mainScreen.style.display =
      "none";

  }


  if (
    settingsScreen
  ) {

    settingsScreen.style.display =
      "none";

  }


  if (
    graphScreen
  ) {

    graphScreen.style.display =
      "block";

  }


  renderNyunGraph();


  debugLog(
    "showGraphScreen() 完了"
  );

}


// ========================================
// グラフからクエストへ戻る
// ========================================

function backFromGraph() {

  debugLog(
    "グラフ画面からクエスト画面へ戻ります"
  );


  if (
    graphScreen
  ) {

    graphScreen.style.display =
      "none";

  }


  if (
    mainScreen
  ) {

    mainScreen.style.display =
      "block";

  }


  showQuestScreen();

}


// ========================================
// Nグラフボタン
// ========================================

if (
  graphButton
) {

  graphButton.addEventListener(
    "click",
    function () {

      debugLog(
        "Nグラフボタンが押されました"
      );


      showGraphScreen();

    }
  );

}


// ========================================
// グラフから戻る
// ========================================

if (
  backToQuestFromGraph
) {

  backToQuestFromGraph.addEventListener(
    "click",
    function () {

      backFromGraph();

    }
  );

}

// ========================================
// 起動
// ========================================

debugLog(
  "========== 起動処理開始 =========="
);


showQuestScreen();


debugLog(
  "showQuestScreen() 完了"
);


renderQuestLists();


debugLog(
  "renderQuestLists() 完了"
);


renderSettingsQuests();


debugLog(
  "renderSettingsQuests() 完了"
);


renderSettingsRewards();


debugLog(
  "renderSettingsRewards() 完了"
);


debugLog(
  "========== JavaScript COMPLETE =========="
);

