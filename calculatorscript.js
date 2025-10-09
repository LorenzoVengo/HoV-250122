const chart1 = document.querySelector(".chart1");
const chart2 = document.querySelector(".chart2");
const chart3 = document.querySelector(".chart3");
const done = document.querySelector(".done");
const clear = document.querySelector(".clear");
let currentlap = 5;
let secondlastslot;

// 當倒數第二個欄位有輸入時的處理
function onSecondLastInput(e) {
  if (e.target.value.trim() !== "") {
    e.target.removeEventListener("input", onSecondLastInput); // 移除監聽，避免多次觸發
    addslot();
  }
}

// 綁定新的倒數第二個輸入框的事件
function setupSecondLastInputWatcher() {
  secondlastslot = chart1.querySelector("div:nth-last-child(2)");
  const inputField = secondlastslot.querySelector("input");

  inputField.removeEventListener("input", onSecondLastInput); // 清除舊的保險
  inputField.addEventListener("input", onSecondLastInput);
}

// 新增一整列 Lap/Sum/Premiere
function addslot() {
  currentlap++;

  const sorceslot = chart1.lastElementChild;
  const newslot = sorceslot.cloneNode(true);
  const sorcesum = chart2.lastElementChild;
  const newsum = sorcesum.cloneNode(true);
  const sorcepremiere = chart3.lastElementChild;
  const newpremiere = sorcepremiere.cloneNode(true);

  newslot.id = "inputdiv" + currentlap;
  const label = newslot.querySelector("label");
  const input = newslot.querySelector("input");

  label.htmlFor = "lap" + currentlap;
  label.textContent = "Lap " + currentlap;
  input.id = "lap" + currentlap;
  input.value = ""; // 清空新欄位

  chart1.appendChild(newslot);
  chart2.appendChild(newsum);
  chart3.appendChild(newpremiere);

  setupSecondLastInputWatcher(); // 設定新的監聽
}

// 清除所有輸入框與結果欄位內容
clear.addEventListener("click", () => {
  location.reload();
});

// 初始化：設定第一組輸入欄位的監聽器
setupSecondLastInputWatcher();

// 將 hhmmssFF 字串轉換為毫秒數
function customTimeToMilliseconds(str) {
  const padded = str.padStart(8, "0"); // 補滿8位數
  const hh = parseInt(padded.slice(0, 2));
  const mm = parseInt(padded.slice(2, 4));
  const ss = parseInt(padded.slice(4, 6));
  const FF = parseInt(padded.slice(6, 8)); // 這是百分之一秒（兩位數）

  return (
    hh * 3600000 + // 小時轉毫秒
    mm * 60000 + // 分鐘轉毫秒
    ss * 1000 + // 秒轉毫秒
    FF * 10 // 百分之一秒 → 毫秒
  );
}

// 將毫秒轉換為 HHMMSSFF 格式字串（FF 為百分之一秒）
function millisecondsToHHMMSSFF(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const hundredths = Math.floor((ms % 1000) / 10); // 百分之一秒

  const hh = hours.toString().padStart(2, "0");
  const mm = minutes.toString().padStart(2, "0");
  const ss = seconds.toString().padStart(2, "0");
  const ll = hundredths.toString().padStart(2, "0");

  return `${hh}:${mm}:${ss}:${ll}`;
}

// 將毫秒轉換回 HH:MM:SS:FF（FF為60fps影格）
function millisecondsToPremiereFormat(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = ms % 1000;

  // 60fps影格計算：毫秒除以1000再乘60fps
  const frames = Math.floor((milliseconds / 1000) * 60);

  const hh = hours.toString().padStart(2, "0");
  const mm = minutes.toString().padStart(2, "0");
  const ss = seconds.toString().padStart(2, "0");
  const ff = frames.toString().padStart(2, "0");

  return `${hh}:${mm}:${ss}:${ff}`;
}

// 將 done 的功能抽成函式，方便重複使用
function calculateSums() {
  const inputs = document.querySelectorAll(".inputBox");
  const sums = document.querySelectorAll(".sum");
  const premieres = document.querySelectorAll(".premiere");

  let totalMilliseconds = 0;

  // 確保輸入值為8位數，不足補零
  inputs.forEach((input, index) => {
    const rawInput = input.value.trim();
    if (rawInput === "") return;

    // 補零計算用，但不改變 input.value
    const paddedInput = rawInput.padStart(8, "0");

    const ms = customTimeToMilliseconds(paddedInput);
    totalMilliseconds += ms;

    // sum 欄位改成 HHMMSSFF 格式字串
    sums[index].innerText = millisecondsToHHMMSSFF(totalMilliseconds);

    // premiere 欄位維持 HH:MM:SS:FF 格式（60fps影格）
    premieres[index].innerText =
      millisecondsToPremiereFormat(totalMilliseconds);
  });
}

// 點擊 Done 時計算累積總時間
done.addEventListener("click", calculateSums);

// ⭐ 新增：按下 Enter 也執行計算
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); // 防止預設行為（例如表單送出）
    calculateSums();
  }
});
