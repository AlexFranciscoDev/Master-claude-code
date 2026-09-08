let habits = [];
let selectedEmoji = "🌱";

function persistAndRender() {
  saveHabits(habits);
  render();
}

function render() {
  renderHabitList(habits, {
    onToggle: handleToggleHabit,
    onEdit: handleEditHabit,
    onDelete: handleDeleteHabit,
  });
}

function handleToggleHabit(habit) {
  habits = toggleToday(habits, habit.id);
  persistAndRender();
}

function handleEditHabit(habit) {
  showEditModal(habit, (newName, newEmoji) => {
    habits = editHabit(habits, habit.id, newName, newEmoji);
    persistAndRender();
  });
}

function handleDeleteHabit(habit) {
  showModal(`Delete "${habit.name}"? This cannot be undone.`, [
    {
      label: "Cancel",
      style: "secondary",
      onClick: () => {},
    },
    {
      label: "Delete",
      style: "danger",
      onClick: () => {
        habits = deleteHabit(habits, habit.id);
        persistAndRender();
      },
    },
  ]);
}

function handleNewHabitSubmit(event) {
  event.preventDefault();
  hideNewHabitError();

  const input = document.getElementById("habit-name");
  const name = input.value.trim();

  if (name === "") {
    showNewHabitError("Please enter a habit name.");
    return;
  }

  habits = createHabit(habits, name, selectedEmoji);
  input.value = "";
  selectedEmoji = "🌱";
  persistAndRender();
  initEmojiPicker();
}

function initEmojiPicker() {
  const container = document.getElementById("emoji-picker");
  clearElement(container);

  EMOJI_OPTIONS.forEach((emoji) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "emoji-btn";
    btn.textContent = emoji;
    if (emoji === selectedEmoji) {
      btn.classList.add("selected");
    }
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      selectedEmoji = emoji;
      initEmojiPicker();
    });
    container.appendChild(btn);
  });
}

function init() {
  habits = recalculateStreaks(getHabits());
  saveHabits(habits);

  const form = document.getElementById("new-habit-form");
  form.addEventListener("submit", handleNewHabitSubmit);

  initEmojiPicker();
  render();
}

document.addEventListener("DOMContentLoaded", init);
