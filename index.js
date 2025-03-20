function logMood(mood) {
  const today = new Date().toLocaleDateString();
  const moodEntry = { date: today, mood };

  let moodLog = JSON.parse(localStorage.getItem("moodLog")) || [];
  moodLog.push(moodEntry);
  localStorage.setItem("moodLog", JSON.stringify(moodLog));
  displayMoods();
}

function displayMoods() {
  const moodLog = JSON.parse(localStorage.getItem("moodLog")) || [];
  const moodList = document.getElementById("moodList");
  moodList.innerHTML = "";

  moodLog.forEach((entry) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${entry.date}: ${entry.mood}`;
    moodList.appendChild(listItem);
  });
}

function addNewMood() {
  const newMoodInput = document.getElementById("newMood");
  const newMood = newMoodInput.value.trim();

  if (newMood) {
    const moodButtons = document.getElementById("moodButtons");
    const newButton = document.createElement("button");
    newButton.textContent = newMood;
    newButton.style.background = "#4caf50";
    newButton.onclick = function () {
      logMood(newMood);
    };
    moodButtons.appendChild(newButton);

    let savedMoods = JSON.parse(localStorage.getItem("savedMoods")) || [];
    savedMoods.push(newMood);
    localStorage.setItem("savedMoods", JSON.stringify(savedMoods));

    newMoodInput.value = "";
  }
}

function loadSavedMoods() {
  const savedMoods = JSON.parse(localStorage.getItem("savedMoods")) || [];
  savedMoods.forEach((mood) => {
    const moodButtons = document.getElementById("moodButtons");
    const newButton = document.createElement("button");
    newButton.textContent = mood;
    newButton.style.background = "#4caf50";
    newButton.onclick = function () {
      logMood(mood);
    };
    moodButtons.appendChild(newButton);
  });
}

window.onload = function () {
  displayMoods();
  loadSavedMoods();
};
