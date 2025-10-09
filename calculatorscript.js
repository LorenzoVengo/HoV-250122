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

// function handleInput(e) {
//   input = e.target.value;
//   console.log(chart1);
//   console.log(inputs);
//   console.log(e.target.value);
//   // console.log(chart1.nth - last - chile(2).value);
// }

// 將 mmssSS 字串轉換為毫秒數
function customTimeToMilliseconds(str) {
  const padded = str.padStart(6, "0"); // 補滿6位數
  const mm = parseInt(padded.slice(0, 2));
  const ss = parseInt(padded.slice(2, 4));
  const ms = parseInt(padded.slice(4, 6));

  return mm * 60000 + ss * 1000 + ms * 10;
}

// 將毫秒轉換回 MM:SS.SS 字串
function millisecondsToDisplay(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((ms % 1000) / 10); // 轉成兩位數

  const mm = minutes.toString().padStart(2, "0");
  const ss = seconds.toString().padStart(2, "0");
  const msStr = milliseconds.toString().padStart(2, "0");

  return `${mm}:${ss}.${msStr}`;
}

function millisecondsToPremiereFormat(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = ms % 1000;

  const frames = Math.round((milliseconds / 1000) * 60);

  const hh = hours.toString().padStart(2, "0");
  const mm = minutes.toString().padStart(2, "0");
  const ss = seconds.toString().padStart(2, "0");
  const ff = frames.toString().padStart(2, "0");

  return `${hh}:${mm}:${ss}:${ff}`;
}

// 點擊 Done 時計算累積總時間
done.addEventListener("click", () => {
  const inputs = document.querySelectorAll(".inputBox");
  const sums = document.querySelectorAll(".sum");
  const premieres = document.querySelectorAll(".premiere");

  let totalMilliseconds = 0;

  inputs.forEach((input, index) => {
    const raw = input.value.trim();
    if (raw === "") return;

    const ms = customTimeToMilliseconds(raw);
    totalMilliseconds += ms;

    // 原本 Sum 欄位（MM:SS.SS）
    sums[index].innerText = millisecondsToDisplay(totalMilliseconds);

    // 新增 Premiere 欄位（MM:SS:FF） - 60fps 格式
    const premiereTime = millisecondsToPremiereFormat(totalMilliseconds);
    premieres[index].innerText = premiereTime;
  });
});

// 將 done 的功能抽成函式
function calculateSums() {
  const inputs = document.querySelectorAll(".inputBox");
  const sums = document.querySelectorAll(".sum");

  let totalMilliseconds = 0;

  inputs.forEach((input, index) => {
    const raw = input.value.trim();
    if (raw === "") return;

    const ms = customTimeToMilliseconds(raw);
    totalMilliseconds += ms;
    sums[index].innerText = millisecondsToDisplay(totalMilliseconds);
  });
}

// 按下 done 鍵時觸發
done.addEventListener("click", calculateSums);

// ⭐ 新增：按下 Enter 也執行計算
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); // 防止預設行為（例如表單送出）
    calculateSums();
  }
});
