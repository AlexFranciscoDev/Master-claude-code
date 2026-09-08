const EMOJI_OPTIONS = ["💧", "🏃", "📚", "🧘", "😴", "💪", "🥗", "🎯", "🌱", "⚡", "🎸", "🎨"];

const MOTIVATIONAL_MESSAGES = [
  "🌟 Great job! Keep it up!",
  "🚀 Nice work! Momentum building!",
  "💚 Well done! Consistency pays!",
  "🌱 Awesome! One day closer!",
  "⭐ You're on fire!",
  "🎯 Perfect! Stay focused!",
  "💪 Strong effort today!",
  "✨ You're crushing it!",
];

function getRandomMotivationalMessage() {
  const index = Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length);
  return MOTIVATIONAL_MESSAGES[index];
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function renderSummary(habits) {
  const activeEl = document.getElementById("summary-active");
  const bestStreakEl = document.getElementById("summary-best-streak");
  const todayEl = document.getElementById("summary-today");

  activeEl.textContent = String(habits.length);
  bestStreakEl.textContent = String(getBestStreak(habits));
  todayEl.textContent = String(getCompletedTodayCount(habits));
}

const CARD_PALETTE = [
  { bg: "#ffe3e8", accent: "#e0577c" },
  { bg: "#fff1cf", accent: "#c98a1c" },
  { bg: "#e3f2ff", accent: "#3b7dc2" },
  { bg: "#e6f7e9", accent: "#2f9e6b" },
  { bg: "#f1e7ff", accent: "#7c5ec4" },
  { bg: "#ffe8dc", accent: "#d16a3c" },
];

function getHabitPalette(habit) {
  let hash = 0;
  for (let i = 0; i < habit.id.length; i++) {
    hash = (hash + habit.id.charCodeAt(i)) % CARD_PALETTE.length;
  }
  return CARD_PALETTE[hash];
}

function getWeekdayLetters() {
  const today = new Date();
  const letters = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    letters.push(date.toLocaleDateString("en-US", { weekday: "narrow" }));
  }
  return letters;
}

function createHabitCard(habit, handlers) {
  const palette = getHabitPalette(habit);

  const card = document.createElement("li");
  card.className = "habit-card";
  card.style.backgroundColor = palette.bg;

  const topRow = document.createElement("div");
  topRow.className = "habit-card__top";

  const identity = document.createElement("div");
  identity.className = "habit-card__identity";

  const emoji = document.createElement("div");
  emoji.className = "habit-card__emoji";
  emoji.textContent = habit.emoji || "🎯";

  const nameColumn = document.createElement("div");
  nameColumn.className = "habit-name-column";

  const name = document.createElement("h3");
  name.className = "habit-card__name";
  name.textContent = habit.name;
  name.title = habit.name;

  const streak = document.createElement("div");
  streak.className = "habit-card__streak";
  streak.style.color = palette.accent;
  streak.textContent = `🔥 ${habit.streak} day streak`;

  nameColumn.appendChild(name);
  nameColumn.appendChild(streak);
  identity.appendChild(emoji);
  identity.appendChild(nameColumn);

  const actions = document.createElement("div");
  actions.className = "habit-card__actions";

  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.className = "habit-card__edit";
  editButton.textContent = "✎";
  editButton.setAttribute("aria-label", `Edit habit ${habit.name}`);
  editButton.addEventListener("click", (e) => {
    e.stopPropagation();
    handlers.onEdit(habit);
  });

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "habit-card__delete";
  deleteButton.textContent = "✕";
  deleteButton.setAttribute("aria-label", `Delete habit ${habit.name}`);
  deleteButton.addEventListener("click", (e) => {
    e.stopPropagation();
    handlers.onDelete(habit);
  });

  actions.appendChild(editButton);
  actions.appendChild(deleteButton);

  topRow.appendChild(identity);
  topRow.appendChild(actions);

  const week = document.createElement("div");
  week.className = "habit-card__week";

  const days = getHeatmapData(habit);
  const last7Days = days.slice(-7);
  const today = getTodayDateString();
  const weekdayLetters = getWeekdayLetters();

  last7Days.forEach((day, index) => {
    const dayColumn = document.createElement("div");
    dayColumn.className = "habit-card__day";

    const label = document.createElement("span");
    label.className = "habit-card__day-label";
    label.textContent = weekdayLetters[index];

    const dayButton = document.createElement("button");
    dayButton.type = "button";
    dayButton.className = "habit-card__day-toggle";
    dayButton.setAttribute("aria-pressed", day.completed ? "true" : "false");
    dayButton.title = day.date;
    if (day.completed) {
      dayButton.style.backgroundColor = palette.accent;
      dayButton.style.borderColor = palette.accent;
    }

    if (day.date === today) {
      dayButton.classList.add("habit-card__day-toggle--today");
      dayButton.addEventListener("click", (e) => {
        e.preventDefault();
        handlers.onToggle(habit);
      });
    } else {
      dayButton.disabled = true;
    }

    dayColumn.appendChild(label);
    dayColumn.appendChild(dayButton);
    week.appendChild(dayColumn);
  });

  card.appendChild(topRow);
  card.appendChild(week);

  return card;
}

function renderHabitList(habits, handlers) {
  const list = document.getElementById("habit-list");
  const emptyState = document.getElementById("habit-list-empty");

  clearElement(list);

  if (habits.length === 0) {
    emptyState.hidden = false;
  } else {
    emptyState.hidden = true;
    habits.forEach((habit) => {
      list.appendChild(createHabitCard(habit, handlers));
    });
  }

  renderSummary(habits);
}

function showNewHabitError(message) {
  const errorEl = document.getElementById("new-habit-error");
  errorEl.textContent = message;
  errorEl.hidden = false;
}

function hideNewHabitError() {
  const errorEl = document.getElementById("new-habit-error");
  errorEl.hidden = true;
  errorEl.textContent = "";
}

function showModal(message, actions) {
  const overlay = document.getElementById("modal-overlay");
  clearElement(overlay);

  const modal = document.createElement("div");
  modal.className = "modal";

  const messageEl = document.createElement("p");
  messageEl.className = "modal__message";
  messageEl.textContent = message;

  const actionsEl = document.createElement("div");
  actionsEl.className = "modal__actions";

  actions.forEach((action) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = action.label;
    button.className = `modal__button modal__button--${action.style || "secondary"}`;
    button.addEventListener("click", () => {
      hideModal();
      action.onClick();
    });
    actionsEl.appendChild(button);
  });

  modal.appendChild(messageEl);
  modal.appendChild(actionsEl);
  overlay.appendChild(modal);
  overlay.hidden = false;
}

function hideModal() {
  const overlay = document.getElementById("modal-overlay");
  overlay.hidden = true;
  clearElement(overlay);
}

function showEditModal(habit, onSave) {
  const overlay = document.getElementById("modal-overlay");
  clearElement(overlay);

  const modal = document.createElement("div");
  modal.className = "modal modal--edit";

  const title = document.createElement("h2");
  title.className = "modal__title";
  title.textContent = "Edit habit";

  const nameLabel = document.createElement("label");
  nameLabel.className = "modal__label";
  nameLabel.textContent = "Habit name";
  nameLabel.htmlFor = "edit-habit-name-input";

  const nameInput = document.createElement("input");
  nameInput.id = "edit-habit-name-input";
  nameInput.type = "text";
  nameInput.value = habit.name;
  nameInput.className = "modal__input";

  const emojiLabel = document.createElement("p");
  emojiLabel.className = "modal__label";
  emojiLabel.textContent = "Choose emoji";

  const emojiContainer = document.createElement("div");
  emojiContainer.className = "new-habit__emoji-picker";

  let selectedEmoji = habit.emoji || "🎯";

  EMOJI_OPTIONS.forEach((emoji) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "emoji-btn";
    button.textContent = emoji;

    if (emoji === selectedEmoji) {
      button.classList.add("selected");
    }

    button.addEventListener("click", () => {
      Array.from(emojiContainer.children).forEach((btn) => btn.classList.remove("selected"));
      button.classList.add("selected");
      selectedEmoji = emoji;
    });

    emojiContainer.appendChild(button);
  });

  const actionsEl = document.createElement("div");
  actionsEl.className = "modal__actions";

  const cancelButton = document.createElement("button");
  cancelButton.type = "button";
  cancelButton.textContent = "Cancel";
  cancelButton.className = "modal__button modal__button--secondary";
  cancelButton.addEventListener("click", hideModal);

  const saveButton = document.createElement("button");
  saveButton.type = "button";
  saveButton.textContent = "Save changes";
  saveButton.className = "modal__button modal__button--primary";
  saveButton.addEventListener("click", () => {
    const newName = nameInput.value.trim();
    if (newName !== "") {
      hideModal();
      onSave(newName, selectedEmoji);
    }
  });

  actionsEl.appendChild(cancelButton);
  actionsEl.appendChild(saveButton);

  modal.appendChild(title);
  modal.appendChild(nameLabel);
  modal.appendChild(nameInput);
  modal.appendChild(emojiLabel);
  modal.appendChild(emojiContainer);
  modal.appendChild(actionsEl);
  overlay.appendChild(modal);
  overlay.hidden = false;

  nameInput.focus();
}
